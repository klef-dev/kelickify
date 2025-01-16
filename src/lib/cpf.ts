/**
 * CPF Contribution Rates
 * Reference: https://www.cpf.gov.sg/employer/infohub/news/cpf-related-announcements/new-contribution-rates
 * Updated as of: Jan 2025
 */

export const CPF_AGE_GROUPS = [
  {
    age: { min: 0, max: 55 },
    rates: { employee: 0.20, employer: 0.17 },
  },
  {
    age: { min: 55, max: 60 },
    rates: { employee: 0.17, employer: 0.155 },
  },
  {
    age: { min: 60, max: 65 },
    rates: { employee: 0.115, employer: 0.12 },
  },
  {
    age: { min: 65, max: 70 },
    rates: { employee: 0.075, employer: 0.09 },
  },
  {
    age: { min: 70, max: Infinity },
    rates: { employee: 0.05, employer: 0.075 },
  },
] as const;

export const PR_FACTORS = {
  PR_FIRST_YEAR: 0.7,
  PR_SECOND_YEAR: 0.9,
} as const;

export const WAGE_LIMITS = {
  MINIMUM_WAGE: 500,
  MONTHLY_CEILING: 6000,
  ANNUAL_CEILING: 102000,
} as const;

export const ACCOUNT_ALLOCATION = {
  ORDINARY: 0.23,
  SPECIAL: 0.08,
  MEDISAVE: 0.06,
} as const;
