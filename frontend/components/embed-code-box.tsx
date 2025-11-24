"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface EmbedCodeBoxProps {
  widgetId: string
  businessName: string
  welcomeMessage: string
  primaryColor: string
  position: "left" | "right"
  shape: "round" | "square"
}

export function EmbedCodeBox({
  widgetId,
  businessName,
  welcomeMessage,
  primaryColor,
  position,
  shape,
}: EmbedCodeBoxProps) {
  const [copied, setCopied] = useState(false)

  const embedCode = `<script 
   src="https://widgets.ai-chat.com/widget.js" 
   data-widget-id="${widgetId}"
   data-business-name="${businessName}"
   data-welcome-message="${welcomeMessage}"
   data-color="${primaryColor}"
   data-position="${position}"
   data-shape="${shape}"
   async
>
</script>`

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-3">
      <div className="relative">
        <pre className="bg-secondary/50 border border-border rounded-lg p-4 text-sm overflow-x-auto text-muted-foreground font-mono leading-relaxed">
          <code>{embedCode}</code>
        </pre>
        <Button onClick={handleCopy} size="sm" variant="outline" className="absolute top-2 right-2 bg-transparent">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Paste this code into your website's HTML. The widget will appear on your page within seconds.
      </p>
    </div>
  )
}
