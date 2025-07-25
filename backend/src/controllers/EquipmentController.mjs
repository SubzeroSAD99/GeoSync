import Joi from "joi";
import Equipment from "../models/Equipment.mjs";

const schema = Joi.object({
  name: Joi.string().lowercase().optional().empty(""),
  manufacturer: Joi.string().lowercase().optional().empty(""),
  serialNumber: Joi.number()
    .optional()
    .empty("")
    .max(9999999999)
    .custom((value, _helper) => {
      if (value === 0) return null;

      return value;
    })
    .messages({
      "number.max": "Numero de serie muito longo!",
    }),
  model: Joi.string().lowercase().optional().empty(""),
  color: Joi.string().lowercase().optional().empty(""),
});

class EquipmentController {
  static async register(req, res) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    try {
      const equipments = await Equipment.create({ ...value });

      if (!equipments)
        return res.status(500).json({ msg: "Erro ao registrar equipamento!" });

      return res
        .status(200)
        .json({ msg: "Equipamento registrado com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: EquipmentController.verifyErrDb(err.parent.constrain) });
    }
  }

  static async update(req, res) {
    const { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    try {
      const equipments = await Equipment.update(value, {
        where: { id },
      });

      if (!equipments)
        return res.status(500).json({ msg: "Equipamento não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: EquipmentController.verifyErrDb(err.parent.constrain) });
    }
  }

  static async getAll(req, res) {
    try {
      const equipments = await Equipment.findAll({
        attributes: ["id", "name", "manufacturer"],
        raw: true,
      });

      res.json({ equipments });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao localizar equipamentos!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const equipments = await Equipment.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["id", "createdAt", "updateAt"],
        },
      });

      if (!equipments)
        return res.status(500).json({ msg: "Equipamento não encontrado!" });

      res.status(200).json({ ...equipments });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar equipamento",
        });

      const destroy = await Equipment.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Equipamento deletado com sucesso!",
        });

      res.status(500).json({ msg: "Não foi possivel encontrar equipamento" });
    } catch (err) {
      res.status(500).json({ msg: "Não foi possivel encontrar equipamento" });
    }
  }

  static verifyErrDb(err) {
    let msg = "Erro interno no servidor!";

    switch (err) {
      case "Equipments_name_key":
        msg = "Equipamento ja registrado!";
        break;
    }

    return msg;
  }
}

export default EquipmentController;
