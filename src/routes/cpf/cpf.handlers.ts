import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { cpfContributions, employees } from "@/db/schema";
import { cpfQueue } from "@/queues/cpf.queue";
import { cpfService } from "@/services/cpf.service";

import type { BatchCalculateRoute, CalculateRoute, HistoryRoute } from "./cpf.routes";

export const calculate: AppRouteHandler<CalculateRoute> = async (c) => {
  const { employeeId, month } = c.req.valid("json");

  // Check if calculation already exists for this month
  const existingCalculation = await db.query.cpfContributions.findFirst({
    where: and(eq(cpfContributions.employeeId, employeeId), eq(cpfContributions.month, month)),
  });

  if (existingCalculation) {
    return c.json({ message: "CPF already calculated for this month" }, HttpStatusCodes.BAD_REQUEST);
  }

  // Get employee data
  const employee = await db.query.employees.findFirst({ where: eq(employees.id, employeeId) });

  if (!employee) return c.json({ message: "Employee not found" }, HttpStatusCodes.NOT_FOUND);

  // Calculate CPF
  const calculation = cpfService.calculateContribution(employee);

  // Save calculation
  const contribution = await cpfService.saveCalculation(calculation, employeeId, month);

  return c.json(contribution, HttpStatusCodes.OK);
};

export const history: AppRouteHandler<HistoryRoute> = async (c) => {
  const { employeeId } = c.req.valid("param");

  const contributions = await db.query.cpfContributions.findMany({
    where: eq(cpfContributions.employeeId, employeeId),
    orderBy: (cpfContributions, { desc }) => [desc(cpfContributions.month)],
  });

  return c.json(contributions, HttpStatusCodes.OK);
};

export const batchCalculate: AppRouteHandler<BatchCalculateRoute> = async (c) => {
  const { month } = c.req.valid("json");

  // Get all active employees
  const activeEmployees = await db.query.employees.findMany({
    where: eq(employees.status, "Active"),
  });

  // Calculate CPF for each employee
  activeEmployees.map(async (employee) => await cpfQueue.add({ employee, month }));

  return c.json({ message: `Queued ${activeEmployees.length} employees for CPF calculation` }, HttpStatusCodes.OK);
};
