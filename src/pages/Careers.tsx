import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowLeft, MapPin, Clock, Users, Briefcase, Heart, Zap, Globe, Coffee } from "lucide-react";

export default function Careers() {
  const openings = [
    {
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "5+ years",
      description: "Join our core AI team to develop and improve our prompt optimization algorithms and integrate new language models.",
      requirements: ["Strong background in ML/AI", "Python, PyTorch/TensorFlow", "Experience with LLMs", "PhD preferred but not required"],
      posted: "2 days ago"
    },
    {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time", 
      experience: "3+ years",
      description: "Help us build beautiful, intuitive user interfaces that make AI accessible to everyone.",
      requirements: ["React/TypeScript expertise", "Modern CSS/Tailwind", "UI/UX design sense", "Performance optimization"],
      posted: "1 week ago"
    },
    {
      title: "Product Manager",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "4+ years",
      description: "Drive product strategy and roadmap for our AI-powered prompt engineering platform.",
      requirements: ["Product management experience", "AI/ML product background", "Data-driven mindset", "Strong communication skills"],
      posted: "3 days ago"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time",
      experience: "2+ years",
      description: "Help our customers achieve success with Promptly and drive product adoption and retention.",
      requirements: ["Customer success experience", "Technical aptitude", "Excellent communication", "SaaS background preferred"],
      posted: "5 days ago"
    },
    {
      title: "Content Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      description: "Create compelling content about AI and prompt engineering to educate and engage our community.",
      requirements: ["Content marketing experience", "AI/tech writing background", "SEO knowledge", "Social media expertise"],
      posted: "1 week ago"
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      experience: "4+ years",
      description: "Build and maintain our cloud infrastructure to support millions of AI prompt refinements.",
      requirements: ["AWS/GCP experience", "Kubernetes/Docker", "CI/CD pipelines", "Monitoring and observability"],
      posted: "4 days ago"
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend"
    },
    {
      icon: Zap,
      title: "Professional Growth",
      description: "Learning budget, conference attendance, and mentorship programs"
    },
    {
      icon: Users,
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and co-working stipends"
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Work on products used by thousands of professionals worldwide"
    },
    {
      icon: Coffee,
      title: "Great Perks",
      description: "Unlimited PTO, team retreats, and top-tier equipment"
    },
    {
      icon: Briefcase,
      title: "Equity Package",
      description: "Competitive equity compensation with significant upside potential"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We're at the forefront of AI technology, always pushing boundaries and exploring new possibilities."
    },
    {
      title: "User Obsession",
      description: "Every decision we make is driven by what's best for our users and their success."
    },
    {
      title: "Transparency",
      description: "We believe in open communication, honest feedback, and sharing knowledge freely."
    },
    {
      title: "Continuous Learning",
      description: "We invest in our team's growth and encourage experimentation and learning from failures."
    }
  ];

  const getExperienceColor = (experience: string) => {
    if (experience.includes("2+")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (experience.includes("3+") || experience.includes("4+")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
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
              Join Our <span className="bg-gradient-primary bg-clip-text text-transparent">Mission</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Help us democratize AI and make prompt engineering accessible to everyone. 
              Build the future of human-AI interaction with a passionate, innovative team.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>50+ team members</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Remote-first culture</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Fast-growing startup</span>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-glow-subtle transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Open Positions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {openings.map((job, index) => (
                <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300">
                  <CardHeader>
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl mb-2">{job.title}</CardTitle>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline">{job.department}</Badge>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {job.type}
                          </div>
                          <Badge className={getExperienceColor(job.experience)}>
                            {job.experience}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <Button variant="ai" size="sm">
                          Apply Now
                        </Button>
                        <span className="text-xs text-muted-foreground">Posted {job.posted}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{job.description}</p>
                    <div>
                      <h4 className="font-semibold mb-2">Key Requirements:</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Why Work at Promptly?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-glow-subtle transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto mb-6 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold font-jakarta mb-4">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold font-jakarta mb-12 text-center">Our Hiring Process</h2>
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    1
                  </div>
                  <h3 className="font-semibold mb-2">Application</h3>
                  <p className="text-sm text-muted-foreground">Submit your application and we'll review it within 48 hours</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    2
                  </div>
                  <h3 className="font-semibold mb-2">Screening</h3>
                  <p className="text-sm text-muted-foreground">Initial phone/video call to discuss your background and interests</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    3
                  </div>
                  <h3 className="font-semibold mb-2">Interview</h3>
                  <p className="text-sm text-muted-foreground">Technical or role-specific interview with team members</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                    4
                  </div>
                  <h3 className="font-semibold mb-2">Final Call</h3>
                  <p className="text-sm text-muted-foreground">Culture fit conversation and questions about the role</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold font-jakarta mb-6">
              Ready to Shape the Future of AI?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't see a perfect fit? We're always looking for exceptional talent. 
              Send us your resume and tell us how you'd like to contribute.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button variant="ai" size="xl" className="font-semibold">
                  Contact Our Team
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="font-semibold">
                View All Openings
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}