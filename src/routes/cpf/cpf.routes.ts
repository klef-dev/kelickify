import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, createMessageObjectSchema } from "stoker/openapi/schemas";

import { cpfCalculationResultSchema, cpfCalculationSchema } from "@/schemas/cpf";

const tags = ["CPF Contributions"];

export const calculate = createRoute({
  path: "/cpf/calculate",
  method: "post",
  request: {
    body: jsonContentRequired(cpfCalculationSchema, "The employee to calculate CPF for"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(cpfCalculationResultSchema, "The calculated CPF"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(cpfCalculationSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(createMessageObjectSchema("Employee not found"), "Employee not found"),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ message: z.string() }), "Error with the calculation request"),
  },
});

export type CalculateRoute = typeof calculate;
