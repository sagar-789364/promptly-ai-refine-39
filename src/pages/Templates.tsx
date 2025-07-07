
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Search, Copy, Star, Sparkles, FileText, Code, MessageSquare, Briefcase } from "lucide-react";

export default function Templates() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const templates = [
    {
      id: 1,
      title: "Code Review Assistant",
      description: "Generate comprehensive code reviews with suggestions for improvement",
      category: "Development",
      icon: Code,
      prompt: "Please review the following code and provide detailed feedback on code quality, potential bugs, performance optimizations, and best practices:",
      tags: ["code", "review", "development"],
      usage: 1247
    },
    {
      id: 2,
      title: "Marketing Copy Generator",
      description: "Create compelling marketing copy for products and services",
      category: "Marketing",
      icon: Sparkles,
      prompt: "Create engaging marketing copy for [PRODUCT/SERVICE]. Focus on benefits, emotional appeal, and call-to-action. Target audience: [AUDIENCE]",
      tags: ["marketing", "copywriting", "sales"],
      usage: 892
    },
    {
      id: 3,
      title: "Technical Documentation",
      description: "Generate clear and comprehensive technical documentation",
      category: "Documentation",
      icon: FileText,
      prompt: "Create detailed technical documentation for [FEATURE/API/SYSTEM]. Include overview, implementation details, examples, and troubleshooting guide:",
      tags: ["documentation", "technical", "guide"],
      usage: 634
    },
    {
      id: 4,
      title: "Customer Support Response",
      description: "Craft professional and helpful customer support responses",
      category: "Support",
      icon: MessageSquare,
      prompt: "Generate a professional customer support response for the following inquiry. Be empathetic, helpful, and provide clear next steps:",
      tags: ["support", "customer", "communication"],
      usage: 445
    },
    {
      id: 5,
      title: "Business Plan Generator",
      description: "Create comprehensive business plan sections",
      category: "Business",
      icon: Briefcase,
      prompt: "Generate a detailed business plan section for [SECTION TYPE]. Include market analysis, financial projections, and strategic recommendations for [BUSINESS TYPE]:",
      tags: ["business", "planning", "strategy"],
      usage: 321
    },
    {
      id: 6,
      title: "Creative Writing Assistant",
      description: "Help with creative writing projects and storytelling",
      category: "Creative",
      icon: Star,
      prompt: "Help me develop a creative story with the following elements: [GENRE], [SETTING], [CHARACTERS]. Focus on engaging narrative and character development:",
      tags: ["creative", "writing", "storytelling"],
      usage: 267
    }
  ];

  const filteredTemplates = templates.filter(template =>
    template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = [...new Set(templates.map(t => t.category))];

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    // You could add a toast notification here
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
                {categories.map(category => (
                  <Badge key={category} variant="outline" className="cursor-pointer hover:bg-accent">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => {
                const Icon = template.icon;
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
                          {template.prompt}
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Used {template.usage} times
                          </span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(template.prompt)}
                            className="hover:bg-accent"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredTemplates.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No templates found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
