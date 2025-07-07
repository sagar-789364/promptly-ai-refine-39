
import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { CreditCard, Crown, Calendar, Download, ExternalLink, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BillingSettings() {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [currentPlan] = useState("Pro");
  const [usageCount] = useState(125);
  const [maxUsage] = useState(1000);
  const { toast } = useToast();

  const handleUpgrade = () => {
    toast({
      title: "Upgrade Plan",
      description: "Redirecting to billing portal...",
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
      features: ["100 API calls/month", "Basic support", "Standard models"],
      current: false
    },
    {
      name: "Pro",
      price: "$29",
      features: ["1000 API calls/month", "Priority support", "Advanced models", "Custom templates"],
      current: true
    },
    {
      name: "Enterprise",
      price: "$99",
      features: ["Unlimited API calls", "24/7 support", "All models", "Custom integrations", "Team collaboration"],
      current: false
    }
  ];

  const invoices = [
    { id: "INV-001", date: "2024-01-01", amount: "$29.00", status: "Paid" },
    { id: "INV-002", date: "2024-02-01", amount: "$29.00", status: "Paid" },
    { id: "INV-003", date: "2024-03-01", amount: "$29.00", status: "Pending" },
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
          <div className="container mx-auto p-6 max-w-6xl">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" size="sm" onClick={() => navigate('/settings')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Settings
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
                Manage your subscription and billing information
              </p>
            </div>

            <div className="space-y-6">
            {/* Current Usage */}
            <Card className="border-border shadow-card">
              <CardHeader>
                <CardTitle className="font-jakarta">Current Usage</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>API Calls This Month</span>
                    <span className="font-semibold">{usageCount.toLocaleString()}/{maxUsage.toLocaleString()}</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                  <div className="flex justify-between items-center">
                    <Badge className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
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

            {/* Plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className={`border-border shadow-card ${plan.current ? 'ring-2 ring-primary' : ''}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="font-jakarta">{plan.name}</CardTitle>
                      {plan.current && <Badge variant="default">Current</Badge>}
                    </div>
                    <div className="text-3xl font-bold font-jakarta">
                      {plan.price}<span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground">• {feature}</li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={plan.current ? "secondary" : "default"}
                      onClick={handleUpgrade}
                      disabled={plan.current}
                    >
                      {plan.current ? "Current Plan" : plan.name === "Free" ? "Downgrade" : "Upgrade"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Billing History */}
            <Card className="border-border shadow-card">
              <CardHeader>
                <CardTitle className="font-jakarta">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{invoice.id}</p>
                          <p className="text-sm text-muted-foreground">{invoice.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={invoice.status === "Paid" ? "default" : "secondary"}>
                          {invoice.status}
                        </Badge>
                        <span className="font-semibold">{invoice.amount}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadInvoice(invoice.id)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
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
