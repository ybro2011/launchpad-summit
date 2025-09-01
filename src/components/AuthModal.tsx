import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User } from "lucide-react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isSignUp && !displayName)) return;

    setLoading(true);
    
    try {
      const { error } = isSignUp 
        ? await signUp(email, password, displayName)
        : await signIn(email, password);

      if (error) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: error.message
        });
      } else {
        toast({
          title: isSignUp ? "Welcome to Learn from Leaders!" : "Welcome back!",
          description: isSignUp 
            ? "Please check your email to verify your account."
            : "You've been successfully signed in."
        });
        onOpenChange(false);
        resetForm();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later."
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    resetForm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-primary">
            {isSignUp ? 'Join Learn from Leaders' : 'Welcome Back'}
          </DialogTitle>
          <DialogDescription className="font-body">
            {isSignUp 
              ? 'Create your account to access exclusive talks and connect with like-minded people.'
              : 'Sign in to your account to continue your learning journey.'
            }
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="displayName" className="font-body font-medium text-foreground">
                Display Name
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="displayName"
                  type="text"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="pl-10 font-body"
                  required={isSignUp}
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email" className="font-body font-medium text-foreground">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 font-body"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="font-body font-medium text-foreground">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 font-body"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full shadow-glow font-body"
            disabled={loading}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Button>
        </form>
        
        <div className="text-center pt-4 border-t border-border">
          <p className="font-body text-sm text-muted-foreground">
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMode}
              className="ml-1 font-body font-medium text-primary hover:text-primary-glow"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;