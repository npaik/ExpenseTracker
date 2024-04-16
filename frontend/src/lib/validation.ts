import * as z from "zod";

export const formSchema = z.object({
  title: z.string(),
  total: z.number(),
});

export const editSearchSchema = z.object({
  id: z.number(),
  title: z.string(),
  total: z.number(),
});
