
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseService } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { Search, Bookmark, Trash2, Edit, Share, Calendar } from "lucide-react";

export default function Saved() {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadSavedPrompts();
    }
  }, [user]);

  const loadSavedPrompts = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await DatabaseService.getUserPrompts(user.id, { saved: true });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setSavedPrompts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load saved prompts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const mockSavedPrompts = [
    {
      id: 1,
      title: "Product Launch Strategy",
      content: "Create a comprehensive product launch strategy for a new SaaS tool targeting small businesses. Include market analysis, pricing strategy, and go-to-market plan.",
      tags: ["strategy", "saas", "marketing"],
      savedAt: "2024-01-15",
      category: "Business",
      lastUsed: "2024-01-20"
    },
    {
      id: 2,
      title: "React Component Documentation",
      content: "Generate comprehensive documentation for React components including props, usage examples, and best practices for the component library.",
      tags: ["react", "documentation", "components"],
      savedAt: "2024-01-12",
      category: "Development",
      lastUsed: "2024-01-18"
    },
    {
      id: 3,
      title: "Email Marketing Campaign",
      content: "Design an email marketing campaign for customer retention, including subject lines, content strategy, and A/B testing recommendations.",
      tags: ["email", "marketing", "retention"],
      savedAt: "2024-01-10",
      category: "Marketing",
      lastUsed: "2024-01-16"
    },
    {
      id: 4,
      title: "API Error Handling Guide",
      content: "Create a comprehensive guide for API error handling patterns, including status codes, error messages, and client-side handling strategies.",
      tags: ["api", "error-handling", "backend"],
      savedAt: "2024-01-08",
      category: "Development",
      lastUsed: "2024-01-14"
    },
    {
      id: 5,
      title: "User Onboarding Flow",
      content: "Design an effective user onboarding flow for a mobile app, including welcome screens, feature introductions, and engagement tactics.",
      tags: ["ux", "onboarding", "mobile"],
      savedAt: "2024-01-05",
      category: "Design",
      lastUsed: "2024-01-12"
    }
  ];

  const filteredPrompts = savedPrompts.filter(prompt =>
    (prompt.title && prompt.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    prompt.initial_prompt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (prompt.refined_prompt && prompt.refined_prompt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out",
            isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
          )}
        >
          <div className="container mx-auto p-6 max-w-6xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Saved Prompts
              </h1>
              <p className="text-xl text-muted-foreground">
                Your bookmarked prompts and templates
              </p>
            </div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search saved prompts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Saved Prompts List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading saved prompts...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredPrompts.map((prompt) => (
                  <Card key={prompt.id} className="group hover:shadow-glow-subtle transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Bookmark className="h-4 w-4 text-primary fill-current" />
                            <CardTitle className="text-lg">
                              {prompt.title || prompt.initial_prompt.substring(0, 50) + "..."}
                            </CardTitle>
                            <Badge variant="outline">{prompt.target_model || "General"}</Badge>
                          </div>
                          <CardDescription className="text-base">
                            {prompt.refined_prompt || prompt.initial_prompt}
                          </CardDescription>
                        </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Share className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {prompt.tone && (
                            <Badge variant="secondary" className="text-xs">
                              {prompt.tone}
                            </Badge>
                          )}
                          {prompt.persona && (
                            <Badge variant="secondary" className="text-xs">
                              {prompt.persona}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Saved {formatDate(prompt.created_at)}
                          </div>
                          <div>
                            Updated {formatDate(prompt.updated_at)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredPrompts.length === 0 && (
              <div className="text-center py-12">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved prompts found</h3>
                <p className="text-muted-foreground">
                  {searchTerm ? "Try adjusting your search terms" : "Start saving your favorite prompts to see them here"}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
