"use client";

import { Progress } from "@/components/ui/progress";
import { formatCurrency } from "@/lib/utils";

interface Budget {
  id: string;
  category: string;
  month: string;
  amount: number;
}

export function BudgetProgressList({
  budgets,
  expenses,
  month,
}: {
  budgets: Budget[];
  expenses: Record<string, number>;
  month: string;
}) {
  if (budgets.length === 0) {
    return <p className="text-sm text-slate-500">No budgets set yet.</p>;
  }

  return (
    <div className="space-y-4">
      {budgets.map((budget) => {
        const spent = expenses[budget.category] ?? 0;
        const percent = Math.min(100, (spent / budget.amount) * 100);

        return (
          <div key={budget.id} className="space-y-1">
            <div className="flex items-center justify-between text-sm font-medium">
              <span>{budget.category}</span>
              <span className="text-slate-600 dark:text-slate-300">
                {formatCurrency(spent)} / {formatCurrency(budget.amount)}
              </span>
            </div>
            <Progress
              value={percent}
              className={percent >= 90 ? "bg-amber-400" : ""}
            />
            {percent >= 90 ? (
              <p className="text-xs text-amber-600 dark:text-amber-300">
                Approaching budget limit
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
