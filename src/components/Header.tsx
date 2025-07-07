
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sparkles, User, Settings, LogOut, Bell, CreditCard, Crown, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface HeaderProps {
  onSidebarToggle?: () => void;
  showSidebarToggle?: boolean;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

export function Header({ onSidebarToggle, showSidebarToggle = false, showBackButton = false, onBackClick }: HeaderProps) {
  const location = useLocation();
  const [usageCount] = useState(125);
  const [notificationCount] = useState(3);
  const maxUsage = 1000;
  const usagePercentage = (usageCount / maxUsage) * 100;
  const [userPlan] = useState("Pro");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
      navigate("/");
    }
  };

  const getPlanBadgeColor = () => {
    switch(userPlan) {
      case "Pro": return "bg-gradient-to-r from-purple-500 to-indigo-600";
      case "Enterprise": return "bg-gradient-to-r from-yellow-500 to-orange-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-sm shadow-card">
      <div className="w-full max-w-none flex h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Left side */}
        <div className="flex items-center gap-3 sm:gap-6">
          {showBackButton && onBackClick ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onBackClick}
              className="hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-300"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          ) : showSidebarToggle && onSidebarToggle ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={onSidebarToggle}
              className="hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-300"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </Button>
          ) : null}
          
          <Link to="/" className="flex items-center gap-2 sm:gap-3 font-jakarta font-bold text-lg sm:text-xl">
            <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-ai">
              <Sparkles className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Promptly
              </span>
              <span className="text-xs text-muted-foreground font-normal -mt-1">
                AI Prompt Engineering
              </span>
            </div>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Usage indicator - enhanced with modern styling */}
          <Link to="/billing">
            <div className="hidden md:flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-card/80 to-accent/40 border border-primary/20 backdrop-blur-sm shadow-elevated hover:shadow-glow-subtle transition-all duration-300 hover:border-primary/40 cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🚴</span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    API Usage
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {usageCount.toLocaleString()}/{maxUsage.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="relative">
                <Progress 
                  value={usagePercentage} 
                  className="w-20 h-3 bg-muted/50 border border-border/50 rounded-full overflow-hidden shadow-inner" 
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse pointer-events-none" />
              </div>
            </div>
          </Link>

          {/* Plan Badge - simplified on mobile */}
          <Link to="/billing">
            <Badge className={`${getPlanBadgeColor()} text-white font-semibold px-2 sm:px-3 py-1 shadow-glow-subtle hover:shadow-glow transition-all duration-300 cursor-pointer`}>
              <Crown className="w-3 h-3 mr-1" />
              <span className="hidden sm:inline">{userPlan}</span>
            </Badge>
          </Link>

          {/* Notifications */}
          <Link to="/notifications">
            <Button variant="ghost" size="icon" className="relative hover:bg-accent/50 hover:shadow-glow-subtle transition-all duration-300">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full border-2 border-border hover:border-primary/50 hover:shadow-glow-subtle transition-all duration-300">
                <Avatar className="h-6 w-6 sm:h-8 sm:w-8">
                  <AvatarImage src={user?.profile?.avatar_url} alt={user?.profile?.display_name || "User"} />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-sm">
                    {user?.profile?.display_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 sm:w-64 bg-card/95 backdrop-blur-sm border border-border shadow-elevated rounded-2xl p-3" 
              align="end"
              sideOffset={8}
            >
              <div className="px-3 py-3">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user?.profile?.avatar_url} alt={user?.profile?.display_name || "User"} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold text-lg">
                      {user?.profile?.display_name?.charAt(0) || user?.email?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-foreground">{user?.profile?.display_name || "User"}</p>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                    <Badge className={`${getPlanBadgeColor()} text-white text-xs mt-1`}>
                      {userPlan} Plan
                    </Badge>
                  </div>
                </div>
              </div>
              <DropdownMenuSeparator className="my-2 bg-border" />
              <Link to="/profile">
                <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer rounded-xl px-3 py-2.5 transition-colors">
                  <User className="mr-3 h-4 w-4" />
                  Profile Settings
                </DropdownMenuItem>
              </Link>
              <Link to="/billing">
                <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer rounded-xl px-3 py-2.5 transition-colors">
                  <CreditCard className="mr-3 h-4 w-4" />
                  Billing & Usage
                </DropdownMenuItem>
              </Link>
              <Link to="/settings">
                <DropdownMenuItem className="hover:bg-accent/50 cursor-pointer rounded-xl px-3 py-2.5 transition-colors">
                  <Settings className="mr-3 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="my-2 bg-border" />
              <DropdownMenuItem onClick={handleSignOut} className="hover:bg-red-500/10 cursor-pointer text-red-400 rounded-xl px-3 py-2.5 transition-colors">
                <LogOut className="mr-3 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
