
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, Mail, Smartphone, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function NotificationSettings() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [emailGeneral, setEmailGeneral] = useState(true);
  const [emailSecurity, setEmailSecurity] = useState(true);
  const [emailMarketing, setEmailMarketing] = useState(false);
  const [pushPrompts, setPushPrompts] = useState(true);
  const [pushUsage, setPushUsage] = useState(true);
  const [pushFeatures, setPushFeatures] = useState(false);

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved successfully.",
    });
  };

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
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Notification Settings</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Configure how and when you receive notifications
              </p>
            </div>

            <div className="space-y-6 max-w-2xl">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-jakarta">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailGeneral">General Updates</Label>
                    <p className="text-sm text-muted-foreground">Product updates and announcements</p>
                  </div>
                  <Switch id="emailGeneral" checked={emailGeneral} onCheckedChange={setEmailGeneral} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailSecurity">Security Alerts</Label>
                    <p className="text-sm text-muted-foreground">Login attempts and security changes</p>
                  </div>
                  <Switch id="emailSecurity" checked={emailSecurity} onCheckedChange={setEmailSecurity} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="emailMarketing">Marketing</Label>
                    <p className="text-sm text-muted-foreground">Tips, tutorials, and promotional content</p>
                  </div>
                  <Switch id="emailMarketing" checked={emailMarketing} onCheckedChange={setEmailMarketing} />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-jakarta">
                  <Smartphone className="h-5 w-5 text-primary" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushPrompts">Prompt Completions</Label>
                    <p className="text-sm text-muted-foreground">When your prompts are processed</p>
                  </div>
                  <Switch id="pushPrompts" checked={pushPrompts} onCheckedChange={setPushPrompts} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushUsage">Usage Alerts</Label>
                    <p className="text-sm text-muted-foreground">When approaching usage limits</p>
                  </div>
                  <Switch id="pushUsage" checked={pushUsage} onCheckedChange={setPushUsage} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="pushFeatures">New Features</Label>
                    <p className="text-sm text-muted-foreground">Notifications about new features</p>
                  </div>
                  <Switch id="pushFeatures" checked={pushFeatures} onCheckedChange={setPushFeatures} />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={handleSave} variant="ai" className="font-semibold px-8">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
