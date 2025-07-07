import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { AttachmentUpload } from "@/components/AttachmentUpload";
import { cn } from "@/lib/utils";
import { 
  Copy, 
  Save, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  RefreshCw, 
  Plus,
  Sparkles,
  User,
  Bot,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AttachmentFile {
  id: string;
  name: string;
  type: string;
  size: number;
  file: File;
}

export default function Workspace() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [attachments, setAttachments] = useState<AttachmentFile[]>([]);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    role: "user" | "assistant";
    content: string;
  }>>([]);
  const [chatInput, setChatInput] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  
  // Check for prompt parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const promptParam = urlParams.get('prompt');
    if (promptParam) {
      setInitialPrompt(promptParam);
    }
  }, []);
  
  // Configuration states
  const [targetModel, setTargetModel] = useState("");
  const [tone, setTone] = useState("");
  const [persona, setPersona] = useState("");
  const [outputFormat, setOutputFormat] = useState("");

  const { toast } = useToast();

  const handleRefinePrompt = async () => {
    if (!initialPrompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter an initial prompt to refine",
        variant: "destructive",
      });
      return;
    }

    setIsRefining(true);
    
    // Enhanced refinement considering attachments
    setTimeout(() => {
      let attachmentContext = "";
      if (attachments.length > 0) {
        const fileTypes = attachments.map(att => {
          if (att.type.startsWith('image/')) return 'image';
          if (att.type === 'application/pdf') return 'PDF document';
          if (att.type.includes('document') || att.type.includes('word')) return 'Word document';
          if (att.type.includes('excel') || att.type.includes('spreadsheet')) return 'Excel spreadsheet';
          return 'text file';
        });
        attachmentContext = `\n\nAttached files: ${fileTypes.join(', ')} - Please analyze and incorporate insights from these ${attachments.length} file(s) into your response.`;
      }

      // Get user's profession from profile (defaulting to generic if not set)
      const userProfession = "Software Engineer"; // This would come from user's profile
      const selectedPersona = persona || `Act as ${userProfession}`;
      
      const mockRefinedPrompt = `Enhanced version of: "${initialPrompt}"${attachmentContext}\n\nRefined for ${targetModel || 'optimal AI model'} with ${tone || 'balanced'} tone, ${selectedPersona}, formatted as ${outputFormat || 'structured response'}.\n\nThis refined prompt includes:\n- Better context and clarity leveraging your profession as ${userProfession}\n- Specific instructions for improved output quality\n- Consideration of attached files and their content (${attachments.length} files analyzed)\n- Optimized structure for the selected AI model\n- Enhanced prompting techniques for better results\n- Personalized approach based on your professional background`;
      
      setRefinedPrompt(mockRefinedPrompt);
      setIsRefining(false);
      
      toast({
        title: "Prompt Refined",
        description: `Your prompt has been enhanced${attachments.length > 0 ? ` with ${attachments.length} attachment(s) considered` : ''}!`,
      });
    }, 2000);
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(refinedPrompt);
    toast({
      title: "Copied",
      description: "Refined prompt copied to clipboard",
    });
  };

  const handleSavePrompt = () => {
    toast({
      title: "Saved",
      description: "Prompt saved to your history",
    });
  };

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: "user" as const,
      content: chatInput,
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant" as const,
        content: `I understand you want to refine: "${chatInput}". Here are some suggestions to improve your prompt:\n\n1. Add more specific context\n2. Define the desired output format\n3. Include examples if helpful\n\nWould you like me to help you implement any of these improvements?`,
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col scrollbar-thin">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out scrollbar-thin",
            isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
          )}
        >
          <div className="container mx-auto p-6 max-w-6xl">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold font-jakarta mb-2">
                Refine your <span className="bg-gradient-primary bg-clip-text text-transparent">prompt</span>
              </h1>
              <p className="text-muted-foreground">
                Transform your rough ideas into professional, optimized prompts for better AI results
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Left Column - Prompt Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Initial Prompt Input */}
                <Card className="shadow-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Initial Prompt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Enter your prompt here... Be as detailed or as rough as you like - I'll help you refine it!"
                        value={initialPrompt}
                        onChange={(e) => setInitialPrompt(e.target.value)}
                        className="min-h-32 bg-background border-input resize-none"
                      />
                      <div className="flex items-center gap-2">
                        <AttachmentUpload 
                          onAttachmentsChange={setAttachments}
                          className="flex-shrink-0"
                        />
                        <span className="text-xs text-muted-foreground">
                          Attach files (text, images, PDF, Word, Excel)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Model Configuration */}
                <Card className="shadow-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="target-model">Target Model</Label>
                        <Select value={targetModel} onValueChange={setTargetModel}>
                          <SelectTrigger id="target-model" className="bg-background">
                            <SelectValue placeholder="Select model" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border shadow-elevated">
                            <SelectItem value="gpt-4">ChatGPT (GPT-4)</SelectItem>
                            <SelectItem value="claude">Claude</SelectItem>
                            <SelectItem value="gemini">Gemini</SelectItem>
                            <SelectItem value="midjourney">Midjourney</SelectItem>
                            <SelectItem value="dalle">DALL·E</SelectItem>
                            <SelectItem value="add-new">+ Add New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="tone">Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                          <SelectTrigger id="tone" className="bg-background">
                            <SelectValue placeholder="Select tone" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border shadow-elevated">
                            <SelectItem value="formal">Formal</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="add-new">+ Add New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="persona">Persona</Label>
                        <Select value={persona} onValueChange={setPersona}>
                          <SelectTrigger id="persona" className="bg-background">
                            <SelectValue placeholder="Select persona" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border shadow-elevated">
                            <SelectItem value="developer">Act as Developer</SelectItem>
                            <SelectItem value="marketer">Act as Marketer</SelectItem>
                            <SelectItem value="writer">Act as Writer</SelectItem>
                            <SelectItem value="teacher">Act as Teacher</SelectItem>
                            <SelectItem value="add-new">+ Add New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="output-format">Output Format</Label>
                        <Select value={outputFormat} onValueChange={setOutputFormat}>
                          <SelectTrigger id="output-format" className="bg-background">
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border shadow-elevated">
                            <SelectItem value="bullet">Bullet Points</SelectItem>
                            <SelectItem value="paragraph">Paragraph</SelectItem>
                            <SelectItem value="json">JSON</SelectItem>
                            <SelectItem value="table">Table</SelectItem>
                            <SelectItem value="add-new">+ Add New</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Refinement Chat Toggle */}
                    <div className="flex items-center justify-between mt-6 p-4 rounded-lg bg-muted/50">
                      <div>
                        <Label htmlFor="chat-toggle" className="font-medium">
                          Refinement Chat
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Enable conversational refinement for iterative improvements
                        </p>
                      </div>
                      <Switch
                        id="chat-toggle"
                        checked={chatEnabled}
                        onCheckedChange={setChatEnabled}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Refine Button */}
                <div className="flex justify-center">
                  <Button
                    onClick={handleRefinePrompt}
                    variant="ai"
                    size="lg"
                    disabled={isRefining}
                    className="font-semibold px-8"
                  >
                    {isRefining ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Refining...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Refine Prompt
                      </>
                    )}
                  </Button>
                </div>

                {/* Chat Area */}
                {chatEnabled && (
                  <Card className="shadow-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5 text-primary" />
                        Refinement Chat
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-64 overflow-y-auto space-y-3 p-3 bg-muted/30 rounded-lg scrollbar-thin">
                          {chatMessages.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                              <p>Start a conversation to refine your prompt interactively</p>
                            </div>
                          ) : (
                            chatMessages.map((message) => (
                              <div
                                key={message.id}
                                className={cn(
                                  "flex gap-3 max-w-[80%]",
                                  message.role === "user" ? "ml-auto" : "mr-auto"
                                )}
                              >
                                <div
                                  className={cn(
                                    "flex items-start gap-2",
                                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                                  )}
                                >
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    message.role === "user" 
                                      ? "bg-primary text-primary-foreground" 
                                      : "bg-gradient-primary text-white"
                                  )}>
                                    {message.role === "user" ? (
                                      <User className="h-4 w-4" />
                                    ) : (
                                      <Bot className="h-4 w-4" />
                                    )}
                                  </div>
                                  <div className={cn(
                                    "rounded-lg p-3 text-sm",
                                    message.role === "user"
                                      ? "bg-primary text-primary-foreground"
                                      : "bg-card border"
                                  )}>
                                    <p className="whitespace-pre-wrap">{message.content}</p>
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask for specific improvements..."
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendChatMessage()}
                            className="bg-background"
                          />
                          <Button
                            onClick={handleSendChatMessage}
                            size="icon"
                            variant="ai"
                            disabled={!chatInput.trim()}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Refined Prompt Output */}
                {refinedPrompt && (
                  <Card className="shadow-ai border-primary/20 bg-gradient-to-br from-card to-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" />
                        Refined Prompt
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <Textarea
                          value={refinedPrompt}
                          readOnly
                          className="min-h-32 bg-background/80 border-input resize-none"
                        />
                        
                        <div className="flex flex-wrap gap-2">
                          <Button onClick={handleCopyPrompt} variant="outline" size="sm">
                            <Copy className="mr-2 h-4 w-4" />
                            Copy
                          </Button>
                          <Button onClick={handleSavePrompt} variant="outline" size="sm">
                            <Save className="mr-2 h-4 w-4" />
                            Save
                          </Button>
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ThumbsDown className="mr-1 h-4 w-4" />
                          </Button>
                          <Button variant="ai" size="sm">
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Iterate Further
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right Column - Quick Actions & Stats */}
              <div className="space-y-6">
                {/* Quick Stats */}
                <Card className="shadow-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Today's Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Prompts Refined</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Time Saved</span>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">2.5 hours</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Success Rate</span>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">94%</Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-card border-border">
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Plus className="mr-2 h-4 w-4" />
                      Use Template
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Refine Previous
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Copy className="mr-2 h-4 w-4" />
                      Import Prompt
                    </Button>
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="shadow-card border-border bg-gradient-to-br from-card to-primary/5">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Pro Tip
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      For better results, be specific about your desired outcome and include examples when possible. Attach relevant files to provide context - the AI will analyze them to create more targeted prompts.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
