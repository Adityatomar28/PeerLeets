import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "../../lib/utils"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  description?: string
  children: React.ReactNode
  className?: string
}

export function Dialog({
  isOpen,
  onClose,
  title,
  description,
  children,
  className,
}: DialogProps) {
  // Listen for escape key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.35 }}
            className={cn(
              "relative z-10 w-full max-w-lg rounded-xl border border-border-subtle bg-background-surface p-6 shadow-glow overflow-hidden text-left",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-display font-extrabold text-lg text-text-primary">
                  {title}
                </h3>
                {description && (
                  <p className="font-sans text-xs text-text-secondary mt-1">
                    {description}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-text-secondary hover:bg-white/5 hover:text-text-primary transition-all cursor-pointer"
                style={{ background: "none", border: "none" }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Inner Content */}
            <div className="mt-2">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
