import { z } from 'zod';

export const livenessSchema = z.strictObject({
  status: z.literal('ok'),
  uptimeSeconds: z.number().nonnegative(),
});
