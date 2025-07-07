import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Shield, Eye, Lock, Database } from "lucide-react";

export default function Privacy() {
  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          text: "We collect information you provide directly to us, such as when you create an account, use our services, or contact us. This may include your name, email address, phone number, and professional information."
        },
        {
          subtitle: "Usage Information", 
          text: "We automatically collect information about how you use our services, including prompts you create, features you use, and your interactions with our platform."
        },
        {
          subtitle: "Device Information",
          text: "We collect information about the devices you use to access our services, including IP address, browser type, operating system, and device identifiers."
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Eye,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide, maintain, and improve our AI prompt engineering services, including personalizing your experience and providing customer support."
        },
        {
          subtitle: "Communication",
          text: "We may use your information to send you technical notices, updates, security alerts, and support messages."
        },
        {
          subtitle: "Analytics and Improvement",
          text: "We use data analytics to understand how our services are used and to improve our algorithms and user experience."
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        {
          subtitle: "No Sale of Personal Data",
          text: "We do not sell, rent, or trade your personal information to third parties for their marketing purposes."
        },
        {
          subtitle: "Service Providers",
          text: "We may share information with trusted service providers who assist us in operating our services, subject to confidentiality agreements."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information if required by law or to protect our rights, property, or safety, or that of our users or others."
        }
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          text: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
        },
        {
          subtitle: "Encryption",
          text: "All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We limit access to personal information to employees and contractors who need it to perform their job functions."
        }
      ]
    }
  ];

  const dataRights = [
    "Access: Request a copy of the personal information we hold about you",
    "Rectification: Request correction of inaccurate or incomplete information",
    "Erasure: Request deletion of your personal information under certain circumstances",
    "Portability: Request transfer of your data to another service provider",
    "Restriction: Request limitation of processing of your personal information",
    "Objection: Object to processing of your personal information for marketing purposes"
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
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold font-jakarta mb-4">
                Privacy <span className="bg-gradient-primary bg-clip-text text-transparent">Policy</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                We are committed to protecting your privacy and being transparent about how we collect, use, and share information.
              </p>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <span>Last updated: January 15, 2024</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {/* Introduction */}
              <Card className="mb-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardContent className="p-8">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    At Promptly AI Technologies Inc. ("Promptly," "we," "us," or "our"), we respect your privacy and are committed to protecting it through our compliance with this policy. This Privacy Policy describes the types of information we may collect from you or that you may provide when you visit our website or use our services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.
                  </p>
                </CardContent>
              </Card>

              {/* Main Sections */}
              <div className="space-y-8">
                {sections.map((section, index) => {
                  const Icon = section.icon;
                  return (
                    <Card key={index} className="hover:shadow-glow-subtle transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-2xl font-jakarta">
                          <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          {section.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            <h4 className="font-semibold text-foreground mb-2">{item.subtitle}</h4>
                            <p className="text-muted-foreground leading-relaxed">{item.text}</p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Your Rights */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Your Rights and Choices</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Depending on your location, you may have certain rights regarding your personal information:
                  </p>
                  <ul className="space-y-2">
                    {dataRights.map((right, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{right}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-muted-foreground mt-4">
                    To exercise these rights, please contact us using the information provided below.
                  </p>
                </CardContent>
              </Card>

              {/* International Transfers */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">International Data Transfers</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Your information may be transferred to and processed in countries other than your own. We ensure that such transfers are made in accordance with applicable data protection laws and that appropriate safeguards are in place to protect your information.
                  </p>
                </CardContent>
              </Card>

              {/* Children's Privacy */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Children's Privacy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will delete that information as quickly as possible.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Policy */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Changes to This Privacy Policy</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                  </p>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="mt-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Contact Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> privacy@promptly.ai</p>
                    <p><strong>Address:</strong> 123 AI Innovation Drive, San Francisco, CA 94105</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}