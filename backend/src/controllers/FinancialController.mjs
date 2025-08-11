import { col } from "sequelize";
import ServiceOrder from "../models/ServiceOrder.mjs";
import { formatPhone } from "../utils/format.mjs";
import pipePdfToStream from "../utils/genPdf.mjs";

class FinancialController {
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

      if (!order) res.status(500).json({ msg: "Serviço não encontrado!" });

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
            role: FinancialController.toTitleCase(req.employee?.role),
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

  static toTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
}

export default FinancialController;
