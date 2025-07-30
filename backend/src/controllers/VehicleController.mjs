import Joi from "joi";
import Vehicle from "../models/Vehicle.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";

const schema = Joi.object({
  name: Joi.string().lowercase().optional().empty(""),
  year: Joi.number()
    .max(new Date().getFullYear())
    .optional()
    .empty("")
    .messages({
      "number.max": "Ano do veiculo inválido!",
    }),
  plate: Joi.string()
    .optional()
    .empty("")
    .pattern(/^.{3}-.{4}$/)
    .messages({
      "string.pattern.base": "Placa do veiculo inválido!",
    }),
  color: Joi.string().lowercase().optional().empty(""),
  topographer: Joi.string().empty("", "SELECIONE", "selecione"),
});

class VehicleController {
  static async register(req, res) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    value.topographer = verifyToken(value.topographer)?.id ?? null;

    try {
      const vehicles = await Vehicle.create({ ...value });

      if (!vehicles)
        return res.status(500).json({ msg: "Erro ao registrar veiculo!" });

      return res.status(200).json({ msg: "Veiculo registrado com sucesso!" });
    } catch (err) {
      console.log(err);

      res
        .status(500)
        .json({ msg: VehicleController.verifyErrDb(err.parent.constrain) });
    }
  }

  static async update(req, res) {
    const { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    value.topographer = verifyToken(value.topographer)?.id ?? null;

    try {
      const vehicles = await Vehicle.update(value, {
        where: { id },
      });

      if (!vehicles)
        return res.status(500).json({ msg: "Veiculo não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      res
        .status(500)
        .json({ msg: VehicleController.verifyErrDb(err.parent.constrain) });
    }
  }

  static async getAll(req, res) {
    try {
      const vehicles = await Vehicle.findAll({
        attributes: ["id", "name", "plate"],
        raw: true,
      });

      res.json({ vehicles });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao localizar veiculos!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    try {
      const vehicles = await Vehicle.findOne({
        raw: true,
        where: { id },
        attributes: {
          exclude: ["id", "createdAt", "updateAt"],
        },
      });

      if (!vehicles)
        return res.status(500).json({ msg: "Veiculo não encontrado!" });

      vehicles.topographer =
        generateToken({ id: vehicles?.topographer }) ?? null;

      res.status(200).json({ ...vehicles });
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.status(500).json({
          msg: "Não foi possivel encontrar veiculo",
        });

      const destroy = await Vehicle.destroy({
        where: {
          id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Veiculo deletado com sucesso!",
        });

      res.status(500).json({ msg: "Não foi possivel encontrar veiculo" });
    } catch (err) {
      res.status(500).json({ msg: "Não foi possivel encontrar veiculo" });
    }
  }

  static verifyErrDb(err) {
    let msg = "Erro interno no servidor!";

    switch (err) {
      case "Vehicles_name_key":
        msg = "Veiculo ja registrado!";
        break;
    }

    return msg;
  }
}

export default VehicleController;
