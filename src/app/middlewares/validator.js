import { query, validationResult } from "express-validator";
const httpcode_default = 400;

/**
 * Middleware de validação para capturar e retornar erros automaticamente.
 */
const applyRules = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpcode_default).json({ errors: errors.array() });
  }
  next();
};

//Função utilitária para aplicar validações e incluir o `applyRules` automaticamente.
const applyValidation = (rules) => [...rules, applyRules];

/**
 * Validação para a rota do dashboard.
 * 
 */
export const validateDashboard = applyValidation([
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("A página deve ser um número inteiro maior que 0.")
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 1000 })
    .withMessage("O limite deve ser um número inteiro maior que 0 e menor que 1000.")
    .toInt(),

  query("start_date")
    .optional()
    .isISO8601()
    .withMessage("A data de início deve estar no formato ISO (YYYY-MM-DD)."),

  query("end_date")
    .optional()
    .isISO8601()
    .withMessage("A data de fim deve estar no formato ISO (YYYY-MM-DD).")
    .custom((value, { req }) => {
      if (req.query.start_date && new Date(value) < new Date(req.query.start_date)) {
        throw new Error("A data final não pode ser menor que a inicial.");
      }
      return true;
    }),
]);