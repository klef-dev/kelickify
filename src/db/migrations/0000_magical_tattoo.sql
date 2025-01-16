CREATE TYPE "public"."RESIDENCY_STATUS" AS ENUM('CITIZEN', 'PR_FIRST_YEAR', 'PR_SECOND_YEAR');--> statement-breakpoint
CREATE TYPE "public"."STATUS" AS ENUM('Active', 'Inactive');--> statement-breakpoint
CREATE TABLE "cpf_contributions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid,
	"month" varchar(7) NOT NULL,
	"employee_contribution" numeric(10, 2) NOT NULL,
	"employer_contribution" numeric(10, 2) NOT NULL,
	"total_contribution" numeric(10, 2) NOT NULL,
	"ordinary_account" numeric(10, 2) NOT NULL,
	"special_account" numeric(10, 2) NOT NULL,
	"medisave_account" numeric(10, 2) NOT NULL,
	"calculated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "employees" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"nric" varchar(9) NOT NULL,
	"date_of_birth" date NOT NULL,
	"residency_status" "RESIDENCY_STATUS" NOT NULL,
	"basic_salary" numeric(10, 2) NOT NULL,
	"allowances" numeric(10, 2) DEFAULT '0',
	"start_date" date NOT NULL,
	"status" "STATUS" DEFAULT 'Active' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "employees_nric_unique" UNIQUE("nric")
);
--> statement-breakpoint
ALTER TABLE "cpf_contributions" ADD CONSTRAINT "cpf_contributions_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;