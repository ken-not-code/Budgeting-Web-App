import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Budgeting App</CardTitle>
          <CardDescription>Track your finances with budgets and analytics.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button>
            <Link href="/auth/login">
              Sign in
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/auth/register">
              Create account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
