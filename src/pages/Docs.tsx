
import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Lightbulb, Target, Zap, AlertCircle, CheckCircle } from "lucide-react";

export default function Docs() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: BookOpen,
      content: [
        {
          title: "What is Prompt Engineering?",
          description: "Learn the fundamentals of crafting effective AI prompts",
          content: "Prompt engineering is the art and science of designing inputs that guide AI models to produce desired outputs. It involves understanding how language models interpret instructions and crafting prompts that are clear, specific, and effective."
        },
        {
          title: "Basic Prompt Structure",
          description: "Understanding the anatomy of a good prompt",
          content: "A well-structured prompt typically includes: Context (background information), Task (what you want the AI to do), Format (how you want the output structured), and Examples (demonstrations of desired output)."
        }
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      icon: Target,
      content: [
        {
          title: "Be Specific and Clear",
          description: "Clarity leads to better results",
          content: "Instead of 'Write about marketing', use 'Write a 500-word blog post about email marketing strategies for small e-commerce businesses, focusing on customer retention and personalization techniques.'"
        },
        {
          title: "Use Examples",
          description: "Show, don't just tell",
          content: "Provide examples of the desired output format. This helps the AI understand exactly what you're looking for and maintains consistency across responses."
        },
        {
          title: "Set Constraints",
          description: "Guide the AI with boundaries",
          content: "Specify length limits, tone requirements, target audience, and any restrictions. For example: 'Write in a professional tone for C-level executives, maximum 200 words, avoid technical jargon.'"
        }
      ]
    },
    {
      id: "techniques",
      title: "Advanced Techniques",
      icon: Zap,
      content: [
        {
          title: "Chain of Thought",
          description: "Breaking down complex reasoning",
          content: "Encourage the AI to show its reasoning process by asking it to 'think step by step' or 'explain your reasoning'. This often leads to more accurate and well-reasoned responses."
        },
        {
          title: "Role Playing",
          description: "Give the AI a specific persona",
          content: "Start prompts with 'You are a [specific role]' to give the AI context about how to respond. For example: 'You are a senior software architect with 15 years of experience...'"
        },
        {
          title: "Few-Shot Learning",
          description: "Learning from examples",
          content: "Provide multiple examples of input-output pairs to teach the AI the pattern you want. This is especially effective for formatting and style consistency."
        }
      ]
    }
  ];

  const tips = [
    {
      type: "success",
      icon: CheckCircle,
      title: "Do: Use specific instructions",
      description: "Be explicit about what you want rather than assuming the AI will infer your needs."
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Do: Iterate and refine",
      description: "Don't expect perfect results on the first try. Refine your prompts based on the outputs you receive."
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Don't: Use vague language",
      description: "Avoid ambiguous terms that could be interpreted multiple ways."
    },
    {
      type: "warning",
      icon: AlertCircle,
      title: "Don't: Overload with information",
      description: "While context is important, too much irrelevant information can confuse the AI."
    }
  ];

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
          <div className="container mx-auto p-6 max-w-4xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Documentation
              </h1>
              <p className="text-xl text-muted-foreground">
                Complete guide to effective prompt engineering
              </p>
            </div>

            {/* Documentation Sections */}
            <div className="space-y-8">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <div key={section.id} className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>

                    <div className="grid gap-4">
                      {section.content.map((item, index) => (
                        <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300">
                          <CardHeader>
                            <CardTitle className="text-lg">{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {item.content}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Separator className="my-8" />
                  </div>
                );
              })}

              {/* Tips and Best Practices */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Quick Tips</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {tips.map((tip, index) => {
                    const Icon = tip.icon;
                    return (
                      <Card 
                        key={index} 
                        className={cn(
                          "border-l-4 transition-all duration-300",
                          tip.type === "success" 
                            ? "border-l-green-500 bg-green-50/10" 
                            : "border-l-yellow-500 bg-yellow-50/10"
                        )}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center gap-2">
                            <Icon className={cn(
                              "h-4 w-4",
                              tip.type === "success" ? "text-green-500" : "text-yellow-500"
                            )} />
                            <CardTitle className="text-base">{tip.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-muted-foreground">
                            {tip.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Example Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Example: Before & After</h2>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <Card className="border-l-4 border-l-red-500 bg-red-50/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-red-600">❌ Poor Prompt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        "Write something about social media marketing"
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-green-500 bg-green-50/10">
                    <CardHeader>
                      <CardTitle className="text-lg text-green-600">✅ Good Prompt</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-muted/50 p-3 rounded-md text-sm">
                        "Write a 300-word Instagram marketing strategy for a fitness app targeting millennials. Include 3 content pillars, posting frequency, and hashtag recommendations. Use an energetic, motivational tone."
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
