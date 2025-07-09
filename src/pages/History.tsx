
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseService } from "@/lib/database";
import { 
  Search, 
  Filter, 
  Copy, 
  RefreshCw, 
  Star, 
  Trash2, 
  ThumbsUp, 
  ThumbsDown,
  Calendar,
  Tag,
  TrendingUp,
  Clock,
  Target,
  FileText,
  Image,
  FileSpreadsheet,
  File,
  Zap,
  Brain,
  Network,
  GitBranch,
  Database,
  Bot,
  Lightbulb,
  Eye,
  Activity
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptHistoryItem {
  id: number;
  originalPrompt: string;
  refinedPrompt: string;
  model: string;
  tone: string;
  persona: string;
  date: string;
  tags: string[];
  rating: "up" | "down" | null;
  usageCount: number;
  starred: boolean;
  inputTypes: string[];
  technique: string;
  confidenceScore: number;
  processingTime: number;
  attachments?: Array<{
    name: string;
    type: "text" | "image" | "pdf" | "doc" | "excel";
    size: string;
  }>;
}

const promptEngineeringTechniques = [
  { id: "zero-shot", name: "Zero-shot", icon: Target, color: "blue" },
  { id: "few-shot", name: "Few-shot", icon: Eye, color: "green" },
  { id: "cot", name: "Chain-of-Thought", icon: GitBranch, color: "purple" },
  { id: "meta", name: "Meta Prompting", icon: Brain, color: "pink" },
  { id: "self-consistency", name: "Self-Consistency", icon: RefreshCw, color: "orange" },
  { id: "generate-knowledge", name: "Generate Knowledge", icon: Lightbulb, color: "yellow" },
  { id: "prompt-chaining", name: "Prompt Chaining", icon: Network, color: "indigo" },
  { id: "tot", name: "Tree of Thoughts", icon: GitBranch, color: "teal" },
  { id: "rag", name: "RAG", icon: Database, color: "cyan" },
  { id: "react", name: "ReAct", icon: Bot, color: "red" },
  { id: "ape", name: "Auto Prompt Engineer", icon: Zap, color: "violet" },
  { id: "reflexion", name: "Reflexion", icon: Activity, color: "emerald" }
];

export default function History() {
  const { user } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTechnique, setSelectedTechnique] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(false);
  const [prompts, setPrompts] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState({
    totalPrompts: 0,
    savedPrompts: 0,
    favoritedPrompts: 0,
    thisWeekCount: 0,
    avgConfidenceScore: 0
  });
  
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      loadPrompts();
    }
  }, [user]);

  const loadPrompts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await DatabaseService.getUserPrompts(user.id);
      
      if (error) {
        throw new Error(error.message);
      }
      
      setPrompts(data || []);
      setAnalytics({
        totalPrompts: data?.length || 0,
        savedPrompts: data?.filter(p => p.is_saved).length || 0,
        favoritedPrompts: data?.filter(p => p.is_favorited).length || 0,
        thisWeekCount: data?.filter(p => {
          const createdAt = new Date(p.created_at);
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return createdAt > oneWeekAgo;
        }).length || 0,
        avgConfidenceScore: 85 // Mock value for now
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load prompt history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Enhanced mock data with prompt engineering techniques and attachments
  const promptHistory: PromptHistoryItem[] = [
    {
      id: 1,
      originalPrompt: "Write a marketing email for our new AI product",
      refinedPrompt: "You are an experienced email marketing specialist with 10+ years in SaaS marketing. Write a compelling promotional email for an AI-powered prompt engineering tool launch. Context: Target audience includes content creators, developers, and marketing professionals. The product helps users refine prompts for better AI outputs. Include: 1) Attention-grabbing subject line, 2) Clear value proposition highlighting time savings and improved results, 3) Social proof with specific metrics, 4) Strong CTA with urgency. Tone: Professional yet approachable. Format: HTML email template with proper structure and mobile optimization.",
      model: "GPT-4",
      tone: "Professional",
      persona: "Marketing Specialist",
      date: "2024-01-15",
      tags: ["marketing", "email", "saas", "ai"],
      rating: "up",
      usageCount: 12,
      starred: true,
      inputTypes: ["text", "image"],
      technique: "Chain-of-Thought",
      confidenceScore: 94,
      processingTime: 2.3,
      attachments: [
        { name: "brand-guidelines.pdf", type: "pdf", size: "2.4 MB" },
        { name: "logo.png", type: "image", size: "156 KB" }
      ]
    },
    {
      id: 2,
      originalPrompt: "Help me analyze this spreadsheet data",
      refinedPrompt: "Act as a senior data analyst with expertise in Excel and business intelligence. You will analyze the uploaded spreadsheet containing Q4 sales data. First, examine the data structure and identify key metrics. Then provide: 1) Summary statistics for all numerical columns, 2) Trend analysis comparing month-over-month growth, 3) Top performing products/regions, 4) Anomalies or outliers requiring attention, 5) Actionable insights with specific recommendations. Present findings in a structured report format with charts and tables where appropriate. Focus on business impact and strategic implications.",
      model: "Claude",
      tone: "Analytical",
      persona: "Data Analyst",
      date: "2024-01-14",
      tags: ["data", "analysis", "excel", "business"],
      rating: "up",
      usageCount: 8,
      starred: false,
      inputTypes: ["excel", "text"],
      technique: "Program-Aided Language Models",
      confidenceScore: 92,
      processingTime: 3.1,
      attachments: [
        { name: "Q4-sales-data.xlsx", type: "excel", size: "1.8 MB" }
      ]
    },
    {
      id: 3,
      originalPrompt: "Create a story about AI and humans",
      refinedPrompt: "You are a creative writing instructor specializing in science fiction narratives. Generate multiple unique story concepts exploring AI-human relationships, then select the most compelling one using the following criteria: originality, emotional depth, and philosophical implications. For the chosen concept, develop: 1) Three-act story structure with clear beginning, middle, end, 2) Well-defined character archetypes with motivations, 3) Detailed world-building including technological and social context, 4) Central conflict that explores themes of consciousness, empathy, and coexistence, 5) Multiple potential endings with different thematic messages. Present as a comprehensive story bible with character sheets, world details, and plot outline.",
      model: "Gemini",
      tone: "Creative",
      persona: "Creative Writing Instructor",
      date: "2024-01-13",
      tags: ["creative", "story", "sci-fi", "ai"],
      rating: null,
      usageCount: 3,
      starred: false,
      inputTypes: ["text", "image"],
      technique: "Tree of Thoughts",
      confidenceScore: 87,
      processingTime: 4.7,
      attachments: [
        { name: "inspiration-images.pdf", type: "pdf", size: "3.2 MB" }
      ]
    },
    {
      id: 4,
      originalPrompt: "Review this code for security issues",
      refinedPrompt: "You are a senior cybersecurity engineer specializing in application security and code review. Analyze the uploaded code files using a systematic approach: 1) Static analysis for common vulnerabilities (OWASP Top 10), 2) Input validation and sanitization checks, 3) Authentication and authorization flow review, 4) Dependency and library security assessment, 5) Configuration and deployment security. For each identified issue, provide: severity level, potential impact, exploitation scenario, and specific remediation steps with code examples. Generate a comprehensive security report with prioritized action items and best practices recommendations.",
      model: "GPT-4",
      tone: "Technical",
      persona: "Security Engineer",
      date: "2024-01-12",
      tags: ["security", "code", "review", "development"],
      rating: "up",
      usageCount: 15,
      starred: true,
      inputTypes: ["text", "doc"],
      technique: "Generate Knowledge Prompting",
      confidenceScore: 96,
      processingTime: 2.8,
      attachments: [
        { name: "application-code.zip", type: "doc", size: "4.1 MB" },
        { name: "security-checklist.pdf", type: "pdf", size: "892 KB" }
      ]
    }
  ];


  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = searchQuery === "" || 
      prompt.initial_prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prompt.refined_prompt && prompt.refined_prompt.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (prompt.title && prompt.title.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesModel = selectedModel === "" || prompt.target_model === selectedModel;
    const matchesTechnique = selectedTechnique === "" || true; // No technique field in DB yet
    const matchesFeedback = selectedFeedback === "" || 
      (selectedFeedback === "positive" && prompt.is_favorited) ||
      (selectedFeedback === "negative" && false) ||
      (selectedFeedback === "neutral" && !prompt.is_favorited);
    
    const matchesTab = activeTab === "all" || 
      (activeTab === "starred" && prompt.is_favorited) ||
      (activeTab === "multimodal" && false) || // No attachment info in current query
      (activeTab === "high-performance" && prompt.refined_prompt);

    return matchesSearch && matchesModel && matchesTechnique && matchesFeedback && matchesTab;
  });

  const handleCopyPrompt = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied",
      description: "Prompt copied to clipboard",
    });
  };

  const handleStarPrompt = async (id: string) => {
    if (!user) return;
    
    try {
      const prompt = prompts.find(p => p.id === id);
      if (!prompt) return;
      
      await DatabaseService.updatePrompt(id, {
        is_favorited: !prompt.is_favorited
      });
      
      // Update local state
      setPrompts(prompts.map(p => 
        p.id === id ? { ...p, is_favorited: !p.is_favorited } : p
      ));
      
      toast({
        title: prompt.is_favorited ? "Removed from favorites" : "Added to favorites",
        description: prompt.is_favorited ? "Prompt removed from favorites" : "Prompt added to favorites",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    }
  };

  const getTechniqueColor = (technique: string) => {
    const tech = promptEngineeringTechniques.find(t => t.name === technique);
    return tech ? tech.color : "gray";
  };

  const getInputTypeIcon = (type: string) => {
    switch(type) {
      case "text": return FileText;
      case "image": return Image;
      case "pdf": return File;
      case "doc": return File;
      case "excel": return FileSpreadsheet;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300 ease-in-out scrollbar-thin",
          isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
        )}>
          <div className="container mx-auto p-6 max-w-7xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold font-jakarta mb-2">
                Prompt <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">History</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Track, analyze, and reuse your AI-refined prompts with advanced engineering techniques
              </p>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Left Sidebar - Analytics & Filters */}
              <div className="lg:col-span-1 space-y-6">
                {/* Analytics Cards */}
                <div className="grid grid-cols-1 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/20">
                          <Target className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Total Prompts</p>
                          <p className="text-2xl font-bold">{analytics.totalPrompts}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/20">
                          <TrendingUp className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm opacity-90">This Week</p>
                          <p className="text-2xl font-bold">{analytics.thisWeekCount}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-pink-600 text-white border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/20">
                          <Brain className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm opacity-90">Avg Confidence</p>
                          <p className="text-2xl font-bold">{analytics.avgConfidenceScore}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Filters */}
                <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Filter className="h-5 w-5" />
                      Advanced Filters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">AI Model</label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="All models" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All models</SelectItem>
                          <SelectItem value="GPT-4">GPT-4</SelectItem>
                          <SelectItem value="Claude">Claude</SelectItem>
                          <SelectItem value="Gemini">Gemini</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Engineering Technique</label>
                      <Select value={selectedTechnique} onValueChange={setSelectedTechnique}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="All techniques" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All techniques</SelectItem>
                          {promptEngineeringTechniques.map(tech => (
                            <SelectItem key={tech.id} value={tech.name}>
                              {tech.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Feedback</label>
                      <Select value={selectedFeedback} onValueChange={setSelectedFeedback}>
                        <SelectTrigger className="bg-white/50">
                          <SelectValue placeholder="All feedback" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">All feedback</SelectItem>
                          <SelectItem value="positive">Positive</SelectItem>
                          <SelectItem value="negative">Negative</SelectItem>
                          <SelectItem value="neutral">No rating</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedModel("");
                        setSelectedTechnique("");
                        setSelectedFeedback("");
                        setSearchQuery("");
                      }}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-3 space-y-6">
                {/* Search and Tabs */}
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search prompts, techniques, attachments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-white/70 backdrop-blur-sm border border-white/50"
                    />
                  </div>

                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="bg-white/70 backdrop-blur-sm">
                      <TabsTrigger value="all">All ({prompts.length})</TabsTrigger>
                      <TabsTrigger value="starred">Starred</TabsTrigger>
                      <TabsTrigger value="multimodal">Multimodal</TabsTrigger>
                      <TabsTrigger value="high-performance">High Performance</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Prompt List */}
                <div className="space-y-4">
                  {loading ? (
                    <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
                      <CardContent className="p-12 text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Loading prompts...</p>
                      </CardContent>
                    </Card>
                  ) : filteredPrompts.length === 0 ? (
                    <Card className="bg-white/70 backdrop-blur-sm border border-white/50">
                      <CardContent className="p-12 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <Search className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No prompts found</h3>
                        <p className="text-gray-600">
                          {prompts.length === 0 
                            ? "You haven't created any prompts yet. Start by creating your first prompt!" 
                            : "Try adjusting your search or filters to find what you're looking for."
                          }
                        </p>
                      </CardContent>
                    </Card>
                  ) : (
                    filteredPrompts.map((prompt) => (
                      <Card key={prompt.id} className="bg-white/70 backdrop-blur-sm border border-white/50 hover:bg-white/80 transition-all duration-300 hover:shadow-xl">
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            {/* Header with basic info */}
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  {prompt.target_model && (
                                    <Badge variant="outline">
                                      {prompt.target_model}
                                    </Badge>
                                  )}
                                  {prompt.tone && (
                                    <Badge variant="outline">
                                      {prompt.tone}
                                    </Badge>
                                  )}
                                  {prompt.persona && (
                                    <Badge variant="outline">
                                      {prompt.persona}
                                    </Badge>
                                  )}
                                  {prompt.is_saved && (
                                    <Badge variant="secondary">
                                      Saved
                                    </Badge>
                                  )}
                                  <span className="text-sm text-gray-500">
                                    {new Date(prompt.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                {prompt.title && (
                                  <h3 className="font-medium text-lg mb-2">{prompt.title}</h3>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleStarPrompt(prompt.id)}
                                  className={cn(
                                    "h-8 w-8",
                                    prompt.is_favorited && "text-yellow-500"
                                  )}
                                >
                                  <Star className={cn("h-4 w-4", prompt.is_favorited && "fill-current")} />
                                </Button>
                              </div>
                            </div>

                            {/* Original Prompt */}
                            <div>
                              <h4 className="font-medium text-sm text-gray-600 mb-1">Original Prompt:</h4>
                              <p className="text-sm bg-gray-50 p-3 rounded-lg">
                                {prompt.initial_prompt}
                              </p>
                            </div>

                            {/* Refined Prompt */}
                            {prompt.refined_prompt && (
                              <div>
                                <h4 className="font-medium text-sm text-gray-600 mb-1">AI-Refined Prompt:</h4>
                                <p className="text-sm bg-gradient-to-br from-indigo-50 to-purple-50 p-3 rounded-lg border border-indigo-200">
                                  {prompt.refined_prompt.length > 300 
                                    ? `${prompt.refined_prompt.substring(0, 300)}...` 
                                    : prompt.refined_prompt
                                  }
                                </p>
                              </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopyPrompt(prompt.refined_prompt || prompt.initial_prompt)}
                                >
                                  <Copy className="mr-2 h-3 w-3" />
                                  Copy
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    // Navigate to workspace with this prompt
                                    window.location.href = `/workspace?prompt=${encodeURIComponent(prompt.refined_prompt || prompt.initial_prompt)}`;
                                  }}
                                >
                                  <RefreshCw className="mr-2 h-3 w-3" />
                                  Continue Session
                                </Button>
                              </div>

                              <div className="flex items-center gap-4">
                                <span className="text-xs text-gray-500">
                                  {new Date(prompt.updated_at).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
