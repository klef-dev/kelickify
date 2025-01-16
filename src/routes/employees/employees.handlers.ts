import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { employees } from "@/db/schema";

import type { CreateRoute } from "./employees.routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const employee = c.req.valid("json");
  const [inserted] = await db.insert(employees).values(employee).returning();
  return c.json(inserted, HttpStatusCodes.OK);
};
