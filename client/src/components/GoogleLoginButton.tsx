import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, User } from "lucide-react";
import { getStoredUser, simulateGoogleLogin, clearUser, type GoogleUser } from "@/lib/googleAuth";

interface GoogleLoginButtonProps {
  onUserChange?: (user: GoogleUser | null) => void;
}

export function GoogleLoginButton({ onUserChange }: GoogleLoginButtonProps) {
  const [user, setUser] = useState<GoogleUser | null>(null);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    onUserChange?.(storedUser);
  }, []);

  const handleLogin = () => {
    const mockUser = simulateGoogleLogin();
    setUser(mockUser);
    onUserChange?.(mockUser);
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
    onUserChange?.(null);
  };

  if (user) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 rounded-lg border border-border bg-card">
        <img
          src={user.picture}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-xs text-muted-foreground truncate">{user.email}</p>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={handleLogin}
      className="w-full"
      data-testid="button-google-login"
    >
      <User className="w-4 h-4 mr-2" />
      Sign in with Google (Demo)
    </Button>
  );
}
