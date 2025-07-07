import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Key, Eye, EyeOff, Plus, Trash2, ArrowLeft, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  provider: string;
  created: string;
}

export default function ApiKeysSettings() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [newKeyProvider, setNewKeyProvider] = useState("");
  const { toast } = useToast();

  const handleAddKey = () => {
    if (!newKeyName || !newKeyValue || !newKeyProvider) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: newKeyName,
      key: newKeyValue,
      provider: newKeyProvider,
      created: new Date().toISOString().split('T')[0]
    };

    setApiKeys([...apiKeys, newKey]);
    setNewKeyName("");
    setNewKeyValue("");
    setNewKeyProvider("");
    
    toast({
      title: "API Key Added",
      description: "Your API key has been saved successfully",
    });
  };

  const handleDeleteKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    toast({
      title: "API Key Deleted",
      description: "The API key has been removed",
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
          <div className="container mx-auto p-6 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
              </Button>
            </div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Key className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-jakarta">
                <span className="bg-gradient-primary bg-clip-text text-transparent">API Keys</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              Manage your API keys for various AI providers
            </p>
          </div>

            <div className="space-y-6">
              {/* Information Alert */}
              <Card className="border-yellow-500/50 bg-yellow-500/5 shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                        API Key Management Coming Soon
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                        This feature is currently in development for advanced users who need to build applications with external APIs. 
                        For now, API functionality is handled through our secure backend systems.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
