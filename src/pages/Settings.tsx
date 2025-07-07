
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Key, 
  CreditCard,
  Globe,
  Database,
  ChevronRight,
  Sparkles
} from "lucide-react";

export default function Settings() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const settingsItems = [
    {
      title: "Account Settings",
      description: "Manage your account preferences and basic information",
      icon: User,
      href: "/settings/account",
      color: "text-blue-600"
    },
    {
      title: "Security & Privacy",
      description: "Password, two-factor authentication, and privacy settings",
      icon: Shield,
      href: "/settings/security",
      color: "text-green-600"
    },
    {
      title: "Notifications",
      description: "Configure how and when you receive notifications",
      icon: Bell,
      href: "/settings/notifications",
      color: "text-yellow-600"
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of your interface",
      icon: Palette,
      href: "/settings/appearance",
      color: "text-purple-600"
    },
    {
      title: "API Keys",
      description: "Manage your API keys and integrations",
      icon: Key,
      href: "/settings/api-keys",
      color: "text-red-600"
    },
    {
      title: "Billing & Subscription",
      description: "Manage your subscription and billing information",
      icon: CreditCard,
      href: "/settings/billing",
      color: "text-indigo-600"
    },
    {
      title: "Language & Region",
      description: "Set your preferred language and regional settings",
      icon: Globe,
      href: "/settings/language",
      color: "text-teal-600"
    },
    {
      title: "Data Management",
      description: "Export, import, and manage your data and prompts",
      icon: Database,
      href: "/settings/data",
      color: "text-orange-600"
    },
    {
      title: "Workspace Settings",
      description: "Configure default parameters for prompt refinement",
      icon: Sparkles,
      href: "/settings/workspace",
      color: "text-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out scrollbar-thin",
            isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
          )}
        >
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <SettingsIcon className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Settings</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your account settings and preferences
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {settingsItems.map((item) => (
                <Link key={item.href} to={item.href}>
                  <Card className="hover:shadow-ai transition-all duration-200 cursor-pointer h-full border-border shadow-card hover:border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <item.icon className={`h-6 w-6 ${item.color}`} />
                          <CardTitle className="text-lg font-jakarta">{item.title}</CardTitle>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
