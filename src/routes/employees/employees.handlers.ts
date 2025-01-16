import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { employees } from "@/db/schema";

import type { CreateRoute } from "./employees.routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");

  try {
    const [employee] = await db.insert(employees).values(data).returning();
    return c.json(employee, HttpStatusCodes.CREATED);
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return c.json({ message: "Employee with this NRIC already exists" } as const, HttpStatusCodes.CONFLICT);
    }

    throw error;
  }
};
