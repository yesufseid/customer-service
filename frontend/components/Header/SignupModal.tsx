"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Eye, EyeOff, Github, Mail } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupModal() {
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-signup", handler);
    return () => window.removeEventListener("open-signup", handler);
  }, []);

  async function handleSignUp(e: any) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    alert("Please check your email to confirm your account!");
    setOpen(false);
  }

  async function signUpWithProvider(provider: "github" | "google") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-sm animate-in fade-in slide-in-from-bottom duration-200">
        <DialogHeader>
          <DialogTitle>Create an Account</DialogTitle>
          <DialogDescription>Start building widgets instantly</DialogDescription>
        </DialogHeader>

        {errorMsg && (
          <div className="p-2 rounded-md bg-red-100 text-red-700 text-sm">{errorMsg}</div>
        )}

        <form onSubmit={handleSignUp} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-2.5 text-muted-foreground"
            >
              {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <div className="border-t pt-4 flex flex-col gap-3">
          <Button variant="outline" className="w-full" onClick={() => signUpWithProvider("google")}>
            <Mail className="mr-2 h-4 w-4" /> Continue with Google
          </Button>

          <Button variant="outline" className="w-full" onClick={() => signUpWithProvider("github")}>
            <Github className="mr-2 h-4 w-4" /> Continue with GitHub
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
