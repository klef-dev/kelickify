import { eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { employees } from "@/db/schema";

import type { CreateRoute, GetAllRoute, GetOneRoute } from "./employees.routes";

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const data = c.req.valid("json");

  try {
    const [employee] = await db.insert(employees).values(data).returning();
    return c.json(employee, HttpStatusCodes.CREATED);
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique constraint")) {
      return c.json({ message: "Employee with this NRIC already exists" }, HttpStatusCodes.BAD_REQUEST);
    }

    throw error;
  }
};

export const getAll: AppRouteHandler<GetAllRoute> = async (c) => {
  const employeeList = await db.query.employees.findMany({ where: eq(employees.status, "Active") });

  return c.json(employeeList, HttpStatusCodes.OK);
};

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const employee = await db.query.employees.findFirst({ where: eq(employees.id, id) });

  if (!employee) return c.json({ message: "Employee not found" }, HttpStatusCodes.NOT_FOUND);

  return c.json(employee, HttpStatusCodes.OK);
};
