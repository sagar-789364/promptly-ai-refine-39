import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Mail, Phone, MapPin, Clock, ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    category: ""
  });

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", subject: "", message: "", category: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
              Get in <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions about Promptly? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold font-jakarta mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Mail className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">hello@promptly.ai</p>
                        <p className="text-muted-foreground">support@promptly.ai</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                        <p className="text-sm text-muted-foreground">Mon-Fri, 9AM-6PM PST</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <MapPin className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Address</h3>
                        <p className="text-muted-foreground">
                          123 AI Innovation Drive<br />
                          San Francisco, CA 94105<br />
                          United States
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Business Hours</h3>
                        <p className="text-muted-foreground">
                          Mon - Fri: 9:00 AM - 6:00 PM PST<br />
                          Sat - Sun: 10:00 AM - 4:00 PM PST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Support */}
                <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-lg">Need Quick Help?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Check out our help center for instant answers to common questions.
                    </p>
                    <Link to="/help">
                      <Button variant="outline" className="w-full">
                        Visit Help Center
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-glow-subtle">
                  <CardHeader>
                    <CardTitle className="text-2xl font-jakarta">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className="bg-background"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="bg-background"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            value={formData.company}
                            onChange={(e) => handleInputChange("company", e.target.value)}
                            className="bg-background"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                            <SelectTrigger className="bg-background">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="support">Technical Support</SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                              <SelectItem value="press">Press & Media</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          className="bg-background"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          className="min-h-32 bg-background resize-none"
                          placeholder="Tell us how we can help you..."
                          required
                        />
                      </div>

                      <Button type="submit" variant="ai" size="lg" className="w-full font-semibold">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>

                      <p className="text-sm text-muted-foreground text-center">
                        We typically respond within 24 hours during business days.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}