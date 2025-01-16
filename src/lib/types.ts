import type { OpenAPIHono, RouteConfig, RouteHandler, z } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

import type { cpfCalculationResultSchema, cpfCalculationSchema } from "@/schemas/cpf";
import type { createEmployeeSchema, selectEmployeeSchema } from "@/schemas/employee";

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type Employee = z.infer<typeof selectEmployeeSchema>;
export type CreateEmployee = z.infer<typeof createEmployeeSchema>;
export type CPFCalculationRequest = z.infer<typeof cpfCalculationSchema>;
export type CPFCalculationResult = z.infer<typeof cpfCalculationResultSchema>;
