import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Settings, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function WorkspaceSettings() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Default workspace parameters
  const [defaultModel, setDefaultModel] = useState("gpt-4");
  const [defaultTone, setDefaultTone] = useState("professional");
  const [defaultPersona, setDefaultPersona] = useState("intelligent-assistant");
  const [defaultOutputFormat, setDefaultOutputFormat] = useState("structured");
  const [autoRefine, setAutoRefine] = useState(true);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [maxTokens, setMaxTokens] = useState("2000");
  const [temperature, setTemperature] = useState("0.7");
  const [attachmentAnalysis, setAttachmentAnalysis] = useState(true);
  const [customInstructions, setCustomInstructions] = useState("");

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your workspace defaults have been updated successfully.",
    });
  };

  const handleReset = () => {
    setDefaultModel("gpt-4");
    setDefaultTone("professional");
    setDefaultPersona("intelligent-assistant");
    setDefaultOutputFormat("structured");
    setAutoRefine(true);
    setChatEnabled(false);
    setMaxTokens("2000");
    setTemperature("0.7");
    setAttachmentAnalysis(true);
    setCustomInstructions("");
    
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header />
      
      <main className="flex-1 overflow-auto scrollbar-thin">
        <div className="container mx-auto p-6 max-w-6xl">
          <div className="flex items-center gap-3 mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold font-jakarta">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Workspace Settings</span>
              </h1>
            </div>
            <p className="text-muted-foreground">
              Configure default parameters for your prompt refinement workspace
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Default Parameters */}
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-jakarta">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Default Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultModel">Default AI Model</Label>
                    <Select value={defaultModel} onValueChange={setDefaultModel}>
                      <SelectTrigger id="defaultModel" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">ChatGPT (GPT-4)</SelectItem>
                        <SelectItem value="claude">Claude</SelectItem>
                        <SelectItem value="gemini">Gemini</SelectItem>
                        <SelectItem value="midjourney">Midjourney</SelectItem>
                        <SelectItem value="dalle">DALL·E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultTone">Default Tone</Label>
                    <Select value={defaultTone} onValueChange={setDefaultTone}>
                      <SelectTrigger id="defaultTone" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="casual">Casual</SelectItem>
                        <SelectItem value="formal">Formal</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="technical">Technical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultPersona">Default Persona</Label>
                    <Select value={defaultPersona} onValueChange={setDefaultPersona}>
                      <SelectTrigger id="defaultPersona" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="intelligent-assistant">Intelligent Assistant</SelectItem>
                        <SelectItem value="developer">Software Developer</SelectItem>
                        <SelectItem value="marketer">Marketing Expert</SelectItem>
                        <SelectItem value="writer">Professional Writer</SelectItem>
                        <SelectItem value="teacher">Educational Expert</SelectItem>
                        <SelectItem value="analyst">Data Analyst</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="defaultOutputFormat">Default Output Format</Label>
                    <Select value={defaultOutputFormat} onValueChange={setDefaultOutputFormat}>
                      <SelectTrigger id="defaultOutputFormat" className="bg-background">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="structured">Structured Response</SelectItem>
                        <SelectItem value="bullet">Bullet Points</SelectItem>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="json">JSON Format</SelectItem>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="markdown">Markdown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxTokens">Max Tokens</Label>
                    <Input
                      id="maxTokens"
                      type="number"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      className="bg-background border-input"
                      min="100"
                      max="4000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (Creativity)</Label>
                    <Input
                      id="temperature"
                      type="number"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="bg-background border-input"
                      min="0"
                      max="2"
                      step="0.1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Behavior Settings */}
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-jakarta">
                  <Settings className="h-5 w-5 text-primary" />
                  Behavior Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoRefine" className="font-medium">
                      Auto-refine prompts
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically enhance prompts when submitted
                    </p>
                  </div>
                  <Switch
                    id="autoRefine"
                    checked={autoRefine}
                    onCheckedChange={setAutoRefine}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="chatEnabled" className="font-medium">
                      Enable refinement chat by default
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Start with chat interface enabled
                    </p>
                  </div>
                  <Switch
                    id="chatEnabled"
                    checked={chatEnabled}
                    onCheckedChange={setChatEnabled}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="attachmentAnalysis" className="font-medium">
                      Automatic attachment analysis
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Analyze uploaded files automatically
                    </p>
                  </div>
                  <Switch
                    id="attachmentAnalysis"
                    checked={attachmentAnalysis}
                    onCheckedChange={setAttachmentAnalysis}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Custom Instructions */}
            <Card className="shadow-card border-border lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-jakarta">
                  <Settings className="h-5 w-5 text-primary" />
                  Custom Instructions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="customInstructions">Default system instructions</Label>
                  <textarea
                    id="customInstructions"
                    value={customInstructions}
                    onChange={(e) => setCustomInstructions(e.target.value)}
                    className="w-full min-h-24 bg-background border border-input rounded-md p-3 text-sm resize-none"
                    placeholder="Enter custom instructions that will be applied to all your prompts by default..."
                  />
                  <p className="text-xs text-muted-foreground">
                    These instructions will be prepended to all your prompts automatically
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-8">
            <Button onClick={handleReset} variant="outline">
              Reset to Defaults
            </Button>
            <Button onClick={handleSave} variant="ai" className="font-semibold px-8">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}