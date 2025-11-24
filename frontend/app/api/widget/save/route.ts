import { type NextRequest, NextResponse } from "next/server"

// In-memory storage for demo purposes
const widgets: Record<string, any> = {}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { user_id, businessName, welcomeMessage, primaryColor, position, shape } = body

    if (!user_id) {
      return NextResponse.json({ error: "user_id is required" }, { status: 400 })
    }

    const widget_id = `widget_${Date.now()}`

    widgets[widget_id] = {
      widget_id,
      user_id,
      businessName,
      welcomeMessage,
      primaryColor,
      position,
      shape,
      created_at: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      widget_id,
      message: "Widget configuration saved successfully",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to save widget configuration" }, { status: 500 })
  }
}
