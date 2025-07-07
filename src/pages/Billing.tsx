import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Crown, Calendar, Download, ExternalLink, Check, Star, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function Billing() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPlan] = useState("Pro");
  const [usageCount] = useState(125);
  const [maxUsage] = useState(1000);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleUpgrade = (planName: string) => {
    toast({
      title: "Upgrade Plan",
      description: `Upgrading to ${planName} plan...`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    toast({
      title: "Download Started",
      description: `Downloading invoice ${invoiceId}...`,
    });
  };

  const usagePercentage = (usageCount / maxUsage) * 100;

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "100 AI prompts/month",
        "Basic prompt templates",
        "Standard AI models",
        "Email support",
        "Basic analytics"
      ],
      current: false,
      popular: false,
      buttonText: "Current Plan",
      disabled: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Pro",
      price: "$29",
      period: "month",
      features: [
        "1,000 AI prompts/month",
        "Advanced prompt engineering",
        "GPT-4, Claude, Gemini access",
        "Priority support",
        "Advanced analytics",
        "Custom templates",
        "Export capabilities"
      ],
      current: true,
      popular: true,
      buttonText: "Current Plan",
      disabled: true,
      gradient: "from-purple-500 to-indigo-600"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "month",
      features: [
        "Unlimited AI prompts",
        "Custom AI model fine-tuning",
        "All premium AI models",
        "24/7 dedicated support",
        "Advanced team collaboration",
        "Custom integrations",
        "SSO & advanced security",
        "Priority processing",
        "Custom branding"
      ],
      current: false,
      popular: false,
      buttonText: "Upgrade Now",
      disabled: false,
      gradient: "from-yellow-500 to-orange-600"
    }
  ];

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: "$29.00", status: "Paid", plan: "Pro" },
    { id: "INV-002", date: "2024-02-01", amount: "$29.00", status: "Paid", plan: "Pro" },
    { id: "INV-003", date: "2024-03-01", amount: "$29.00", status: "Pending", plan: "Pro" },
  ];

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      <Header onSidebarToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} showSidebarToggle />
      
      <div className="flex flex-1">
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
        
        <main 
          className={cn(
            "flex-1 overflow-auto transition-all duration-300 ease-in-out scrollbar-thin",
            isSidebarCollapsed ? "ml-14" : "ml-[10vw] min-[200px]:ml-[200px]"
          )}
        >
          <div className="container mx-auto p-6 max-w-7xl">
            {/* Back Button */}
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </div>

            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <CreditCard className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-jakarta">
                  <span className="bg-gradient-primary bg-clip-text text-transparent">Billing & Subscription</span>
                </h1>
              </div>
              <p className="text-muted-foreground">
                Manage your subscription plans and billing information
              </p>
            </div>

            <div className="space-y-8">
              {/* Current Usage */}
              <Card className="border-border shadow-card">
                <CardHeader>
                  <CardTitle className="font-jakarta flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Current Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">API Calls This Month</span>
                      <span className="font-semibold text-xl">{usageCount.toLocaleString()}/{maxUsage.toLocaleString()}</span>
                    </div>
                    <Progress value={usagePercentage} className="h-3" />
                    <div className="flex justify-between items-center">
                      <Badge className={`bg-gradient-to-r ${plans.find(p => p.current)?.gradient} text-white`}>
                        <Crown className="w-3 h-3 mr-1" />
                        {currentPlan} Plan
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Resets on {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subscription Plans */}
              <div>
                <h2 className="text-2xl font-bold font-jakarta mb-6">Choose Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <Card 
                      key={plan.name} 
                      className={cn(
                        "border-border shadow-card relative overflow-hidden transition-all duration-300 hover:shadow-glow-subtle",
                        plan.current && "ring-2 ring-primary shadow-glow",
                        plan.popular && "scale-105"
                      )}
                    >
                      {plan.popular && (
                        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-secondary text-white text-center py-2 text-sm font-semibold">
                          <Star className="inline h-4 w-4 mr-1" />
                          Most Popular
                        </div>
                      )}
                      <CardHeader className={plan.popular ? "pt-12" : ""}>
                        <div className="flex justify-between items-start">
                          <CardTitle className="font-jakarta text-xl">{plan.name}</CardTitle>
                          {plan.current && <Badge variant="default">Current</Badge>}
                        </div>
                        <div className="text-4xl font-bold font-jakarta">
                          {plan.price}
                          <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <ul className="space-y-3">
                          {plan.features.map((feature, index) => (
                            <li key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className="w-full" 
                          variant={plan.current ? "secondary" : "default"}
                          onClick={() => handleUpgrade(plan.name)}
                          disabled={plan.disabled}
                        >
                          {plan.buttonText}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Billing History */}
              <Card className="border-border shadow-card">
                <CardHeader>
                  <CardTitle className="font-jakarta flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Billing History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {invoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-4 rounded-lg bg-accent/20 border border-border/50 hover:bg-accent/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold">{invoice.id}</p>
                            <p className="text-sm text-muted-foreground">{new Date(invoice.date).toLocaleDateString()} • {invoice.plan} Plan</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>
                            {invoice.status}
                          </Badge>
                          <span className="font-bold text-lg">{invoice.amount}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                            className="hover:bg-accent/50"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Manage Billing Portal
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}