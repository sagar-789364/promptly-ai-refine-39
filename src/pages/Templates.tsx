
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { DatabaseService } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";
import { Search, Copy, Star, Sparkles, FileText, Code, MessageSquare, Briefcase } from "lucide-react";

export default function Templates() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await DatabaseService.getPromptTemplates({
        public_only: true,
        search: searchTerm || undefined,
        category: selectedCategory || undefined
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      setTemplates(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load templates",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounceTimer = setTimeout(loadTemplates, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchTerm, selectedCategory]);

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(templates.map(t => t.category))];

  const copyToClipboard = async (prompt: string, templateId: string) => {
    try {
      await navigator.clipboard.writeText(prompt);
      
      // Increment usage count
      await DatabaseService.incrementTemplateUsage(templateId);
      
      toast({
        title: "Copied",
        description: "Template copied to clipboard",
      });
      
      // Refresh templates to update usage count
      loadTemplates();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy template",
        variant: "destructive",
      });
    }
  };

  const useTemplate = (template: any) => {
    const url = `/workspace?prompt=${encodeURIComponent(template.template_prompt)}`;
    window.location.href = url;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Development": return Code;
      case "Marketing": return Sparkles;
      case "Documentation": return FileText;
      case "Support": return MessageSquare;
      case "Business": return Briefcase;
      case "Creative": return Star;
      default: return FileText;
    }
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
                Prompt Templates
              </h1>
              <p className="text-xl text-muted-foreground">
                Ready-to-use prompt templates for common AI tasks
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge 
                  variant={selectedCategory === "" ? "default" : "outline"} 
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => setSelectedCategory("")}
                >
                  All
                </Badge>
                {categories.map(category => (
                  <Badge 
                    key={category} 
                    variant={selectedCategory === category ? "default" : "outline"} 
                    className="cursor-pointer hover:bg-accent"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading templates...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => {
                  const Icon = getCategoryIcon(template.category);
                  return (
                    <Card key={template.id} className="group hover:shadow-glow-subtle transition-all duration-300 hover:scale-105">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <Icon className="h-6 w-6 text-primary" />
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">
                            {template.template_prompt}
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {template.tags?.map((tag: string) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Used {template.usage_count || 0} times
                            </span>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(template.template_prompt, template.id)}
                                className="hover:bg-accent"
                              >
                                <Copy className="h-4 w-4 mr-2" />
                                Copy
                              </Button>
                              <Button
                                size="sm"
                                variant="default"
                                onClick={() => useTemplate(template)}
                                className="hover:bg-primary/90"
                              >
                                Use
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {!loading && filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
