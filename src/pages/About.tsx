import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Users, Target, Award, ArrowLeft } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/team/sarah.jpg",
      bio: "Former AI researcher at Google, passionate about democratizing AI capabilities."
    },
    {
      name: "Marcus Johnson",
      role: "CTO & Co-Founder",
      image: "/team/marcus.jpg", 
      bio: "Ex-OpenAI engineer with expertise in language models and prompt optimization."
    },
    {
      name: "Dr. Elena Rodriguez",
      role: "Head of AI Research",
      image: "/team/elena.jpg",
      bio: "PhD in Computational Linguistics, leading our prompt engineering innovations."
    },
    {
      name: "David Park",
      role: "Head of Product",
      image: "/team/david.jpg",
      bio: "Previously at Microsoft, focused on creating intuitive AI-powered tools."
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Precision",
      description: "We believe in crafting solutions that deliver exact results every time."
    },
    {
      icon: Users,
      title: "Accessibility",
      description: "Making advanced AI capabilities available to everyone, regardless of technical expertise."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in AI research and product development."
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
        <section className="py-24 bg-gradient-hero/10">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold font-jakarta mb-6">
              About <span className="bg-gradient-primary bg-clip-text text-transparent">Promptly</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize how people interact with AI by making 
              prompt engineering accessible, powerful, and intuitive for everyone.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-jakarta mb-8 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Founded in 2024 by a team of AI researchers and engineers from leading tech companies, 
                Promptly was born from a simple observation: while AI models have become incredibly 
                powerful, most people struggle to unlock their full potential due to poor prompting techniques.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that everyone should be able to harness the power of AI effectively, 
                regardless of their technical background. That's why we've built Promptly - an 
                intelligent platform that transforms rough ideas into professionally crafted prompts, 
                helping you achieve better results from any AI model.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-glow-subtle transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-jakarta mb-4">{value.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Meet Our Team</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-glow-subtle transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-24 h-24 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-jakarta mb-1">{member.name}</h3>
                    <p className="text-primary text-sm font-medium mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-hero/10">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-jakarta mb-6">
              Ready to Transform Your AI Experience?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are already creating better prompts with Promptly.
            </p>
            <Link to="/auth">
              <Button variant="hero" size="xl" className="font-semibold">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}