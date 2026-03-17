import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export function Progress({ className, value, ...props }: ProgressProps) {
  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800",
        className
      )}
      {...props}
    >
      <div
        className="h-full bg-indigo-600 transition-all dark:bg-indigo-400"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
