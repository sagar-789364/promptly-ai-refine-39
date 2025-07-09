import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { DatabaseService } from "@/lib/database";
import { Sparkles, ArrowRight, Users, Target, Zap, FileText, TrendingUp, Clock } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPrompts: 0,
    totalTemplates: 0,
    recentPrompts: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const [promptsResult, templatesResult] = await Promise.all([
          DatabaseService.getUserPrompts(user.id, { limit: 5 }),
          DatabaseService.getPromptTemplates({ public_only: true })
        ]);

        setStats({
          totalPrompts: promptsResult.data?.length || 0,
          totalTemplates: templatesResult.data?.length || 0,
          recentPrompts: promptsResult.data || []
        });
      } catch (error) {
        console.error("Error loading stats:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-background"></div>
          <div className="relative container mx-auto px-4 py-24 text-center">
            <h1 className="text-6xl font-bold mb-6">
              Transform Your
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Prompts</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Professional AI prompt engineering made simple. Refine, optimize, and manage your prompts with advanced techniques.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="px-8">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button variant="outline" size="lg" className="px-8">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose Promptly?</h2>
              <p className="text-xl text-muted-foreground">
                Professional prompt engineering tools for better AI results
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="shadow-card">
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>AI-Powered Refinement</CardTitle>
                  <CardDescription>
                    Transform rough ideas into professional, optimized prompts using advanced techniques
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <FileText className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Template Library</CardTitle>
                  <CardDescription>
                    Access hundreds of tested prompt templates for common use cases
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="shadow-card">
                <CardHeader>
                  <TrendingUp className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Performance Tracking</CardTitle>
                  <CardDescription>
                    Monitor and analyze your prompt effectiveness with detailed analytics
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, <span className="text-primary">{user.email}</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Ready to refine some prompts?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/workspace">
            <Card className="hover:shadow-glow-subtle transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  New Prompt
                </CardTitle>
                <CardDescription>
                  Start refining a new prompt with AI assistance
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/templates">
            <Card className="hover:shadow-glow-subtle transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Templates
                </CardTitle>
                <CardDescription>
                  Browse and use ready-made prompt templates
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
          <Link to="/history">
            <Card className="hover:shadow-glow-subtle transition-all cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  History
                </CardTitle>
                <CardDescription>
                  View and manage your prompt history
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {loading ? "..." : stats.totalPrompts}
                  </div>
                  <div className="text-sm text-muted-foreground">Total Prompts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {loading ? "..." : stats.totalTemplates}
                  </div>
                  <div className="text-sm text-muted-foreground">Templates Available</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center text-muted-foreground">Loading...</div>
              ) : stats.recentPrompts.length > 0 ? (
                <div className="space-y-2">
                  {stats.recentPrompts.slice(0, 3).map((prompt: any) => (
                    <div key={prompt.id} className="flex items-center justify-between">
                      <div className="truncate text-sm">
                        {prompt.title || prompt.initial_prompt.substring(0, 40) + "..."}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {new Date(prompt.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  No prompts yet. <Link to="/workspace" className="text-primary hover:underline">Create your first one!</Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
