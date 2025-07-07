
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";
import { Search, Copy, Play, ThumbsUp, Code, MessageSquare, PenTool, Briefcase, Palette, BookOpen } from "lucide-react";

export default function Examples() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const examples = [
    {
      id: 1,
      title: "Code Documentation Generator",
      category: "Development",
      icon: Code,
      difficulty: "Intermediate",
      prompt: `You are a senior technical writer. Generate comprehensive documentation for the following code:

[PASTE YOUR CODE HERE]

Please include:
1. Overview and purpose
2. Parameters and return values
3. Usage examples
4. Error handling
5. Performance considerations

Format the output in Markdown with clear headings and code blocks.`,
      expectedOutput: "Well-structured technical documentation with examples and explanations",
      tags: ["documentation", "code", "technical writing"],
      votes: 89
    },
    {
      id: 2,
      title: "Customer Persona Generator",
      category: "Marketing",
      icon: MessageSquare,
      difficulty: "Beginner",
      prompt: `Create a detailed customer persona for [PRODUCT/SERVICE]. 

Include:
- Demographics (age, income, location, occupation)
- Psychographics (values, interests, lifestyle)
- Pain points and challenges
- Goals and motivations
- Preferred communication channels
- Buying behavior patterns

Product/Service: [DESCRIBE YOUR PRODUCT/SERVICE]
Target Market: [DESCRIBE YOUR TARGET MARKET]

Format as a narrative profile with a fictional name and photo description.`,
      expectedOutput: "Detailed customer persona with demographic and psychographic information",
      tags: ["marketing", "persona", "customer research"],
      votes: 76
    },
    {
      id: 3,
      title: "Creative Story Prompt",
      category: "Creative",
      icon: PenTool,
      difficulty: "Beginner",
      prompt: `Write a compelling short story (500-800 words) with these elements:

Setting: [SPECIFY TIME AND PLACE]
Main Character: [CHARACTER DESCRIPTION]
Conflict: [CENTRAL PROBLEM OR CHALLENGE]
Theme: [UNDERLYING MESSAGE OR LESSON]

Requirements:
- Engaging opening hook
- Clear character development
- Rising action and climax
- Satisfying resolution
- Vivid descriptive language
- Dialogue that reveals character

Tone: [SPECIFY: dramatic, humorous, mysterious, etc.]`,
      expectedOutput: "A well-structured short story with engaging characters and plot",
      tags: ["creative writing", "storytelling", "fiction"],
      votes: 64
    },
    {
      id: 4,
      title: "Business Process Optimizer",
      category: "Business",
      icon: Briefcase,
      difficulty: "Advanced",
      prompt: `Analyze and optimize the following business process:

Current Process: [DESCRIBE CURRENT WORKFLOW]
Pain Points: [LIST SPECIFIC ISSUES]
Goals: [WHAT YOU WANT TO ACHIEVE]
Constraints: [BUDGET, TIME, RESOURCES]

Provide:
1. Process flow analysis
2. Bottleneck identification
3. Optimization recommendations
4. Implementation roadmap
5. Success metrics
6. Risk assessment

Use lean methodology principles and include visual process maps where helpful.`,
      expectedOutput: "Comprehensive process analysis with actionable optimization recommendations",
      tags: ["business", "optimization", "process improvement"],
      votes: 52
    },
    {
      id: 5,
      title: "UI/UX Design Brief",
      category: "Design",
      icon: Palette,
      difficulty: "Intermediate",
      prompt: `Create a comprehensive design brief for a [TYPE OF APPLICATION/WEBSITE]:

Project Overview:
- Purpose: [WHAT PROBLEM DOES IT SOLVE]
- Target Users: [USER DEMOGRAPHICS AND NEEDS]
- Key Features: [LIST MAIN FUNCTIONALITIES]

Design Requirements:
1. User experience goals
2. Visual style preferences
3. Brand guidelines and constraints
4. Technical considerations
5. Accessibility requirements

Deliverables needed:
- Wireframes
- User flow diagrams
- Design system components
- Prototypes

Timeline: [PROJECT DURATION]
Budget: [AVAILABLE RESOURCES]`,
      expectedOutput: "Detailed design brief with clear requirements and deliverables",
      tags: ["design", "ui/ux", "brief", "planning"],
      votes: 41
    },
    {
      id: 6,
      title: "Learning Path Creator",
      category: "Education",
      icon: BookOpen,
      difficulty: "Intermediate",
      prompt: `Design a comprehensive learning path for mastering [SKILL/TOPIC]:

Learner Profile:
- Current skill level: [BEGINNER/INTERMEDIATE/ADVANCED]
- Available time: [HOURS PER WEEK]
- Learning style: [VISUAL/AUDITORY/KINESTHETIC/READING]
- Goals: [WHAT THEY WANT TO ACHIEVE]

Create a structured curriculum with:
1. Learning objectives for each module
2. Recommended resources (books, courses, tools)
3. Practical exercises and projects
4. Assessment methods
5. Timeline and milestones
6. Prerequisites for each stage

Format as a step-by-step roadmap with clear progression markers.`,
      expectedOutput: "Structured learning curriculum with resources and timeline",
      tags: ["education", "curriculum", "skill development"],
      votes: 38
    }
  ];

  const categories = ["All", ...new Set(examples.map(e => e.category))];

  const filteredExamples = examples.filter(example => {
    const matchesSearch = example.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         example.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || example.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = (prompt: string) => {
    navigator.clipboard.writeText(prompt);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-red-500";
      default: return "bg-gray-500";
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
                Prompt Examples
              </h1>
              <p className="text-xl text-muted-foreground">
                Real-world examples of effective AI prompts
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-6 space-y-4">
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search examples..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
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

            {/* Examples Grid */}
            <div className="space-y-6">
              {filteredExamples.map((example) => {
                const Icon = example.icon;
                return (
                  <Card key={example.id} className="group hover:shadow-glow-subtle transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-6 w-6 text-primary" />
                          <div>
                            <CardTitle className="text-xl mb-1">{example.title}</CardTitle>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{example.category}</Badge>
                              <Badge 
                                variant="secondary" 
                                className={cn("text-white", getDifficultyColor(example.difficulty))}
                              >
                                {example.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-sm">{example.votes}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="bg-muted/50 p-4 rounded-md">
                          <h4 className="font-semibold mb-2">Prompt:</h4>
                          <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                            {example.prompt}
                          </pre>
                        </div>

                        <div className="bg-green-50/10 border border-green-200/20 p-3 rounded-md">
                          <h4 className="font-semibold mb-1 text-green-600">Expected Output:</h4>
                          <p className="text-sm text-muted-foreground">{example.expectedOutput}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {example.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="hover:bg-accent"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              Try It
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(example.prompt)}
                              className="hover:bg-accent"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredExamples.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No examples found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or category filter</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
