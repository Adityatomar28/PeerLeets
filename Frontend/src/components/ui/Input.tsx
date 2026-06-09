import * as React from "react"
import { cn } from "../../lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border bg-background-surface/50 px-3.5 py-2 text-sm text-text-primary font-sans transition-all file:border-0 file:bg-transparent file:text-sm file:font-semibold placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50",
          error 
            ? "border-accent-rose focus-visible:ring-accent-rose" 
            : "border-border-subtle focus-visible:border-white/20",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
