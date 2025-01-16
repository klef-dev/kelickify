import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, createMessageObjectSchema, IdUUIDParamsSchema } from "stoker/openapi/schemas";
import { z } from "zod";

import { createEmployeeSchema, selectEmployeeSchema } from "@/schemas/employee";

const tags = ["Employees"];

export const create = createRoute({
  path: "/employees",
  method: "post",
  request: {
    body: jsonContentRequired(createEmployeeSchema, "The employee to add"),
  },
  tags,
  responses: {
    [HttpStatusCodes.CREATED]: jsonContent(selectEmployeeSchema, "The added employee"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createEmployeeSchema),
      "The validation error(s)",
    ),
    [HttpStatusCodes.BAD_REQUEST]: jsonContent(z.object({ message: z.string() }), "Error with the request"),
  },
});

export const getAll = createRoute({
  path: "/employees",
  method: "get",
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(z.array(selectEmployeeSchema), "All employees"),
  },
});

export const getOne = createRoute({
  path: "/employees/{id}",
  method: "get",
  request: {
    params: IdUUIDParamsSchema,
  },
  tags,
  responses: {
    [HttpStatusCodes.OK]: jsonContent(selectEmployeeSchema, "The requested employee"),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(createMessageObjectSchema("Employee not found"), "Employee not found"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(createErrorSchema(IdUUIDParamsSchema), "Invalid id error"),
  },
});

export type CreateRoute = typeof create;
export type GetAllRoute = typeof getAll;
export type GetOneRoute = typeof getOne;
