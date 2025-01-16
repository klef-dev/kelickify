import { z } from "zod";

export const cpfCalculationSchema = z.object({
  employeeId: z.string().uuid(),
  month: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, "Invalid month format (YYYY-MM)"),
});

export const cpfCalculationResultSchema = z.object({
  contribution: z.object({
    employee: z.number(),
    employer: z.number(),
    total: z.number(),
  }),
  allocation: z.object({
    ordinary: z.number(),
    special: z.number(),
    medisave: z.number(),
  }),
  salary: z.object({
    basic: z.number(),
    allowances: z.number(),
    total: z.number(),
    net: z.number(),
  }),
  id: z.string().uuid().optional(),
  month: z
    .string()
    .regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, "Invalid month format (YYYY-MM)")
    .optional(),
});
