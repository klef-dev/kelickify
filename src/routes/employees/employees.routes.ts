import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";

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
    [HttpStatusCodes.OK]: jsonContent(selectEmployeeSchema, "The added employee"),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createEmployeeSchema),
      "The validation error(s)",
    ),
  },
});

export type CreateRoute = typeof create;
