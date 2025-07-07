import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowLeft, Search, Calendar, User, ArrowRight, TrendingUp } from "lucide-react";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = {
    title: "The Future of AI Prompt Engineering: Trends and Predictions for 2024",
    excerpt: "As AI models become more sophisticated, the art of prompt engineering evolves. Discover the latest trends and what experts predict for the future of human-AI interaction.",
    author: "Dr. Sarah Chen",
    date: "January 15, 2024",
    readTime: "8 min read",
    image: "/blog/featured-post.jpg",
    category: "Industry Insights",
    slug: "future-ai-prompt-engineering-2024"
  };

  const blogPosts = [
    {
      title: "10 Advanced Prompt Engineering Techniques Every Developer Should Know",
      excerpt: "Master these sophisticated prompting strategies to unlock the full potential of AI models in your projects.",
      author: "Marcus Johnson",
      date: "January 12, 2024",
      readTime: "6 min read",
      category: "Tutorial",
      tags: ["AI", "Development", "Best Practices"],
      slug: "advanced-prompt-engineering-techniques"
    },
    {
      title: "How to Build Better Chatbots with Prompt Engineering",
      excerpt: "Learn how proper prompt design can dramatically improve your chatbot's conversational abilities and user experience.",
      author: "Elena Rodriguez",
      date: "January 10, 2024",
      readTime: "5 min read",
      category: "Tutorial",
      tags: ["Chatbots", "UX", "AI"],
      slug: "better-chatbots-prompt-engineering"
    },
    {
      title: "The Psychology Behind Effective AI Prompts",
      excerpt: "Understanding human language patterns and cognitive biases can help you craft more effective AI prompts.",
      author: "Dr. Michael Park",
      date: "January 8, 2024",
      readTime: "7 min read",
      category: "Research",
      tags: ["Psychology", "Research", "AI"],
      slug: "psychology-effective-ai-prompts"
    },
    {
      title: "Case Study: How Promptly Helped Acme Corp Increase Productivity by 300%",
      excerpt: "Real-world success story showing how strategic prompt engineering transformed a company's AI workflow.",
      author: "David Wilson",
      date: "January 5, 2024",
      readTime: "4 min read",
      category: "Case Study",
      tags: ["Case Study", "Productivity", "Success Story"],
      slug: "acme-corp-productivity-case-study"
    },
    {
      title: "Ethical Considerations in AI Prompt Design",
      excerpt: "Exploring the responsible development of AI prompts and avoiding bias in automated systems.",
      author: "Dr. Sarah Chen",
      date: "January 3, 2024",
      readTime: "9 min read",
      category: "Ethics",
      tags: ["Ethics", "AI Safety", "Responsibility"],
      slug: "ethical-ai-prompt-design"
    },
    {
      title: "Comparing GPT-4, Claude, and Gemini: A Prompt Engineer's Guide",
      excerpt: "Detailed comparison of major AI models and how to optimize prompts for each platform's strengths.",
      author: "Alex Thompson",
      date: "December 28, 2023",
      readTime: "12 min read",
      category: "Comparison",
      tags: ["GPT-4", "Claude", "Gemini", "Comparison"],
      slug: "ai-models-comparison-guide"
    }
  ];

  const categories = ["All", "Tutorial", "Industry Insights", "Research", "Case Study", "Ethics", "Comparison"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
              Promptly <span className="bg-gradient-primary bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Insights, tutorials, and best practices for AI prompt engineering from our team of experts.
            </p>
            
            {/* Search and Filter */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-input"
              />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
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
        </section>

        {/* Featured Post */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto hover:shadow-glow-subtle transition-all duration-300 mb-16">
              <div className="grid lg:grid-cols-2 gap-8">
                <div className="lg:order-2">
                  <div className="aspect-video bg-gradient-secondary rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p className="text-muted-foreground">Featured Article Image</p>
                    </div>
                  </div>
                </div>
                <div className="lg:order-1 p-8">
                  <Badge className="mb-4">{featuredPost.category}</Badge>
                  <h2 className="text-3xl font-bold font-jakarta mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {featuredPost.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {featuredPost.date}
                    </div>
                    <span>{featuredPost.readTime}</span>
                  </div>
                  <Button variant="ai" size="lg">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Latest Articles</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {filteredPosts.map((post, index) => (
                <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300 cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.date}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <Card className="max-w-2xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold font-jakarta mb-4">
                  Stay Updated with Promptly
                </h3>
                <p className="text-muted-foreground mb-6">
                  Get the latest insights on AI, prompt engineering, and best practices delivered to your inbox weekly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <Input 
                    placeholder="Enter your email" 
                    className="bg-background"
                  />
                  <Button variant="ai" className="font-semibold">
                    Subscribe
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  No spam. Unsubscribe anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}