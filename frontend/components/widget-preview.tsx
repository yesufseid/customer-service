"use client"

import type React from "react"

interface WidgetPreviewProps {
  businessName: string
  welcomeMessage: string
  primaryColor: string
  position: "left" | "right"
  shape: "round" | "square"
}

export function WidgetPreview({ businessName, welcomeMessage, primaryColor, position, shape }: WidgetPreviewProps) {
  const bubbleStyle: React.CSSProperties = {
    backgroundColor: primaryColor,
    borderRadius: shape === "round" ? "50%" : "12px",
  }

  const positionClass = position === "left" ? "left-4" : "right-4"

  return (
    <div className="relative w-full h-full min-h-96 bg-linear-to-br from-muted/40 to-muted/20 rounded-lg overflow-hidden border border-border flex items-end justify-end md:p-8">
      {/* Simulated webpage background */}
      <div className="absolute inset-0 opacity-20">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>

      {/* Widget bubble and chat window */}
      <div className={`relative ${positionClass} bottom-8 w-96 flex flex-col gap-4`}>
        {/* Chat window */}
        <div className="rounded-lg shadow-2xl border border-border overflow-hidden bg-card">
          <div style={{ backgroundColor: primaryColor }} className="text-primary-foreground p-4">
            <h3 className="font-semibold text-sm">{businessName || "Business Name"}</h3>
            <p className="text-xs opacity-90">Typically replies instantly</p>
          </div>
          <div className="p-4 h-48 flex flex-col gap-3">
            <div className="bg-primary/10 rounded-lg p-3 max-w-xs">
              <p className="text-sm text-muted-foreground">{welcomeMessage || "Hello! How can I assist you?"}</p>
            </div>
            <div className="mt-auto">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Chat bubble button */}
        <div className="flex justify-end">
          <button
            style={bubbleStyle}
            className="w-16 h-16 rounded-full shadow-lg hover:shadow-xl t flex items-center justify-center text-white font-bold text-lg hover:scale-110 transition-transform"
          >
            💬
          </button>
        </div>
      </div>
    </div>
  )
}
