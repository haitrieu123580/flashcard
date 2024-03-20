import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  classNameIcon?: string;
  alignIcon?: "left" | "right";
  onClickIcon?: (e: React.MouseEvent) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, icon, classNameIcon, alignIcon = "left", onClickIcon, type, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        {alignIcon === "left" && icon ? (
          <span
            className={cn("", classNameIcon)}
            onClick={onClickIcon}
          >
            {icon}
          </span>
        ) : null}

        <input
          type={type}
          className={cn(
            "h-full w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          // className="w-full p-2 placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"

          ref={ref}
          {...props}
        />
        {alignIcon === "right" && icon ? (
          <span
            className={cn("", classNameIcon)}
            onClick={onClickIcon}
          >
            {icon}
          </span>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
