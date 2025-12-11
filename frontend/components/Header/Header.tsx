"use server";
import { supabaseServer } from "@/lib/supabase-server";
import AuthButtons from "@/components/Header/AuthButtons";

const Header = async () => {
  const supabase = await supabaseServer();

  // Only call getSession — this is safe in SSR
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user ?? null;

  console.log("Full Session:", session);
  console.log("User:", user);

  return (
    <nav className="border-b border-border/40 backdrop-blur-sm sticky top-0 z-50 bg-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">WB</span>
          </div>
          <span className="font-bold text-lg">WidgetBuilder</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</a>
          <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">How It Works</a>

          {!user ? (
            <AuthButtons />
          ) : (
            <div className="flex items-center gap-4">
              <a href="/profile" className="w-8 h-8 rounded-full bg-muted hover:bg-muted/70 flex items-center justify-center transition">
                <span className="text-xs font-semibold">
                  {user.email?.[0].toUpperCase()}
                </span>
              </a>

              <form action="/auth/logout" method="post">
                <button type="submit" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
