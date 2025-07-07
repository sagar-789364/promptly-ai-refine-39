import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowLeft, Search, HelpCircle, BookOpen, MessageSquare, Settings, Zap, Users, Shield } from "lucide-react";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      description: "Learn the basics of using Promptly",
      articles: [
        { title: "Creating Your First Prompt", views: "2.3k", difficulty: "Beginner" },
        { title: "Understanding AI Models", views: "1.8k", difficulty: "Beginner" },
        { title: "Setting Up Your Profile", views: "1.2k", difficulty: "Beginner" },
        { title: "Navigating the Workspace", views: "980", difficulty: "Beginner" }
      ]
    },
    {
      id: "prompt-engineering",
      title: "Prompt Engineering",
      icon: Zap,
      description: "Master the art of prompt creation",
      articles: [
        { title: "Advanced Prompt Techniques", views: "3.1k", difficulty: "Advanced" },
        { title: "Using Templates Effectively", views: "2.7k", difficulty: "Intermediate" },
        { title: "Optimizing for Different AI Models", views: "2.2k", difficulty: "Intermediate" },
        { title: "Working with Attachments", views: "1.9k", difficulty: "Intermediate" }
      ]
    },
    {
      id: "account-billing",
      title: "Account & Billing",
      icon: Settings,
      description: "Manage your account and subscription",
      articles: [
        { title: "Upgrading Your Plan", views: "1.5k", difficulty: "Beginner" },
        { title: "Managing Payment Methods", views: "1.3k", difficulty: "Beginner" },
        { title: "Understanding Usage Limits", views: "1.1k", difficulty: "Beginner" },
        { title: "Canceling Your Subscription", views: "890", difficulty: "Beginner" }
      ]
    },
    {
      id: "collaboration",
      title: "Team Collaboration",
      icon: Users,
      description: "Work with your team effectively",
      articles: [
        { title: "Sharing Prompts with Team Members", views: "1.7k", difficulty: "Intermediate" },
        { title: "Setting Up Team Workspaces", views: "1.4k", difficulty: "Intermediate" },
        { title: "Managing Team Permissions", views: "1.2k", difficulty: "Advanced" },
        { title: "Team Analytics and Reporting", views: "950", difficulty: "Advanced" }
      ]
    },
    {
      id: "security-privacy",
      title: "Security & Privacy",
      icon: Shield,
      description: "Keep your data safe and secure",
      articles: [
        { title: "Data Privacy and Protection", views: "2.1k", difficulty: "Beginner" },
        { title: "Two-Factor Authentication", views: "1.6k", difficulty: "Beginner" },
        { title: "Enterprise Security Features", views: "1.3k", difficulty: "Advanced" },
        { title: "GDPR Compliance", views: "870", difficulty: "Intermediate" }
      ]
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      icon: MessageSquare,
      description: "Common issues and solutions",
      articles: [
        { title: "Login and Access Issues", views: "2.8k", difficulty: "Beginner" },
        { title: "Prompt Generation Errors", views: "2.3k", difficulty: "Intermediate" },
        { title: "Performance and Speed Issues", views: "1.9k", difficulty: "Intermediate" },
        { title: "Browser Compatibility", views: "1.4k", difficulty: "Beginner" }
      ]
    }
  ];

  const popularArticles = [
    { title: "How to Write Effective AI Prompts", category: "Prompt Engineering", views: "5.2k" },
    { title: "Getting Started with Promptly", category: "Getting Started", views: "4.8k" },
    { title: "Understanding Different AI Models", category: "Getting Started", views: "3.9k" },
    { title: "Troubleshooting Common Issues", category: "Troubleshooting", views: "3.6k" },
    { title: "Team Collaboration Best Practices", category: "Collaboration", views: "3.2k" }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Advanced": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 font-jakarta font-bold text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-gradient-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="bg-gradient-primary bg-clip-text text-transparent">Promptly</span>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-hero/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-jakarta mb-4">
              Help <span className="bg-gradient-primary bg-clip-text text-transparent">Center</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Find answers to your questions and learn how to get the most out of Promptly.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="categories" className="max-w-6xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="categories">Browse by Category</TabsTrigger>
                <TabsTrigger value="popular">Popular Articles</TabsTrigger>
              </TabsList>

              <TabsContent value="categories">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Card key={category.id} className="hover:shadow-glow-subtle transition-all duration-300">
                        <CardHeader>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                          </div>
                          <p className="text-muted-foreground text-sm">{category.description}</p>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {category.articles.map((article, index) => (
                              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm">{article.title}</h4>
                                  <p className="text-xs text-muted-foreground">{article.views} views</p>
                                </div>
                                <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                                  {article.difficulty}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="popular">
                <div className="max-w-4xl mx-auto">
                  <div className="space-y-4">
                    {popularArticles.map((article, index) => (
                      <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300 cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-1">{article.title}</h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>{article.category}</span>
                                <span>•</span>
                                <span>{article.views} views</span>
                              </div>
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <HelpCircle className="h-5 w-5" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold font-jakarta mb-4">
                Still Need Help?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="ai" size="lg" className="font-semibold">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Support
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="font-semibold">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}