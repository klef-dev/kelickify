import Queue from "bull";

import env from "@/env";
import { cpfService } from "@/services/cpf.service";

export const cpfQueue = new Queue("cpf-processing", {
  redis: env.REDIS_URL,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

cpfQueue.process(async (job) => {
  const { employee, month } = job.data;

  try {
    // Calculate CPF
    const calculation = cpfService.calculateContribution(employee);

    // Save to database
    await cpfService.saveCalculation(calculation, employee.id, month);

    // TODO: Send email notification to employee

    return { status: "success", employeeId: employee.id };
  } catch (error) {
    console.error(`Failed to process employee ${employee.id}:`, error);
    throw error;
  }
});
