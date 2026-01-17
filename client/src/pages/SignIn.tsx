import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { useSupabaseAuth } from "@/contexts/SupabaseAuthContext";
import { supabase } from "@/lib/supabase";
import { useLocation, Link } from "wouter";
import { BookOpen } from "lucide-react";

export default function SignIn() {
  const { user } = useSupabaseAuth();
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const signInWithEmail = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    if (error) setMessage(error.message);
    else setMessage("メールを送信しました。リンクからログインしてください。");
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    if (error) {
      setMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <a className="flex items-center gap-2 text-2xl font-bold text-primary hover:opacity-80">
              <BookOpen className="w-8 h-8" />
              <span>英検7×7ナビ</span>
            </a>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>ログイン</CardTitle>
              <CardDescription>メールリンクまたはGoogleでログイン</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <InputGroup>
                  <InputGroupAddon>Email</InputGroupAddon>
                  <InputGroupInput
                    value={email}
                    onChange={(e: any) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    type="email"
                  />
                </InputGroup>
                <Button disabled={loading || !email} onClick={signInWithEmail} className="w-full">
                  メールでログインリンクを送信
                </Button>
              </div>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">または</span>
                </div>
              </div>
              <Button disabled={loading} onClick={signInWithGoogle} variant="outline" className="w-full">
                Googleでログイン
              </Button>
              {message && <p className="text-sm text-gray-700">{message}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
