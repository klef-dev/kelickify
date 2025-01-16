import { and, eq } from "drizzle-orm";
import * as HttpStatusCodes from "stoker/http-status-codes";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { cpfContributions, employees } from "@/db/schema";
import { cpfService } from "@/services/cpf.service";

import type { CalculateRoute, HistoryRoute } from "./cpf.routes";

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
  const [contribution] = await db
    .insert(cpfContributions)
    .values({
      employeeId,
      month,
      employeeContribution: String(calculation.contribution.employee),
      employerContribution: String(calculation.contribution.employer),
      totalContribution: String(calculation.contribution.total),
      ordinaryAccount: String(calculation.allocation.ordinary),
      specialAccount: String(calculation.allocation.special),
      medisaveAccount: String(calculation.allocation.medisave),
    })
    .returning();

  return c.json({ id: contribution.id, month, ...calculation }, HttpStatusCodes.OK);
};

export const history: AppRouteHandler<HistoryRoute> = async (c) => {
  const { employeeId } = c.req.valid("param");

  const contributions = await db.query.cpfContributions.findMany({
    where: eq(cpfContributions.employeeId, employeeId),
    orderBy: (cpfContributions, { desc }) => [desc(cpfContributions.month)],
  });

  return c.json(contributions, HttpStatusCodes.OK);
};