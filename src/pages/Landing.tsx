import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, BarChart3, Play, ArrowRight } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="relative container mx-auto px-4 py-24 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-8 bg-card shadow-card">
            <Sparkles className="mr-2 h-4 w-4 text-primary" />
            AI-Powered Prompt Refinement
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-jakarta mb-6 animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Refine Your Prompts,
            </span>
            <br />
            <span className="text-foreground">Perfect Your Results</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Use AI to transform rough ideas into professional prompts that deliver exceptional results across all AI models
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/auth">
              <Button variant="hero" size="xl" className="font-semibold">
                Start Refining
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="xl" className="font-semibold">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Demo preview */}
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated bg-card border">
              <div className="aspect-video bg-gradient-secondary flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-gradient-primary rounded-2xl flex items-center justify-center">
                    <Sparkles className="h-10 w-10 text-white" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground">
                    Interactive Demo Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold font-jakarta mb-6">
              Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Promptly</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Transform your AI interactions with intelligent prompt refinement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <Card className="group hover:shadow-ai transition-all duration-300 hover:-translate-y-1 bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-jakarta mb-4">Smart Configuration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Intelligent model selection, tone adjustment, and persona configuration tailored to your specific needs
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="group hover:shadow-ai transition-all duration-300 hover:-translate-y-1 bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-jakarta mb-4">Interactive Refinement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Engage in conversational refinement with AI to perfect your prompts through iterative improvement
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="group hover:shadow-ai transition-all duration-300 hover:-translate-y-1 bg-card border-border">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:animate-glow-pulse">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold font-jakarta mb-4">History & Analytics</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track your prompt performance, analyze usage patterns, and build a library of high-quality prompts
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-jakarta mb-6">
            Ready to Perfect Your <span className="bg-gradient-primary bg-clip-text text-transparent">Prompts</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of professionals refining their AI interactions and achieving better results
          </p>
          <Link to="/auth">
            <Button variant="hero" size="xl" className="font-semibold">
              Launch Workspace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-primary shadow-glow">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <span className="font-jakarta font-bold text-2xl bg-gradient-primary bg-clip-text text-transparent">
                  Promptly
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
                Transform your AI interactions with intelligent prompt engineering. Built for professionals who demand excellence in their AI workflows.
              </p>
              <div className="flex space-x-4">
                <a href="https://twitter.com/promptly_ai" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/promptly-ai" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/promptly.ai" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://github.com/promptly-ai" className="text-muted-foreground hover:text-primary transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/workspace" className="text-muted-foreground hover:text-primary transition-colors">Workspace</Link></li>
                <li><Link to="/templates" className="text-muted-foreground hover:text-primary transition-colors">Templates</Link></li>
                <li><Link to="/examples" className="text-muted-foreground hover:text-primary transition-colors">Examples</Link></li>
                <li><Link to="/docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                <li><Link to="/help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</Link></li>
                <li><Link to="/security" className="text-muted-foreground hover:text-primary transition-colors">Security</Link></li>
                <li><Link to="/compliance" className="text-muted-foreground hover:text-primary transition-colors">Compliance</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2024 Promptly AI Technologies Inc. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-sm text-muted-foreground">English (US)</span>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-muted-foreground">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}