import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, createMessageObjectSchema } from "stoker/openapi/schemas";
import getParamsSchema from "stoker/openapi/schemas/get-params-schema";

import { cpfCalculationResultSchema, cpfCalculationSchema, selectCPFContributionsSchema } from "@/schemas/cpf";

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

export const history = createRoute({
  path: "/cpf/history/{employeeId}",
  method: "get",
  request: {
    params: getParamsSchema({ name: "employeeId", validator: "uuid" }),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectCPFContributionsSchema), "CPF history for the employee"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.object({ employeeId: z.string().uuid() })),
      "Invalid employee id error",
    ),
  },
});

export const batchCalculate = createRoute({
  path: "/cpf/batch-calculate",
  method: "post",
  request: {
    body: jsonContentRequired(cpfCalculationSchema.pick({ month: true }), "The employees to calculate CPF for"),
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.object({ message: z.string() }), "The calculated CPF for each employee"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(z.array(cpfCalculationSchema)),
      "The validation error(s)",
    ),
  },
});

export type CalculateRoute = typeof calculate;
export type HistoryRoute = typeof history;
export type BatchCalculateRoute = typeof batchCalculate;
