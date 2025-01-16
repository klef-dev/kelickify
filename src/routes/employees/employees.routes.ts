import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema } from "stoker/openapi/schemas";
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
    [HttpStatusCodes.CONFLICT]: jsonContent(z.object({ message: z.string() }), "Duplicate NRIC error"),
  },
});

export type CreateRoute = typeof create;
