import Joi from "joi";
import ServiceOrder from "../models/ServiceOrder.mjs";
import { formatDate, formatCurrency } from "../utils/format.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";
import { col, Op } from "sequelize";
import WhatsappController from "./WhatsappController.mjs";
import FileController from "./FileController.mjs";

const registerSchema = Joi.object({
  //#region ServiceSchema
  code: Joi.array()
    .items(Joi.string().trim().empty("").allow(null).default(null))
    .single(),
  serviceType: Joi.array()
    .items(Joi.string().lowercase().trim().required().empty(""))
    .single()
    .messages({
      "any.required": "Por favor, selecione um tipo de serviço.",
    }),
  serviceValue: Joi.array()
    .items(
      Joi.string()
        .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
        .optional()
        .empty("")
        .allow(null)
        .default(null)
    )
    .single()
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  step: Joi.array()
    .items(Joi.string().lowercase().trim().empty("").default("agendado"))
    .single(),
  quantity: Joi.array()
    .items(Joi.number().min(1).default(1).empty(["", null]))
    .single()
    .messages({
      "number.min": "A quantidade deve ser maior ou igual a 1",
      "number.base": "A quantidade deve ser um número válido",
    }),
  municipality: Joi.array()
    .items(Joi.string().lowercase().trim().required().empty([""]))
    .single()
    .messages({
      "any.required": "Por favor, selecione um municipio!.",
    }),
  locality: Joi.array()
    .items(
      Joi.string()
        .lowercase()
        .trim()
        .optional()
        .empty("")
        .allow(null)
        .default(null)
    )
    .single(),
  location: Joi.array()
    .items(Joi.string().trim().optional().empty("").allow(null).default(null))
    .single(),
  //#endregion

  //#region PriorityPendingSchema
  priority: Joi.string()
    .lowercase()
    .valid("baixa", "normal", "alta")
    .empty("")
    .default("normal"),

  pending: Joi.string().lowercase().allow(null).default(null).empty(""),
  //#endregion

  //#region OwnershipSchema
  owner: Joi.string().empty("").allow(null).default(null).trim().optional(),
  contractor: Joi.string()
    .trim()
    .allow(null)
    .default(null)
    .empty("")
    .optional(),
  guide: Joi.string().trim().empty("").allow(null).default(null).optional(),
  //#endregion

  //#region MeasurementSchema
  topographer: Joi.string()
    .empty("")
    .allow(null)
    .default(null)
    .trim()
    .optional(),
  measurementDate: Joi.string()
    .pattern(/^\d{2}\/\d{2}\/\d{4}$/)
    .trim()
    .empty("")
    .default(null)
    .optional()
    .allow(null),
  measurementHour: Joi.string()
    .pattern(/^(?:[01]?[0-9]|2[0-3]):([0-5]?[0-9])$/)
    .trim()
    .empty("")
    .optional()
    .default(null)
    .allow(null),
  //#endregion

  //#region ResponsibilitiesSchema
  cadist: Joi.number().empty("").allow(null).default(null).optional(),
  schedulingResp: Joi.number().empty("").allow(null).default(null).optional(),
  processingResp: Joi.number().empty("").allow(null).default(null).optional(),
  //#endregion

  //#region FinantialSchema
  discount: Joi.string()
    .empty("")
    .default("0")
    .replace(/,/g, ".")
    .custom((value, helpers) => {
      const num = parseFloat(value);

      if (Number.isNaN(num)) {
        return helpers.error("any.invalid", { value });
      }
      if (num < 0) {
        return helpers.error("number.min", { limit: 0 });
      }
      if (num > 100) {
        return helpers.error("number.max", { limit: 100 });
      }
      // trunca (descarta) para 2 casas decimais
      return Math.floor(num * 100) / 100;
    })
    .messages({
      "discount.invalid": "Desconto inválido",
      "number.min": "Desconto mínimo é {#limit}",
      "number.max": "Desconto máximo é {#limit}",
    }),

  paymentSituation: Joi.string()
    .lowercase()
    .valid("não pago", "pago", "parcialmente pago", "isento")
    .empty("")
    .default("não pago"),
  amountPaid: Joi.string()
    .pattern(/^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/, "currency")
    .optional()
    .empty("")
    .allow(null)
    .default(null)
    .messages({
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto!",
    }),
  payer: Joi.string()
    .lowercase()
    .trim()
    .optional()
    .empty("")
    .allow(null)
    .default(null),
  //#endregion

  //#region ExtrasSchema
  internalObs: Joi.string().allow("").max(500).optional(),
  externalObs: Joi.string().allow("").max(500).optional(),
  finished: Joi.bool().truthy("on").falsy("off").default(false),
  confirmed: Joi.bool().default(false),
  //#endregion
});

class ServiceOrderController {
  static async register(req, res) {
    const { error, value } = registerSchema.validate(req.body);

    const internalFiles = Array.isArray(req.files?.internalFile)
      ? req.files.internalFile
      : req.files?.internalFile
      ? [req.files.internalFile]
      : [];

    const clientFiles = Array.isArray(req.files?.clientFile)
      ? req.files.clientFile
      : req.files?.clientFile
      ? [req.files.clientFile]
      : [];

    if (error) {
      await FileController.cleanupTmpFiles(req.files);

      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.serviceValue = value.serviceValue.map((it) =>
      ServiceOrderController.parseCurrency(it)
    );

    value.amountPaid = ServiceOrderController.parseCurrency(value.amountPaid);

    value.measurementDate = value?.measurementDate?.replace(
      /(\d{2})\/(\d{2})\/(\d{4})/,
      "$3-$2-$1"
    );

    try {
      const order = await ServiceOrder.create(value);

      if (!order)
        return res.status(400).json({ msg: "Erro ao criar serviço!" });

      const orderInfo = await ServiceOrder.findByPk(order.id, {
        attributes: [
          [col("OwnerReader.full_name"), "ownerFullName"],
          [col("CadistReader.phone_number"), "cadistPhoneNumber"],
        ],
        include: [
          {
            association: "CadistReader",
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      const msg = ServiceOrderController.getCadistMsg({
        ownerFullName: orderInfo?.ownerFullName,
        serviceTypes: value.serviceType,
        codes: value.code,
      });

      if (orderInfo?.cadistPhoneNumber)
        await WhatsappController.sendMessage(orderInfo?.cadistPhoneNumber, msg);

      try {
        await FileController.validateAndMoveMany(
          internalFiles,
          order.id,
          "interno"
        );
        await FileController.validateAndMoveMany(
          clientFiles,
          order.id,
          "externo"
        );
      } catch (error) {
        if (error.msg) return res.status(400).json({ msg: error.msg });
        return res.status(500).json({ msg: "Erro interno do servidor." });
      }

      return res.status(200).json({ msg: "Ordem de serviço criada!" });
    } catch (err) {
      if (error.msg) return res.status(400).json({ msg: error.msg });

      await FileController.cleanupTmpFiles(req.files);

      return res.status(500).json({ msg: "Erro interno do servidor." });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar serviço",
        });

      const destroy = await ServiceOrder.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({ err: false, msg: "Serviço deletado com sucesso!" });

      res.json({ err: true, msg: "Não foi possivel encontrar serviço" });
    } catch (err) {
      res.json({ err: true, msg: "Não foi possivel encontrar serviço" });
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.body;
      const internalFiles = Array.isArray(req.files?.internalFile)
        ? req.files.internalFile
        : req.files?.internalFile
        ? [req.files.internalFile]
        : [];

      const clientFiles = Array.isArray(req.files?.clientFile)
        ? req.files.clientFile
        : req.files?.clientFile
        ? [req.files.clientFile]
        : [];

      delete req.body.id;

      const { error, value } = registerSchema.validate(req.body);

      if (error) {
        await FileController.cleanupTmpFiles(req.files);

        return res.status(400).json({
          field: error.details[0].path[0],
          msg: error.details[0].message,
        });
      }

      delete value.confirmed;

      const prev = await ServiceOrder.findByPk(id, {
        attributes: ["cadist"],
        raw: true,
      });

      if (!prev) {
        await FileController.cleanupTmpFiles(req.files);
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      value.serviceValue = value.serviceValue.map((it) =>
        ServiceOrderController.parseCurrency(it)
      );

      value.amountPaid = ServiceOrderController.parseCurrency(value.amountPaid);

      value.measurementDate =
        value?.measurementDate?.replace(
          /(\d{2})\/(\d{2})\/(\d{4})/,
          "$3-$2-$1"
        ) ?? null;

      const row = await ServiceOrder.update(value, {
        where: {
          id,
        },
        omitNull: false,
      });

      if (!row)
        return res.status(400).json({ msg: "Erro ao atualizar o serviço!" });

      const cadistChanged = (prev.cadist ?? null) !== (value.cadist ?? null);

      if (cadistChanged && value.cadist) {
        const orderInfo = await ServiceOrder.findByPk(id, {
          attributes: [
            [col("OwnerReader.full_name"), "ownerFullName"],
            [col("CadistReader.phone_number"), "cadistPhoneNumber"],
          ],
          include: [
            { association: "CadistReader", attributes: [] },
            { association: "OwnerReader", attributes: [] },
          ],
          raw: true,
        });

        if (orderInfo?.cadistPhoneNumber) {
          const msg = ServiceOrderController.getCadistMsg({
            ownerFullName: orderInfo.ownerFullName,
            serviceTypes: value.serviceType ?? req.body.serviceType,
            codes: value.code ?? req.body.code,
          });

          await WhatsappController.sendMessage(
            orderInfo.cadistPhoneNumber,
            msg
          );
        }
      }

      try {
        await FileController.validateAndMoveMany(internalFiles, id, "interno");
        await FileController.validateAndMoveMany(clientFiles, id, "externo");
      } catch (error) {
        if (error.msg) return res.status(400).json({ msg: error.msg });
        return res.status(500).json({ msg: "Erro interno do servidor." });
      }

      res.json({ msg: "Serviço atualizado com sucesso!" });
    } catch (err) {
      await FileController.cleanupTmpFiles(req.files);
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    if (isNaN(id))
      return res.status(500).json({ msg: "Serviço não encontrado!" });

    try {
      const data = await ServiceOrder.findByPk(id, {
        attributes: {
          exclude: ["confirmed", "id"],
        },
        raw: true,
      });

      if (!data)
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      data.measurementDate = data?.measurementDate?.replace(
        /(\d){4}-(\d){2}-(\d){2}/,
        "$3/$2/$1"
      );

      data.measurementHour = data?.measurementHour?.slice(0, -3);

      data.serviceValue = data.serviceValue.map((it) => formatCurrency(it));
      data.amountPaid = formatCurrency(data.amountPaid);

      if (!data) res.status(400).json({ msg: "Serviço não encontrado!" });

      let files = {};

      try {
        files = await FileController.getById(id);
      } catch (err) {
        return res.status(500).json({ msg: "Erro ao ler anexos" });
      }

      res.json({ service: data, files });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getAll(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.serviceValue = obj.serviceValue.map((it) => formatCurrency(it));

        obj.amountPaid = formatCurrency(obj.amountPaid);
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllOpen(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          finished: false,
        },
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno do servidor!" });
    }
  }

  static async getAllClosed(req, res) {
    try {
      const data = await ServiceOrder.findAll({
        where: {
          finished: true,
        },
        attributes: {
          exclude: ["cadist", "topographer", "updatedAt"],
          include: [
            [col("CadistReader.full_name"), "cadist"],
            [col("OwnerReader.full_name"), "owner"],
          ],
        },
        include: [
          {
            association: "CadistReader",
            // esvaziar os atributos aqui, senão eles voltam duplicados
            attributes: [],
          },
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      data.map((obj) => {
        obj.createdAt = formatDate(obj.createdAt).split(",")[0];
      });

      res.json(data);
    } catch (err) {
      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async getAllOpenByMonth(req, res) {
    const { month, year, topographer } = req.body;

    try {
      const mm = String(month).padStart(2, "0");
      const start = `${year}-${mm}-01`;

      // se for dezembro (12), seta proxima ano e coloca mes 1
      const nextYear = month === 12 ? year + 1 : year;
      const nextMonth = month === 12 ? 1 : month + 1;
      const mm2 = String(nextMonth).padStart(2, "0");
      const end = `${nextYear}-${mm2}-01`;

      const services = await ServiceOrder.findAll({
        attributes: {
          include: [
            "id",
            "serviceType",
            "municipality",
            "locality",
            "measurementHour",
            "measurementDate",
            "internalObs",
            "location",
            "confirmed",
            [col("OwnerReader.full_name"), "owner"],
            [col("ContractorReader.full_name"), "contractor"],
            [col("GuideReader.full_name"), "guide"],
          ],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
          {
            association: "ContractorReader",
            attributes: [],
          },
          {
            association: "GuideReader",
            attributes: [],
          },
        ],
        where: {
          measurementDate: {
            [Op.gte]: start, // >= YYYY-MM-01
            [Op.lt]: end, // < YYYY-MM+1-01
          },
          finished: false,
          topographer,
        },

        order: [["measurementDate", "ASC"]],
        raw: true,
      });

      const formattedServices = services.map(
        ({
          id,
          serviceType,
          owner,
          contractor,
          guide,
          municipality,
          locality,
          ownerNumber,
          measurementHour,
          measurementDate,
          internalObs,
          location,
          confirmed,
        }) => {
          return {
            id,
            serviceType,
            owner,
            contractor,
            guide,
            municipality,
            locality,
            ownerNumber,
            measurementHour: measurementHour?.slice(0, -3),
            measurementDate,
            internalObs,
            location,
            confirmed,
          };
        }
      );

      res.json({ services: formattedServices });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao acessar agendamento!" });
    }
  }

  static async getStep(req, res) {
    try {
      const { id } = req.body;

      if (isNaN(id))
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      const data = await ServiceOrder.findByPk(id, {
        attributes: [
          "step",
          "serviceType",
          [col("OwnerReader.full_name"), "owner"],
        ],

        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!data)
        return res.status(400).json({ msg: "Serviço não encontrado!" });

      res.json({ service: data });
    } catch (err) {
      res.status(400).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async getPaymentSituation(id) {
    try {
      if (isNaN(id)) return null;

      const status = await ServiceOrder.findByPk(id, {
        attributes: ["paymentSituation"],
        raw: true,
      });

      if (!status) return null;

      return status.paymentSituation;
    } catch (err) {
      return null;
    }
  }

  static async confirm(req, res) {
    try {
      const { id } = req.body;

      const order = await ServiceOrder.findOne({
        where: { id },
        attributes: [
          "id",
          "serviceType",
          "measurementDate",
          "measurementHour",
          "topographer",
          "owner",
          "contractor",
          "guide",
          "locality",
          "municipality",
          "location",
          "externalObs",
          "confirmed",
        ],
        include: [
          {
            association: "TopographerReader",
            attributes: ["fullName", "phoneNumber"],
            include: [
              {
                association: "TopographerVehicle",
                attributes: ["name", "year", "plate", "color"],
              },
            ],
          },

          {
            association: "OwnerReader",
            attributes: ["fullName", "phoneNumber"],
          },
          {
            association: "ContractorReader",
            attributes: ["fullName", "phoneNumber"],
          },
          {
            association: "GuideReader",
            attributes: ["fullName", "phoneNumber"],
          },
        ],
      });

      if (!order) {
        return res.status(404).json({ msg: "Serviço não encontrado!" });
      }

      order.confirmed = true;
      await order.save();

      const topographerName = order.TopographerReader?.fullName;
      const topographerPhone = order.TopographerReader?.phoneNumber;
      const vehicleInfo = {
        ...order.TopographerReader.TopographerVehicle[0].dataValues,
      };

      const ownerName = order.OwnerReader?.fullName;
      const ownerPhone = order.OwnerReader?.phoneNumber;

      const contractorName = order.ContractorReader?.fullName;
      const contractorPhone = order.ContractorReader?.phoneNumber;

      const guideName = order.GuideReader?.fullName;
      const guidePhone = order.GuideReader?.phoneNumber;

      try {
        const splitedHour = order.measurementHour?.slice(0, -3);

        const message = ServiceOrderController.getMessage({
          date: formatDate(order.measurementDate).split(",")[0],
          hour: [
            splitedHour,
            ServiceOrderController.addMinutesToTime(splitedHour, 30),
          ],
          day: ServiceOrderController.getDay(order.measurementDate),
          topographer: topographerName,
          topographerNumber: topographerPhone,
          vehicleInfo,
          services: {
            types: order.serviceType,
            municipalities: order.municipality,
            localities: order.locality,
            locations: order.location,
          },
          shift: ServiceOrderController.getShift(splitedHour),
          client: ownerName,
          contractor: contractorName,
          guide: guideName,
          externalObs: order.externalObs,
          locationLink: order.location,
        });

        if (topographerPhone)
          await WhatsappController.sendMessage(topographerPhone, message);

        if (ownerPhone)
          await WhatsappController.sendMessage(ownerPhone, message);

        if (contractorPhone)
          await WhatsappController.sendMessage(contractorPhone, message);

        if (guidePhone)
          await WhatsappController.sendMessage(guidePhone, message);
      } catch (err) {
        return res.json({ warn: true, msg: "Erro ao enviar mensagens!" });
      }
      return res.json({ msg: "Serviço confirmado com sucesso!" });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao confirmar serviço!" });
    }
  }

  static parseCurrency(value) {
    const cleaned = value
      ?.replace(/[^0-9\-,]+/g, "")
      .replace(/\./g, "")
      .replace(",", ".");
    const num = Number.parseFloat(cleaned);
    if (Number.isNaN(num)) return null;

    return String(num).length > 13 ? null : num;
  }

  static prepareDataToFront(input) {
    const services = input.services.map((service) => ({
      ...service,
      total: service.quantity * service.unitPrice,
      totalFormatted: formatCurrency(service.quantity * service.unitPrice),
      unitPriceFormatted: formatCurrency(service.unitPrice),
    }));

    const subTotalOS = services.reduce(
      (sum, service) => sum + service.total,
      0
    );
    const discountValue = (input.discount / 100) * subTotalOS;
    const totalOS = subTotalOS - discountValue;

    return {
      ...input,
      services,
      subTotalOS: formatCurrency(subTotalOS),
      totalOS: formatCurrency(totalOS),
      dateNow: new Date().toLocaleDateString("pt-BR"),
    };
  }

  static getDay(dateStr) {
    // dataStr no formato YYYY-MM-DD
    const [year, month, day] = dateStr.split("-").map(Number);

    // new Date(year, monthIndex, day) → mês é 0–11
    const date = new Date(Date.UTC(year, month - 1, day));

    return new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      timeZone: "UTC",
    }).format(date);
  }

  static addMinutesToTime(timeStr, minutesToAdd) {
    if (!timeStr) return "";

    // Quebra a string "HH:MM"
    const [h, m] = timeStr.split(":").map(Number);

    // Cria uma data base (dia fictício, só usamos hora/minuto)
    const date = new Date(0, 0, 0, h, m);

    // Soma os minutos
    date.setMinutes(date.getMinutes() + minutesToAdd);

    // Formata de volta para "HH:MM"
    const hh = String(date.getHours()).padStart(2, "0");
    const mm = String(date.getMinutes()).padStart(2, "0");

    return `${hh}:${mm}`;
  }

  static getShift(timeStr) {
    const [h, m] = timeStr.split(":").map(Number);

    if (h >= 5 && h < 12) {
      return "MANHÃ";
    } else if (h >= 12 && h < 18) {
      return "TARDE";
    } else if (h >= 18 && h <= 23) {
      return "NOITE";
    } else {
      return "MADRUGADA";
    }
  }

  static getMessage({
    date,
    day,
    hour,
    topographer,
    topographerNumber,
    vehicleInfo,
    services,
    shift,
    client,
    contractor,
    guide,
    externalObs,
  }) {
    let serviceTypes = "";
    let location = "";
    let urlLocation = "";

    services.types?.map((it, index) => {
      if (it) {
        const serviceLocation = `${services?.municipalities[
          index
        ]?.toUpperCase()} ${
          services?.localities[index]
            ? `/ ${services?.localities[index]?.toUpperCase()}`
            : ""
        }`;

        serviceTypes += `*SERVIÇO ${index + 1}:* ${it.toUpperCase()}`;
        location += `*LOCAL ${index + 1}:* ${serviceLocation}`;
        urlLocation += `*LOCALIZAÇÃO DA OBRA ${index + 1}:* ${
          services?.locations[index] || ""
        }`;

        if (index + 1 !== services.types?.length) {
          serviceTypes += "\n";
          location += "\n";
          urlLocation += "\n";
        }
      }
    });

    return `
      *CONFIRMAÇÃO DE PRESTAÇÃO DE SERVIÇO*

      *DATA:* ${date} (${day?.toUpperCase()})
      *HORÁRIO:* ${hour[0]} ~ ${hour[1]} (${shift})
      *TOPOGRAFO:* ${topographer.toUpperCase()}
      *AUXILIAR:* ${topographer === "jose anilo lopes" ? "GEAN" : "MARCOS"}
      *VEICULO:* ${vehicleInfo.name.toUpperCase()} ${
      vehicleInfo.year
    } ${vehicleInfo.color?.toUpperCase()} - PLACA ${vehicleInfo.plate}
      ${serviceTypes}
      ${location}
      *CLIENTE:* ${client?.toUpperCase()}
      *CONTRATANTE:* ${contractor?.toUpperCase() || ""}
      *GUIA:* ${guide?.toUpperCase() || ""}
      *OBS.:* ${externalObs}
      ${urlLocation}
      *OBS.2:* Tolerância de atraso do cliente: 10 ~ 20 minutos  

      Segue o contato do medidor que irá realizar o serviço. O horário pode variar, pois podem ocorrer imprevistos e atrasos no serviço de cada cliente.

      *${topographerNumber} (TOPOGRAFO ${topographer.toUpperCase()})*
      Basta clicar em cima do número 👆🏼 que será redirecionado para a conversar com a equipe de campo.

      TOPODATUM TOPOGRAFIA LTDA deseja um bom trabalho
    `
      .split("\n") // quebra em linhas
      .map((line) => line.trim()) // tira os espaços extras
      .join("\n") // junta de novo
      .trim();
  }

  static getCadistMsg({ ownerFullName, serviceTypes, codes }) {
    return `
        Olá, temos serviço disponível!

        *Proprietário:* ${ownerFullName.toUpperCase()}
        *Tipos de Serviços:* ${serviceTypes.join(" / ").toUpperCase()}
        *Códigos de serviço:* ${codes.join(" / ")}
      `
      .split("\n") // quebra em linhas
      .map((line) => line.trim()) // tira os espaços extras
      .join("\n") // junta de novo
      .trim();
  }
}

export default ServiceOrderController;
