import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">WB</span>
            </div>
            <span className="font-bold text-lg">WidgetBuilder</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
              Build AI Chat Widgets in Minutes
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              No code required. Customize colors, messages, and behavior. Generate an embed code and deploy instantly to
              your website.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Create Your Widget
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                View Demo
              </Button>
            </div>
          </div>

          <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-3xl"></div>
            <div className="relative w-80 h-96 bg-card rounded-3xl shadow-2xl border border-border flex flex-col items-center justify-center gap-6 p-8 text-center">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold text-lg">Chat Widget Preview</h3>
              <p className="text-sm text-muted-foreground">Your customized widget appears here</p>
              <Button size="sm" className="rounded-full mt-4">
                Chat with us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/40">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-lg text-muted-foreground">Everything you need to build professional chat widgets</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Easy Customization",
              description: "Adjust colors, welcome messages, position, and shape with a live preview",
            },
            {
              title: "One-Click Export",
              description: "Copy the embed code and paste it into any website instantly",
            },
            {
              title: "Save Configurations",
              description: "Save multiple widget configurations and manage them all in one place",
            },
            {
              title: "Live Preview",
              description: "See exactly how your widget will look before deploying it",
            },
            {
              title: "Mobile Responsive",
              description: "Widgets automatically adapt to any screen size or device",
            },
            {
              title: "No Technical Skills",
              description: "Zero coding required. Anyone can build a professional widget",
            },
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl border border-border/60 bg-card/50 hover:bg-card/80 transition">
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-border/40">
        <div className="bg-primary/10 rounded-2xl border border-primary/20 p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">Build your first AI chat widget in under 5 minutes</p>
          <Link href="/dashboard">
            <Button size="lg">Create Widget Now</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-card/50 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">WB</span>
              </div>
              <span className="font-semibold">WidgetBuilder</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 WidgetBuilder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
