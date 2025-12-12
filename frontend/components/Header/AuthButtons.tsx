"use client";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => window.dispatchEvent(new Event("open-signin"))}
        className="text-sm hover:text-foreground transition"
      >
        Sign In
      </button>

      <button
        onClick={() => window.dispatchEvent(new Event("open-signup"))}
        className="px-3 py-1 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90 transition"
      >
        Sign Up
      </button>
    </div>
  );
}
