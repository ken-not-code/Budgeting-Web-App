"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const budgetSchema = z.object({
  id: z.string().optional(),
  category: z.string().min(1),
  month: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/),
  amount: z.coerce.number().positive(),
});

export type BudgetFormValues = z.infer<typeof budgetSchema>;

export async function upsertBudget(formData: FormData) {
  const user = await requireAuth();
  const values = budgetSchema.parse(Object.fromEntries(formData.entries()));

  await prisma.budget.upsert({
    where: { userId_category_month: { userId: user.id, category: values.category, month: values.month } },
    create: {
      ...values,
      userId: user.id,
    },
    update: {
      amount: values.amount,
    },
  });

  revalidatePath("/dashboard");
}

export async function deleteBudget(id: string) {
  const user = await requireAuth();
  await prisma.budget.deleteMany({ where: { id, userId: user.id } });
  revalidatePath("/dashboard");
}
