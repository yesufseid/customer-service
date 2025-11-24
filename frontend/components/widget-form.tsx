"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { ColorPicker } from "./color-picker"
import { Save } from "lucide-react"

interface WidgetFormProps {
  onSave: (config: WidgetConfig) => void
  isSaving: boolean
}

export interface WidgetConfig {
  businessName: string
  welcomeMessage: string
  primaryColor: string
  position: "left" | "right"
  shape: "round" | "square"
}

export function WidgetForm({ onSave, isSaving }: WidgetFormProps) {
  const [config, setConfig] = useState<WidgetConfig>({
    businessName: "My Business",
    welcomeMessage: "Hello! How can I assist you?",
    primaryColor: "#0F62FE",
    position: "right",
    shape: "round",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(config)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="business-name">Business Name</Label>
        <Input
          id="business-name"
          value={config.businessName}
          onChange={(e) => setConfig({ ...config, businessName: e.target.value })}
          placeholder="Enter your business name"
        />
      </div>

      <div className="space-y-3">
        <Label htmlFor="welcome-message">Welcome Message</Label>
        <Textarea
          id="welcome-message"
          value={config.welcomeMessage}
          onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
          placeholder="Enter the message users see when they open the chat"
          rows={3}
        />
      </div>

      <div className="space-y-3">
        <Label>Primary Color</Label>
        <ColorPicker value={config.primaryColor} onChange={(color) => setConfig({ ...config, primaryColor: color })} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <Label htmlFor="position">Position</Label>
          <Select value={config.position} onValueChange={(value: any) => setConfig({ ...config, position: value })}>
            <SelectTrigger id="position">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="left">Bottom Left</SelectItem>
              <SelectItem value="right">Bottom Right</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <Label htmlFor="shape">Bubble Shape</Label>
          <Select value={config.shape} onValueChange={(value: any) => setConfig({ ...config, shape: value })}>
            <SelectTrigger id="shape">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="round">Round</SelectItem>
              <SelectItem value="square">Square</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" disabled={isSaving} className="w-full" size="lg">
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "Saving..." : "Save Widget Configuration"}
      </Button>
    </form>
  )
}
