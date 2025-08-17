import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground hover:shadow-glow btn-interactive font-semibold",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 btn-interactive",
        outline: "border border-border bg-background hover:bg-card-hover hover:text-foreground btn-interactive",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover btn-interactive",
        ghost: "hover:bg-card-hover hover:text-foreground btn-interactive",
        link: "text-primary underline-offset-4 hover:underline transition-colors",
        accent: "bg-gradient-accent text-accent-foreground hover:shadow-accent-glow btn-interactive font-semibold",
        success: "bg-gradient-success text-success-foreground hover:shadow-lg btn-interactive font-semibold",
        glass: "glass-card text-foreground hover:bg-glass-bg btn-interactive backdrop-blur-xl",
        premium: "bg-gradient-to-r from-primary via-accent to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 text-white font-bold btn-interactive shadow-lg hover:shadow-xl transition-all duration-300",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-4 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-lg px-10 text-lg",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
