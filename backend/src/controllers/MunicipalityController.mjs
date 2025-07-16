import Joi from "joi";
import Municipality from "../models/Municipality.mjs";
import { generateToken, verifyToken } from "../utils/Token.mjs";

const schema = Joi.object({
  name: Joi.string().trim().empty("").lowercase().required().messages({
    "any.required": "O nome do municipio não pode ficar vazio.",
  }),
});

class MunicipalityController {
  static async getAll(req, res) {
    try {
      const municipalities = await Municipality.findAll({
        attributes: ["name"],
        raw: true,
      });

      const formattedMunicipalities = municipalities.map((it) => {
        return {
          name: it.name,
        };
      });

      res.json({ municipalities: formattedMunicipalities });
    } catch (err) {
      res.status(500).json({ msg: "Erro ao localizar municipios!" });
    }
  }

  static async getById(req, res) {
    const { id } = req.body;

    console.log(req.body);

    try {
      const decoded = verifyToken(id);

      if (!decoded)
        return res.status(500).json({ msg: "Municipio não encontrado!" });

      const municipality = await Municipality.findOne({
        raw: true,
        where: { id: decoded.id },
        attributes: ["name"],
      });

      if (!municipality)
        return res.status(500).json({ msg: "Municipio não encontrado!" });

      delete municipality.id;

      res.status(200).json({ ...municipality });
    } catch (error) {
      console.log(error);

      res.status(500).json({ msg: "Erro interno no servidor" });
    }
  }

  static async register(req, res) {
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        field: error.details[0].path[0],
        msg: error.details[0].message,
      });
    }

    try {
      const employee = await Municipality.create({ ...value });

      if (!employee)
        return res.status(500).json({ msg: "Erro ao registrar municipio!" });

      return res.status(200).json({ msg: "Municipio registrado com sucesso!" });
    } catch (err) {
      console.log(err);

      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Municipalities_name_key" &&
        res.status(500).json({ msg: "Municipio ja registrado!" });
    }
  }

  static async update(req, res) {
    let { id } = req.body;

    delete req.body.id;

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(500).json({ msg: error.details[0].message });
    }

    try {
      const decoded = verifyToken(id);

      if (!decoded) res.status(500).json({ msg: "Municipio não encontrado!" });

      const municipality = await Municipality.update(value, {
        where: { id: decoded.id },
      });

      if (!municipality)
        return res.status(500).json({ msg: "Municipio não encontrado!" });

      return res
        .status(200)
        .json({ msg: "Informações alteradas com sucesso!" });
    } catch (err) {
      if (err.name !== "SequelizeUniqueConstraintError")
        return res.status(500).json({ msg: "Erro interno do servidor." });

      err.parent.constraint === "Municipality_name_key" &&
        res.status(500).json({ msg: "Municipio ja registrado!" });
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.body;

      if (!id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar municipio",
        });

      const decodedId = verifyToken(id);

      if (!decodedId.id)
        return res.json({
          err: true,
          msg: "Não foi possivel encontrar municipio",
        });

      const destroy = await Municipality.destroy({
        where: {
          id: decodedId.id,
        },
      });

      if (destroy)
        return res.json({
          msg: "Municipio deletado com sucesso!",
        });

      res.json({ msg: "Não foi possivel encontrar municipio" });
    } catch (err) {
      res.json({ msg: "Não foi possivel encontrar municipio" });
    }
  }
}

export default MunicipalityController;
