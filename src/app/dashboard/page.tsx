import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

import { formatCurrency, monthKey } from "@/lib/utils";
import { ExpensePieChart } from "@/components/charts/ExpensePieChart";
import { IncomeExpenseBar } from "@/components/charts/IncomeExpenseBar";
import { BudgetProgressList } from "@/components/budget/BudgetProgressList";
import { TransactionTable } from "@/components/transaction/TransactionTable";
import { TransactionFormDialog } from "@/components/transaction/TransactionFormDialog";
import { BudgetFormDialog } from "@/components/budget/BudgetFormDialog";
import { SignOutButton } from "@/components/auth/SignOutButton";

export default async function DashboardPage() {
  let session;
  try {
    session = await getAuthSession();
  } catch (error) {
    console.error("Auth session error:", error);
    redirect("/auth/login");
    return null;
  }
  if (!session?.user) redirect("/auth/login");


  const userId = session.user.id;
  const now = new Date();
  const thisMonth = monthKey(now);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [transactions, budgets] = await Promise.all([
    prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 10,
    }),
    prisma.budget.findMany({
      where: { userId },
      orderBy: { category: "asc" },
    }),
  ]);

  const monthlyTransactions = await prisma.transaction.findMany({
    where: { userId, date: { gte: monthStart } },
  });

  const incomeThisMonth = monthlyTransactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenseThisMonth = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = incomeThisMonth - expenseThisMonth;

  const totalsByCategory = monthlyTransactions
    .filter((t) => t.type === "expense")
    .reduce<Record<string, number>>((acc, t) => {
      if (!acc[t.category]) acc[t.category] = 0;
      acc[t.category] += t.amount;
      return acc;
    }, {});

  const chartData = Object.entries(totalsByCategory).map(([category, value]) => ({
    category,
    value,
  }));

  const months = Array.from({ length: 6 }).map((_, idx) => {
    const d = new Date(now.getFullYear(), now.getMonth() - idx, 1);
    return monthKey(d);
  }).reverse();

  const monthTransactions = await prisma.transaction.groupBy({
    by: ["date", "type"],
    where: {
      userId,
      date: {
        gte: new Date(new Date().setMonth(now.getMonth() - 5, 1)),
      },
    },
    _sum: { amount: true },
  });

  const incomeByMonth = new Map<string, number>();
  const expenseByMonth = new Map<string, number>();

  monthTransactions.forEach((group) => {
    const month = monthKey(group.date);
    const sum = group._sum.amount ?? 0;
    if (group.type === "income") incomeByMonth.set(month, sum);
    if (group.type === "expense") expenseByMonth.set(month, sum);
  });

  const trendChartData = months.map((month) => ({
    month,
    income: incomeByMonth.get(month) ?? 0,
    expense: expenseByMonth.get(month) ?? 0,
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <header className="border-b border-slate-200 bg-white/70 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
          <div>
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Track your budget, transactions & analytics.
            </p>
          </div>
          <div className="flex gap-2">
            <TransactionFormDialog />
            <BudgetFormDialog />
            <SignOutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Income - Expenses (this month)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{formatCurrency(balance)}</div>
              <div className="mt-2 flex gap-4 text-sm">
                <span className="text-green-600 dark:text-green-400">Income: {formatCurrency(incomeThisMonth)}</span>
                <span className="text-red-600 dark:text-red-400">Expense: {formatCurrency(expenseThisMonth)}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Charts</CardTitle>
              <CardDescription>Expense breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 lg:grid-cols-2">
              <ExpensePieChart data={chartData} />
              <IncomeExpenseBar data={trendChartData} />
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Budget Usage</CardTitle>
              <CardDescription>Monthly budget progress</CardDescription>
            </CardHeader>
            <CardContent>
              <BudgetProgressList budgets={budgets} expenses={totalsByCategory} month={thisMonth} />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Latest activity</CardDescription>
            </CardHeader>
            <CardContent>
              <TransactionTable transactions={transactions} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
