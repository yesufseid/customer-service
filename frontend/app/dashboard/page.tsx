"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WidgetPreview } from "@/components/widget-preview"
import { WidgetForm, type WidgetConfig } from "@/components/widget-form"
import { EmbedCodeBox } from "@/components/embed-code-box"
import { AlertCircle } from "lucide-react"
import Script from "next/script";

export default function DashboardPage() {
  const [config, setConfig] = useState<WidgetConfig & { id?: string }>({
    id: "widget_001",
    businessName: "My Business",
    welcomeMessage: "Hello! How can I assist you?",
    primaryColor: "#0F62FE",
    position: "right",
    shape: "round",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState("")

  const handleSave = async (newConfig: WidgetConfig) => {
    setIsSaving(true)
    try {
      const response = await fetch("/api/widget/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user_001",
          ...newConfig,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setConfig({ ...newConfig, id: data.widget_id })
        setSavedMessage("Widget configuration saved successfully!")
        setTimeout(() => setSavedMessage(""), 3000)
      }
    } catch (error) {
      console.error("Error saving widget:", error)
    } finally {
      setIsSaving(false)
    }
  }
  
  
  return (
    <>
       <Script 
   src="http://localhost:3001/widget/widget.js" 
   data-widget-id={config.id}
   data-business-name={config.businessName}
   data-welcome-message={config.welcomeMessage}
   data-color={config.primaryColor}
   data-position={config.position}
   data-shape={config.shape}
   async
>
</Script>
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold">WB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">Widget Builder</h1>
                <p className="text-sm text-muted-foreground">Customize your AI chat widget</p>
              </div>
            </div>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              ← Back to Home
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {savedMessage && (
          <div className="mb-6 p-4 bg-primary/10 border border-primary/20 rounded-lg text-sm text-foreground flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            {savedMessage}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Form Controls */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-6">Settings</h2>
              <WidgetForm onSave={handleSave} isSaving={isSaving} />
            </Card>
          </div>

          {/* Right: Preview and Code */}
          <div className="lg:col-span-2 space-y-8">
            {/* Preview */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Preview</h2>
              <WidgetPreview {...config} />
            </Card>

            {/* Tabs for Code and Details */}
            <Card className="p-6">
              <Tabs defaultValue="code" className="space-y-4">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="code">Embed Code</TabsTrigger>
                  <TabsTrigger value="details">Details</TabsTrigger>
                </TabsList>

                <TabsContent value="code">
                  <EmbedCodeBox widgetId={config.id || "widget_001"} {...config} />
                </TabsContent>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Widget ID</p>
                      <p className="font-mono text-sm font-semibold">{config.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Position</p>
                      <p className="font-semibold capitalize">{config.position}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Shape</p>
                      <p className="font-semibold capitalize">{config.shape}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Primary Color</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-6 h-6 rounded border border-border"
                          style={{ backgroundColor: config.primaryColor }}
                        />
                        <span className="font-mono text-sm">{config.primaryColor}</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
