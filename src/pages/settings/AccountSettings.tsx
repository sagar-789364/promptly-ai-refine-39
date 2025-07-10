
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, User, Save, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseService } from "@/lib/database";

export default function AccountSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("");

  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    if (!user) return;
    
    try {
      const { data: profile } = await DatabaseService.getUserSettings(user.id);
      if (profile) {
        setName(profile.display_name || '');
        setProfession(profile.profession || '');
      }
      setEmail(user.email || '');
    } catch (error) {
      console.error('Failed to load user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      await DatabaseService.updateUserSettings(user.id, {
        display_name: name,
        profession: profession
      });
      
      // Track settings update
      await DatabaseService.trackEvent(user.id, 'profile_updated', {
        fields_updated: ['display_name', 'profession']
      });
      
      toast({
        title: "Account Updated",
        description: "Your account information has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
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
                <User className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Account Settings</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your account information and preferences
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-jakarta">
                    <User className="h-5 w-5 text-primary" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                         <Label htmlFor="name">Full Name</Label>
                         <Input
                           id="name"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           className="bg-background border-input"
                           disabled={loading}
                         />
                       </div>
                       <div className="space-y-2">
                         <Label htmlFor="profession">Profession</Label>
                         <Input
                           id="profession"
                           value={profession}
                           onChange={(e) => setProfession(e.target.value)}
                           className="bg-background border-input"
                           placeholder="This becomes your default AI persona"
                           disabled={loading}
                         />
                       </div>
                    </div>
                       <div className="space-y-2">
                         <Label htmlFor="email">Email Address</Label>
                         <p className="text-sm text-muted-foreground">Email cannot be changed after account creation</p>
                         <Input
                           id="email"
                           type="email"
                           value={email}
                           disabled
                           className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                         />
                       </div>
                  </CardContent>
              </Card>

               <div className="flex justify-end">
                 <Button onClick={handleSave} variant="ai" className="font-semibold px-8" disabled={saving || loading}>
                   <Save className="mr-2 h-4 w-4" />
                   {saving ? 'Saving...' : 'Save Changes'}
                 </Button>
               </div>
            </div>

            <div className="space-y-6">
              <Card className="shadow-card border-border">
                <CardHeader>
                  <CardTitle className="text-lg font-jakarta">Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/avatars/01.png" alt="User" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white font-semibold text-2xl">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="mr-2 h-4 w-4" />
                    Change Photo
                  </Button>
                </CardContent>
              </Card>
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
