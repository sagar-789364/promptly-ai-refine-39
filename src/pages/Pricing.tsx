import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sparkles, Check, X, ArrowLeft, Crown, Zap, Building } from "lucide-react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: Sparkles,
      description: "Perfect for individuals getting started with AI prompt engineering",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "50 prompt refinements per month",
        "Basic AI models (GPT-3.5)",
        "Standard templates library",
        "Email support",
        "Basic analytics",
        "Community access"
      ],
      notIncluded: [
        "Advanced AI models",
        "Priority support", 
        "Custom templates",
        "Team collaboration",
        "API access"
      ],
      popular: false,
      cta: "Get Started Free"
    },
    {
      name: "Pro",
      icon: Crown,
      description: "Ideal for professionals and power users who need advanced features",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "500 prompt refinements per month",
        "All AI models (GPT-4, Claude, Gemini)",
        "Premium templates library",
        "Priority email & chat support",
        "Advanced analytics & insights",
        "Custom templates creation",
        "Attachment analysis (images, PDFs)",
        "Export/import prompts",
        "Version history"
      ],
      notIncluded: [
        "Team collaboration",
        "SSO integration",
        "Custom integrations",
        "Dedicated support"
      ],
      popular: true,
      cta: "Start Pro Trial"
    },
    {
      name: "Enterprise",
      icon: Building,
      description: "For teams and organizations requiring scalability and security",
      monthlyPrice: 99,
      annualPrice: 990,
      features: [
        "Unlimited prompt refinements",
        "All AI models + enterprise features",
        "Complete templates library",
        "24/7 dedicated support",
        "Advanced team analytics",
        "Team collaboration tools",
        "SSO & SAML integration",
        "API access & webhooks",
        "Custom integrations",
        "Data export & compliance",
        "Advanced security features",
        "Custom training & onboarding"
      ],
      notIncluded: [],
      popular: false,
      cta: "Contact Sales"
    }
  ];

  const faqs = [
    {
      question: "What counts as a prompt refinement?",
      answer: "Each time you use our AI to enhance or optimize a prompt counts as one refinement. This includes initial refinements, iterative improvements, and template customizations."
    },
    {
      question: "Can I change my plan anytime?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and billing is prorated accordingly."
    },
    {
      question: "Do you offer refunds?",
      answer: "We offer a 30-day money-back guarantee for all paid plans. If you're not satisfied, contact us for a full refund."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! Pro and Enterprise plans come with a 14-day free trial. No credit card required to start."
    },
    {
      question: "What AI models do you support?",
      answer: "We support all major AI models including GPT-4, Claude, Gemini, and more. The Starter plan includes GPT-3.5, while Pro and Enterprise include all models."
    }
  ];

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
              Simple, Transparent <span className="bg-gradient-primary bg-clip-text text-transparent">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect plan for your AI prompt engineering needs. All plans include our core features.
            </p>
            
            {/* Annual/Monthly Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
              />
              <span className={`font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
                Annual
              </span>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Save 17%
              </Badge>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => {
                const Icon = plan.icon;
                const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
                const originalMonthlyPrice = isAnnual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;
                
                return (
                  <Card 
                    key={index} 
                    className={`relative hover:shadow-glow-subtle transition-all duration-300 ${
                      plan.popular ? 'border-primary/50 shadow-glow' : ''
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-gradient-primary text-white font-semibold px-4 py-1">
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    
                    <CardHeader className="text-center pb-8">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-jakarta">{plan.name}</CardTitle>
                      <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
                      
                      <div className="mt-6">
                        <div className="flex items-end justify-center gap-1">
                          <span className="text-4xl font-bold">
                            ${price === 0 ? '0' : isAnnual ? Math.round(price / 12) : price}
                          </span>
                          <span className="text-muted-foreground mb-1">
                            /{isAnnual ? 'mo' : 'month'}
                          </span>
                        </div>
                        {isAnnual && price > 0 && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Billed annually (${price}/year)
                          </p>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      <div className="space-y-3">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3">
                            <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        {plan.notIncluded.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-3 opacity-50">
                            <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link to="/auth" className="block">
                        <Button 
                          variant={plan.popular ? "ai" : "outline"} 
                          size="lg" 
                          className="w-full font-semibold"
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">
              Frequently Asked Questions
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-jakarta mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are creating better AI prompts with Promptly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button variant="hero" size="xl" className="font-semibold">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="xl" className="font-semibold">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}