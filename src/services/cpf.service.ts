import { differenceInYears } from "date-fns";

import type { CPFCalculationResult, Employee } from "@/lib/types";

import { ACCOUNT_ALLOCATION, CPF_AGE_GROUPS, PR_FACTORS, WAGE_LIMITS } from "@/lib/cpf";

export class CPFService {
  private getApplicableRates(age: number, residencyStatus: Employee["residencyStatus"]) {
    const ageGroup = CPF_AGE_GROUPS.find((group) => age >= group.age.min && age < group.age.max);

    if (!ageGroup) throw new Error("No applicable age group found");

    let factor = 1;
    if (residencyStatus === "PR_FIRST_YEAR") {
      factor = PR_FACTORS.PR_FIRST_YEAR;
    } else if (residencyStatus === "PR_SECOND_YEAR") {
      factor = PR_FACTORS.PR_SECOND_YEAR;
    }

    return {
      employee: ageGroup.rates.employee * factor,
      employer: ageGroup.rates.employer * factor,
    };
  }

  calculateContribution(employee: Employee): CPFCalculationResult {
    const { dateOfBirth, residencyStatus, basicSalary, allowances = 0 } = employee;

    if (Number(basicSalary) < WAGE_LIMITS.MINIMUM_WAGE) {
      throw new Error(`Salary must be at least SGD$${WAGE_LIMITS.MINIMUM_WAGE}`);
    }

    const age = differenceInYears(new Date(), new Date(dateOfBirth));
    const rates = this.getApplicableRates(age, residencyStatus);
    const totalWage = Math.min(Number(basicSalary) + Number(allowances), WAGE_LIMITS.MONTHLY_CEILING);

    const employeeContribution = Number((totalWage * rates.employee).toFixed(2));
    const employerContribution = Number((totalWage * rates.employer).toFixed(2));
    const totalContribution = employeeContribution + employerContribution;

    return {
      contribution: {
        employee: employeeContribution,
        employer: employerContribution,
        total: totalContribution,
      },
      allocation: {
        ordinary: Number((totalContribution * ACCOUNT_ALLOCATION.ORDINARY).toFixed(2)),
        special: Number((totalContribution * ACCOUNT_ALLOCATION.SPECIAL).toFixed(2)),
        medisave: Number((totalContribution * ACCOUNT_ALLOCATION.MEDISAVE).toFixed(2)),
      },
      salary: {
        basic: Number(basicSalary),
        allowances: Number(allowances),
        total: Number(basicSalary) + Number(allowances),
        net: Number(basicSalary) + Number(allowances) - employeeContribution,
      },
    };
  }
}

export const cpfService = new CPFService();
