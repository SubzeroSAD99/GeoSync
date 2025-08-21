import Joi from "joi";
import ServiceType from "../models/ServiceType.mjs";
import { formatCurrency, parseCurrency } from "../utils/format.mjs";

const schema = Joi.object({
  name: Joi.string()
    .lowercase()
    .required()
    .empty("")
    .messages({ "any.required": "Preencha o nome do tipo de serviço!" }),
  values: Joi.array()
    .items(
      Joi.object().pattern(
        Joi.string(),
        Joi.array().items(
          Joi.string()
            .pattern(
              /^\s*R\$[\s\u00A0]?\d{1,3}(?:\.\d{3})*,\d{2}\s*$/,
              "currency"
            )
            .optional()
            .empty("")
            .allow(null)
            .default(null)
        )
      )
    )
    .messages({
      "array.base":
        "O valor 'values' deve ser um array de objetos contendo arrays de valores monetários!",
      "string.pattern.currency":
        "O valor deve estar no formato monetário correto! (Exemplo: R$ 12.345,67)",
    }),
});

class ServiceTypeController {
  static async register(req, res) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.values = value.values?.map((obj) => {
      return Object.entries(obj).reduce((acc, [key, val]) => {
        acc[key] = val?.map(parseCurrency);
        return acc;
      }, {});
    });

    try {
      const serviceTypes = await ServiceType.create({ ...value });

      if (!serviceTypes)
        return res
          .status(500)
          .json({ msg: "Erro ao registrar tipo de serviço!" });

      return res
        .status(200)
        .json({ msg: "Tipo de serviço registrado com sucesso!" });
    } catch (err) {
      res.status(500).json({
        msg: ServiceTypeController.verifyErrDb(err.parent?.constraint),
      });
    }
  }

  static async update(req, res) {
    const { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    value.values = value.values?.map((obj) => {
      return Object.entries(obj).reduce((acc, [key, val]) => {
        acc[key] = val?.map(parseCurrency);
        return acc;
      }, {});
    });

    try {
      const serviceTypes = await ServiceType.update(value, {
        where: { id },
      });

      if (!serviceTypes)
        return res.status(500).json({ msg: "Tipo de serviço não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: ServiceTypeController.verifyErrDb(err.parent.constrain) });
    }
  }

  static async getAll(req, res) {
    try {
      const serviceTypes = await ServiceType.findAll({
        attributes: ["id", "name", "values"],
        raw: true,
      });

      const objValues = {};

      serviceTypes.forEach((it) => {
        if (!objValues[it.name]) objValues[it.name] = {};

        const formattedFlat = it.values.flatMap((obj) => {
          const key = Object.keys(obj)[0];
          const vals = Object.values(obj).flat();
          const formatted = vals.map(formatCurrency);

          objValues[it.name][key] = formatted;

          return formatted;
        });

        it.values = formattedFlat;
      });

      res.json({ serviceTypes, objValues });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao localizar tipo de serviços!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const serviceTypes = await ServiceType.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["id", "createdAt", "updatedAt"],
        },
      });

      serviceTypes.values = serviceTypes.values?.map((it) => {
        const [key, arr] = Object.entries(it)[0]; // primeira (e única) entrada
        return { [key]: arr.map((n) => formatCurrency(Number(n))) };
      });

      if (!serviceTypes)
        return res.status(500).json({ msg: "Tipo de serviço não encontrado!" });

      res.status(200).json({ ...serviceTypes });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar tipo de serviço",
        });

      const destroy = await ServiceType.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Tipo de serviço deletado com sucesso!",
        });

      res
        .status(500)
        .json({ msg: "Não foi possivel encontrar tipo de serviço" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: "Não foi possivel encontrar tipo de serviço" });
    }
  }

  static verifyErrDb(err) {
    let msg = "Erro interno no servidor!";

    switch (err) {
      case "service_types_name_key":
        msg = "Tipo de serviço ja registrado!";
        break;
    }

    return msg;
  }
}

export default ServiceTypeController;
