import { relations } from "drizzle-orm";
import { date, decimal, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const status = pgEnum("STATUS", ["Active", "Inactive"]);
export const residencyStatus = pgEnum("RESIDENCY_STATUS", ["CITIZEN", "PR_FIRST_YEAR", "PR_SECOND_YEAR"]);

export const employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  name: text("name").notNull(),
  nric: varchar("nric", { length: 9 }).notNull().unique(),
  dateOfBirth: date("date_of_birth").notNull(),
  residencyStatus: residencyStatus("residency_status").notNull(),
  basicSalary: decimal("basic_salary", { precision: 10, scale: 2 }).notNull(),
  allowances: decimal("allowances", { precision: 10, scale: 2 }).default("0"),
  startDate: date("start_date").notNull(),
  status: status("status").default("Active").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const cpfContributions = pgTable("cpf_contributions", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  employeeId: uuid("employee_id").references(() => employees.id),
  month: varchar("month", { length: 7 }).notNull(), // Format: YYYY-MM
  employeeContribution: decimal("employee_contribution", { precision: 10, scale: 2 }).notNull(),
  employerContribution: decimal("employer_contribution", { precision: 10, scale: 2 }).notNull(),
  totalContribution: decimal("total_contribution", { precision: 10, scale: 2 }).notNull(),
  ordinaryAccount: decimal("ordinary_account", { precision: 10, scale: 2 }).notNull(),
  specialAccount: decimal("special_account", { precision: 10, scale: 2 }).notNull(),
  medisaveAccount: decimal("medisave_account", { precision: 10, scale: 2 }).notNull(),
  calculatedAt: timestamp("calculated_at").defaultNow(),
});

// Relations
export const employeeRelations = relations(employees, ({ many }) => ({
  contributions: many(cpfContributions),
}));

export const contributionRelations = relations(cpfContributions, ({ one }) => ({
  employee: one(employees, {
    fields: [cpfContributions.employeeId],
    references: [employees.id],
  }),
}));
