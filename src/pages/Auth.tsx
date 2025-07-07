import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Mail, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendOtp = () => {
    if (!emailOrPhone) {
      toast({
        title: "Error",
        description: `Please enter your ${loginMethod === "email" ? "email" : "phone number"}`,
        variant: "destructive",
      });
      return;
    }
    
    setShowOtpInput(true);
    toast({
      title: "OTP Sent",
      description: `Verification code sent to your ${loginMethod === "email" ? "email" : "phone number"}`,
    });
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      toast({
        title: "Error",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful login
    toast({
      title: "Success",
      description: "Login successful! Redirecting to workspace...",
    });
    
    setTimeout(() => {
      navigate("/workspace");
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    toast({
      title: "Google Sign-in",
      description: "Redirecting to Google authentication...",
    });
    
    // Simulate Google OAuth flow
    setTimeout(() => {
      navigate("/workspace");
    }, 2000);
  };

  const resetForm = () => {
    setEmailOrPhone("");
    setOtp("");
    setShowOtpInput(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4 font-inter">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-jakarta font-bold text-2xl">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Promptly
            </span>
          </Link>
        </div>

        <Card className="shadow-elevated border-border bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-jakarta font-bold">
              Welcome to Promptly
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Sign in to start refining your prompts with AI
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs value={activeTab} onValueChange={(value) => {
              setActiveTab(value);
              resetForm();
            }}>
              <TabsList className="grid w-full grid-cols-2 bg-muted">
                <TabsTrigger value="login" className="font-medium">Login</TabsTrigger>
                <TabsTrigger value="signup" className="font-medium">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4 mt-6">
                <div className="space-y-4">
                  {/* Login method selector */}
                  <div className="flex gap-2">
                    <Button
                      variant={loginMethod === "email" ? "ai" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLoginMethod("email");
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant={loginMethod === "phone" ? "ai" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLoginMethod("phone");
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {/* Email/Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor="emailOrPhone">
                      {loginMethod === "email" ? "Email Address" : "Phone Number"}
                    </Label>
                    <Input
                      id="emailOrPhone"
                      type={loginMethod === "email" ? "email" : "tel"}
                      placeholder={
                        loginMethod === "email"
                          ? "Enter your email address"
                          : "Enter your phone number"
                      }
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      disabled={showOtpInput}
                      className="bg-background border-input"
                    />
                  </div>

                  {/* OTP Input */}
                  {showOtpInput && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="otp">Verification Code</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="bg-background border-input"
                      />
                      <p className="text-sm text-muted-foreground">
                        We've sent a verification code to your {loginMethod}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {!showOtpInput ? (
                    <Button onClick={handleSendOtp} variant="ai" className="w-full font-medium">
                      Send Verification Code
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button onClick={handleVerifyOtp} variant="ai" className="w-full font-medium">
                        Verify & Continue
                      </Button>
                      <Button 
                        onClick={resetForm} 
                        variant="ghost" 
                        className="w-full text-sm"
                      >
                        Use different {loginMethod === "email" ? "email" : "phone number"}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4 mt-6">
                <div className="space-y-4">
                  {/* Signup method selector */}
                  <div className="flex gap-2">
                    <Button
                      variant={loginMethod === "email" ? "ai" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLoginMethod("email");
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </Button>
                    <Button
                      variant={loginMethod === "phone" ? "ai" : "outline"}
                      size="sm"
                      onClick={() => {
                        setLoginMethod("phone");
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      Phone
                    </Button>
                  </div>

                  {/* Email/Phone Input */}
                  <div className="space-y-2">
                    <Label htmlFor="signupEmailOrPhone">
                      {loginMethod === "email" ? "Email Address" : "Phone Number"}
                    </Label>
                    <Input
                      id="signupEmailOrPhone"
                      type={loginMethod === "email" ? "email" : "tel"}
                      placeholder={
                        loginMethod === "email"
                          ? "Enter your email address"
                          : "Enter your phone number"
                      }
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      disabled={showOtpInput}
                      className="bg-background border-input"
                    />
                  </div>

                  {/* OTP Input for signup */}
                  {showOtpInput && (
                    <div className="space-y-2 animate-fade-in">
                      <Label htmlFor="signupOtp">Verification Code</Label>
                      <Input
                        id="signupOtp"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        className="bg-background border-input"
                      />
                      <p className="text-sm text-muted-foreground">
                        We've sent a verification code to your {loginMethod}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons for signup */}
                  {!showOtpInput ? (
                    <Button onClick={handleSendOtp} variant="ai" className="w-full font-medium">
                      Create Account
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button onClick={handleVerifyOtp} variant="ai" className="w-full font-medium">
                        Verify & Create Account
                      </Button>
                      <Button 
                        onClick={resetForm} 
                        variant="ghost" 
                        className="w-full text-sm"
                      >
                        Use different {loginMethod === "email" ? "email" : "phone number"}
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Sign-in */}
            <Button
              onClick={handleGoogleSignIn}
              variant="outline"
              className="w-full font-medium bg-background hover:bg-accent"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Footer text */}
            <p className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}