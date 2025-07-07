
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Palette, Save, Monitor, Sun, Moon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AppearanceSettings() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [fontSize, setFontSize] = useState("medium");
  const [animations, setAnimations] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Appearance Updated",
      description: "Your appearance preferences have been saved successfully.",
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
                <Palette className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Appearance Settings</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Customize the look and feel of your interface
              </p>
            </div>

            <div className="space-y-6 max-w-2xl">
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-jakarta">
                    <Monitor className="h-5 w-5 text-primary" />
                    Theme & Display
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger id="theme" className="bg-background">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border shadow-elevated">
                        <SelectItem value="dark">
                          <div className="flex items-center gap-2">
                            <Moon className="h-4 w-4" />
                            Dark
                          </div>
                        </SelectItem>
                        <SelectItem value="light">
                          <div className="flex items-center gap-2">
                            <Sun className="h-4 w-4" />
                            Light (Coming Soon)
                          </div>
                        </SelectItem>
                        <SelectItem value="system">
                          <div className="flex items-center gap-2">
                            <Monitor className="h-4 w-4" />
                            System (Coming Soon)
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-size">Font Size</Label>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger id="font-size" className="bg-background">
                        <SelectValue placeholder="Select font size" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover border shadow-elevated">
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-jakarta">
                    <Palette className="h-5 w-5 text-primary" />
                    Interface Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="animations">Enable Animations</Label>
                      <p className="text-sm text-muted-foreground">Smooth transitions and animations</p>
                    </div>
                    <Switch id="animations" checked={animations} onCheckedChange={setAnimations} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <p className="text-sm text-muted-foreground">Reduce spacing for more content</p>
                    </div>
                    <Switch id="compact-mode" checked={compactMode} onCheckedChange={setCompactMode} />
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
