import { col } from "sequelize";
import ServiceOrder from "../models/ServiceOrder.mjs";
import { formatPhone } from "../utils/format.mjs";
import pipePdfToStream from "../utils/genPdf.mjs";
import { toTitleCase } from "../utils/format.mjs";
import pipeReceiptToStream from "../utils/genReceipt.mjs";
import Budget from "../models/Budget.mjs";
import db from "../db/db.mjs";
import WhatsappContolller from "./WhatsappController.mjs";
import { raw } from "express";

class FinancialController {
  static async convertToOs(req, res) {
    const { id } = req.body;

    try {
      await db.transaction(async (t) => {
        const budget = await Budget.findByPk(id, { transaction: t });
        if (!budget)
          return res.status(500).json({ msg: "Orçamento não encontrado!" });

        const src = budget.get({ plain: true });
        const destAttrs = Object.keys(ServiceOrder.getAttributes());
        const pk = ServiceOrder.primaryKeyAttribute || "id";

        const payload = {};
        for (const k of destAttrs)
          if (k !== pk && k in src) payload[k] = src[k];

        delete payload.createdAt;
        delete payload.updatedAt;

        await ServiceOrder.create(payload, { transaction: t });
        await budget.destroy({ transaction: t });

        res.json({ msg: "Orçamento convertido com sucesso!" });
      });
    } catch (error) {
      res.status(500).json({ msg: "Erro ao converter orçamento!" });
    }
  }

  static async genPdfOs(req, res) {
    try {
      const { id } = req.body;

      const order = await ServiceOrder.findByPk(id, {
        attributes: {
          include: [
            "code",
            "serviceType",
            "municipality",
            "locality",
            "quantity",
            "serviceValue",
            "amountPaid",
            "owner",
            "discount",
            "createdAt",
            "externalObs",
          ],
          include: [
            [col("OwnerReader.full_name"), "owner"],
            [col("OwnerReader.road"), "ownerRoad"],
            [col("OwnerReader.number"), "ownerNumber"],
            [col("OwnerReader.neighborhood"), "ownerNeighborhood"],
            [col("OwnerReader.city"), "ownerCity"],
            [col("OwnerReader.cep"), "ownerCep"],
            [col("OwnerReader.phone_number"), "ownerPhoneNumber"],
          ],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!order)
        return res.status(500).json({ msg: "Serviço não encontrado!" });

      const date = new Date(order.createdAt);

      const formattedDate = date.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedHour = date.toLocaleTimeString("pt-BR", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // **Headers para PDF inline**
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="OS ${id} - ${order.owner}.pdf"`
      );

      pipePdfToStream(
        {
          title: "Ordem de Serviço",
          id,
          emissionDate: formattedDate,
          emissonHour: formattedHour,
          finishedDate: null,
          discount: order.discount ?? 0,
          client: {
            fullName: order.owner?.toUpperCase(),
            road: order.ownerRoad?.toUpperCase(),
            number: order.ownerNumber,
            neighborhood: order.ownerNeighborhood?.toUpperCase(),
            city: order.ownerCity?.toUpperCase(),
            cep: order.ownerCep?.toUpperCase(),
            phoneNumber: formatPhone(order.ownerPhoneNumber),
          },
          services: {
            codes: order.code,
            types: order.serviceType,
            municipalities: order.municipality,
            localities: order.locality,
            quantities: order.quantity,
            prices: order.serviceValue,
            amountPaid: order.amountPaid,
          },
          responsible: {
            name: req.employee?.fullName?.toUpperCase(),
            role: toTitleCase(req.employee?.role),
            phoneNumber: formatPhone(req.employee?.phoneNumber),
          },
          obs: order.externalObs?.toUpperCase(),
        },
        res
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async genPdfBudget(req, res) {
    try {
      const { id } = req.body;

      const order = await Budget.findByPk(id, {
        attributes: {
          include: [
            "serviceType",
            "municipality",
            "locality",
            "quantity",
            "serviceValue",
            "owner",
            "discount",
            "createdAt",
            "externalObs",
          ],
          include: [
            [col("OwnerReader.full_name"), "owner"],
            [col("OwnerReader.road"), "ownerRoad"],
            [col("OwnerReader.number"), "ownerNumber"],
            [col("OwnerReader.neighborhood"), "ownerNeighborhood"],
            [col("OwnerReader.city"), "ownerCity"],
            [col("OwnerReader.cep"), "ownerCep"],
            [col("OwnerReader.phone_number"), "ownerPhoneNumber"],
          ],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!order)
        return res.status(500).json({ msg: "Orçamento não encontrado!" });

      const date = new Date(order.createdAt);

      const formattedDate = date.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      const formattedHour = date.toLocaleTimeString("pt-BR", {
        timeZone: "UTC",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      // **Headers para PDF inline**
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="OS ${id} - ${order.owner}.pdf"`
      );

      pipePdfToStream(
        {
          title: "Orçamento",
          id,
          emissionDate: formattedDate,
          emissonHour: formattedHour,
          finishedDate: null,
          discount: order.discount ?? 0,
          client: {
            fullName: order.owner?.toUpperCase(),
            road: order.ownerRoad?.toUpperCase(),
            number: order.ownerNumber,
            neighborhood: order.ownerNeighborhood?.toUpperCase(),
            city: order.ownerCity?.toUpperCase(),
            cep: order.ownerCep?.toUpperCase(),
            phoneNumber: formatPhone(order.ownerPhoneNumber),
          },
          services: {
            codes: [],
            types: order.serviceType,
            municipalities: order.municipality,
            localities: order.locality,
            quantities: order.quantity,
            prices: order.serviceValue,
            amountPaid: order.amountPaid,
          },
          responsible: {
            name: req.employee?.fullName?.toUpperCase(),
            role: toTitleCase(req.employee?.role),
            phoneNumber: formatPhone(req.employee?.phoneNumber),
          },
          obs: order.externalObs?.toUpperCase(),
        },
        res
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async genReceipt(req, res) {
    try {
      const { id } = req.body;

      const order = await ServiceOrder.findByPk(id, {
        attributes: {
          include: ["serviceType", "quantity", "serviceValue", "owner"],
          include: [
            [col("OwnerReader.full_name"), "owner"],
            [col("OwnerReader.road"), "ownerRoad"],
            [col("OwnerReader.number"), "ownerNumber"],
            [col("OwnerReader.neighborhood"), "ownerNeighborhood"],
            [col("OwnerReader.city"), "ownerCity"],
            [col("OwnerReader.cep"), "ownerCep"],
          ],
        },
        include: [
          {
            association: "OwnerReader",
            attributes: [],
          },
        ],
        raw: true,
      });

      if (!order) res.status(500).json({ msg: "Serviço não encontrado!" });

      // **Headers para PDF inline**
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `inline; filename="OS ${id} - ${order.owner}.pdf"`
      );

      pipeReceiptToStream(
        {
          id,
          date: new Intl.DateTimeFormat("pt-BR", {
            timeZone: "America/Sao_Paulo",
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          }).format(new Date()),
          client: {
            fullName: order.owner?.toUpperCase(),
            road: order.ownerRoad?.toUpperCase(),
            number: order.ownerNumber,
            neighborhood: order.ownerNeighborhood?.toUpperCase(),
            city: order.ownerCity?.toUpperCase(),
            cep: order.ownerCep?.toUpperCase(),
          },
          services: {
            types: order.serviceType,
            quantities: order.quantity,
            prices: order.serviceValue,
          },
        },
        res
      );
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "Erro interno no servidor!" });
    }
  }

  static async serviceCharger(req, res) {
    try {
      const { id } = req.body;

      const order = await ServiceOrder.findOne({
        where: { id },
        attributes: ["paymentSituation", "owner"],
        include: [
          {
            association: "OwnerReader",
            attributes: ["phoneNumber"],
          },
        ],
        raw: true,
      });

      console.log(order);

      if (!order)
        return res.status(404).json({ msg: "Serviço não encontrado!" });

      const ownerPhone = order["OwnerReader.phoneNumber"];

      if (!["não pago", "parcialmente pago"].includes(order.paymentSituation))
        return res
          .status(500)
          .json({ msg: "Não é possivel cobrar por esse serviço!" });

      if (!ownerPhone)
        return res
          .status(404)
          .json({ msg: "Numero do cliente não registrado!" });

      await WhatsappContolller.sendMessage(ownerPhone, "Cobrança enviada!");

      return res.json({ msg: "Cobrança feita com sucesso!" });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao fazer cobrança" });
    }
  }
}

export default FinancialController;
