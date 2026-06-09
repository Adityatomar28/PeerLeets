import * as React from "react"
import { cn } from "../../lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-sans font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
          // Variants
          variant === "default" && "bg-gradient-to-r from-indigo-600 via-indigo-500 to-pink-500 text-white shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:brightness-105",
          variant === "secondary" && "bg-background-surfaceLight text-text-primary border border-border-subtle hover:bg-card-base hover:border-white/20",
          variant === "outline" && "border border-border-subtle bg-transparent text-text-primary hover:bg-background-surfaceLight hover:border-white/25",
          variant === "destructive" && "bg-accent-rose text-white hover:bg-rose-600 shadow-md shadow-rose-500/10",
          variant === "ghost" && "text-text-secondary hover:bg-white/5 hover:text-white",
          variant === "link" && "text-accent-indigo underline-offset-4 hover:underline",
          // Sizes
          size === "default" && "h-11 px-5 py-2.5",
          size === "sm" && "h-9 rounded-md px-3 text-xs",
          size === "lg" && "h-12 rounded-xl px-8 text-base",
          size === "icon" && "h-9 w-9 p-0",
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <svg className="mr-2 h-4 w-4 animate-spin text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : null}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
