import { type NextRequest, NextResponse } from "next/server"

// In-memory storage (same as in save route)
const widgets: Record<string, any> = {}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const widget = widgets[id]

    if (!widget) {
      return NextResponse.json({ error: "Widget not found" }, { status: 404 })
    }

    return NextResponse.json(widget)
  } catch (error) {
    return NextResponse.json({ error: "Failed to retrieve widget" }, { status: 500 })
  }
}
