import Joi from "joi";

export const registerSchema = Joi.object({
  role: Joi.string()
    .lowercase()
    .empty("", "selecione")
    .valid("cadista", "administrador")
    .default("cadista"),
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required()
    .messages({
      "string.empty": "O CPF é obrigatorio!",
    }),
  fullName: Joi.string()
    .trim()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(3)
    .lowercase()
    .required()
    .messages({
      "string.pattern.base": "O nome só pode conter letras e espaços.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.empty": "O nome não pode estar vazio.",
      "any.required": "O nome é obrigatório.",
    }),
  phoneNumber: Joi.string()
    .empty("")
    .pattern(
      /^(?:\+\d{2} \(\d{2}\) \d{4}-\d{4}|\+\d \(\d{3}\) \d{3}-\d{4})|\+\d{2} \d{3} \d{3} \d{3}|\+\d{2} \d{4} \d{6}$/
    )
    .messages({
      "string.pattern.base": "O número de telefone não esta no formato correto",
      "any.required": "O número de telefone é obrigatório.",
    }),
  password: Joi.string()
    .required()
    .min(8) // A senha deve ter pelo menos 8 caracteres
    .max(20)
    .pattern(/[0-9]/)
    .pattern(/[A-Za-z]/)
    .messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "string.max": "A senha não pode ter mais de 20 caracteres.",
      "string.pattern.base":
        "A senha deve conter pelo menos uma letra e um número.",
      "any.required": "A senha é obrigatória.",
      "string.empty": "A senha é obrigatoria.",
    }),
});

export const updateSchema = Joi.object({
  cpf: Joi.string()
    .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .required(),
  fullName: Joi.string()
    .trim()
    .lowercase()
    .pattern(/^[A-Za-zÀ-ÿ\s]+$/)
    .min(3)
    .required()
    .messages({
      "string.pattern.base": "O nome só pode conter letras e espaços.",
      "string.min": "O nome deve ter pelo menos 3 caracteres.",
      "string.empty": "O nome não pode estar vazio.",
      "any.required": "O nome é obrigatório.",
    }),

  role: Joi.string()
    .empty("", "selecione")
    .lowercase()
    .valid("cadista", "administrador")
    .default("cadista"),

  phoneNumber: Joi.string()
    .empty("")
    .pattern(
      /^(?:\+\d{2} \(\d{2}\) \d{4}-\d{4}|\+\d \(\d{3}\) \d{3}-\d{4})|\+\d{2} \d{3} \d{3} \d{3}|\+\d{2} \d{4} \d{6}$/
    )
    .messages({
      "string.pattern.base": "O número de telefone não esta no formato correto",
      "any.required": "O número de telefone é obrigatório.",
    }),
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(/[0-9]/)
    .pattern(/[A-Za-z]/)
    .messages({
      "string.min": "A senha deve ter pelo menos 8 caracteres.",
      "string.max": "A senha não pode ter mais de 20 caracteres.",
      "string.pattern.base":
        "A senha deve conter pelo menos uma letra e um número.",
    })
    .optional(),
});
