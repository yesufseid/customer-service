"use client"

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
}

const PRESET_COLORS = [
  "#0F62FE", // Blue
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#9D84B7", // Purple
  "#F2994A", // Orange
  "#1ABC9C", // Turquoise
  "#3498DB", // Sky Blue
  "#E74C3C", // Crimson
]

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-3">
      <div className="flex gap-2 flex-wrap">
        {PRESET_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`w-12 h-12 rounded-lg border-2 transition-all ${
              value === color ? "border-foreground scale-110" : "border-border"
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center">
        <label className="text-sm font-medium">Custom:</label>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-12 h-10 rounded border border-border cursor-pointer"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-3 py-2 border border-border rounded-lg text-sm"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
