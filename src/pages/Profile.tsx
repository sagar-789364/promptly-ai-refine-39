
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Camera, Save, Crown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [dateOfBirth, setDateOfBirth] = useState("1990-01-15");
  const [profession, setProfession] = useState("Software Engineer");
  const [bio, setBio] = useState("AI enthusiast and prompt engineer with a passion for creating innovative solutions.");
  const [userPlan] = useState("Pro");

  const { toast } = useToast();

  const getPlanBadgeColor = () => {
    switch(userPlan) {
      case "Pro": return "bg-gradient-to-r from-purple-500 to-indigo-600";
      case "Enterprise": return "bg-gradient-to-r from-yellow-500 to-orange-600";
      default: return "bg-gradient-to-r from-gray-500 to-gray-600";
    }
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
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
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <User className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Profile Settings</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your personal information and account preferences
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
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={dateOfBirth}
                          onChange={(e) => setDateOfBirth(e.target.value)}
                          className="bg-background border-input"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="profession">Profession</Label>
                        <Input
                          id="profession"
                          value={profession}
                          onChange={(e) => setProfession(e.target.value)}
                          className="bg-background border-input"
                          placeholder="e.g., Software Engineer, Marketing Manager"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="min-h-24 bg-background border-input resize-none"
                        placeholder="Tell us about yourself..."
                      />
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

                <Card className="shadow-card border-border bg-gradient-to-br from-card to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg font-jakarta">Current Plan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge className={`${getPlanBadgeColor()} text-white font-semibold px-4 py-2 text-base`}>
                      <Crown className="w-4 h-4 mr-2" />
                      {userPlan} Plan
                    </Badge>
                    <p className="text-sm text-muted-foreground mt-3">
                      Enjoy unlimited access to all premium features and priority support.
                    </p>
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
