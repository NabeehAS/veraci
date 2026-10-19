import { z } from 'zod';

const environmentSchema = z.object({
  PORT: z.string()
    .regex(/^\d+$/)
    .default('3001')
    .transform(Number)
    .pipe(z.number().int().min(1).max(65535)),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
    .default('info'),
});

export function readConfig(environment: NodeJS.ProcessEnv = process.env) {
  const result = environmentSchema.safeParse(environment);
  if (!result.success) {
    const fields = [...new Set(result.error.issues.map((issue) => issue.path[0]))];
    throw new Error(`Invalid configuration: ${fields.join(', ')}.`);
  }

  return { port: result.data.PORT, logLevel: result.data.LOG_LEVEL };
}

export type ApiConfig = ReturnType<typeof readConfig>;
