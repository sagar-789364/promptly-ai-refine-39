import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowLeft, FileText, Scale, AlertTriangle, Users } from "lucide-react";

export default function Terms() {
  const sections = [
    {
      title: "Acceptance of Terms",
      icon: FileText,
      content: [
        {
          text: "By accessing and using Promptly's services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
        }
      ]
    },
    {
      title: "Description of Service",
      icon: Users,
      content: [
        {
          text: "Promptly provides an AI-powered platform for prompt engineering and optimization. Our service helps users create, refine, and manage prompts for various AI models and applications."
        },
        {
          text: "We reserve the right to modify, suspend, or discontinue any aspect of our service at any time, with or without notice."
        }
      ]
    },
    {
      title: "User Accounts and Responsibilities",
      icon: Users,
      content: [
        {
          subtitle: "Account Creation",
          text: "You must provide accurate and complete information when creating an account. You are responsible for maintaining the confidentiality of your account credentials."
        },
        {
          subtitle: "Acceptable Use",
          text: "You agree to use our services only for lawful purposes and in accordance with these Terms. You may not use our services to generate harmful, illegal, or offensive content."
        },
        {
          subtitle: "User Content",
          text: "You retain ownership of the prompts and content you create using our service. However, you grant us a license to use, modify, and display your content as necessary to provide our services."
        }
      ]
    },
    {
      title: "Prohibited Activities",
      icon: AlertTriangle,
      content: [
        {
          text: "You agree not to engage in any of the following prohibited activities:"
        },
        {
          list: [
            "Attempting to gain unauthorized access to our systems or other users' accounts",
            "Using our services to generate illegal, harmful, or offensive content",
            "Reverse engineering, decompiling, or disassembling our software",
            "Violating any applicable local, state, national, or international law",
            "Transmitting any viruses, worms, or malicious code",
            "Interfering with or disrupting our services or servers"
          ]
        }
      ]
    },
    {
      title: "Intellectual Property",
      icon: Scale,
      content: [
        {
          subtitle: "Our Rights",
          text: "Promptly and its licensors own all rights, title, and interest in and to the service, including all intellectual property rights. Our trademarks and trade names may not be used without our written consent."
        },
        {
          subtitle: "Your Rights",
          text: "You retain all rights to your original content. By using our service, you grant us a worldwide, non-exclusive, royalty-free license to use your content solely for the purpose of providing our services."
        }
      ]
    }
  ];

  const limitations = [
    "Our services are provided \"as is\" without any warranties, express or implied",
    "We do not guarantee that our services will be uninterrupted, secure, or error-free",
    "We are not liable for any indirect, incidental, special, or consequential damages",
    "Our total liability shall not exceed the amount paid by you for our services in the 12 months preceding the claim",
    "Some jurisdictions do not allow certain limitations, so these may not apply to you"
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
                Terms of <span className="bg-gradient-primary bg-clip-text text-transparent">Service</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                Please read these terms carefully before using our services. By using Promptly, you agree to these terms.
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
                    These Terms of Service ("Terms") govern your use of the Promptly website and services operated by Promptly AI Technologies Inc. ("Promptly," "we," "us," or "our"). These Terms apply to all visitors, users, and others who access or use our services.
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
                            {item.subtitle && (
                              <h4 className="font-semibold text-foreground mb-2">{item.subtitle}</h4>
                            )}
                            {item.text && (
                              <p className="text-muted-foreground leading-relaxed mb-4">{item.text}</p>
                            )}
                            {item.list && (
                              <ul className="space-y-2">
                                {item.list.map((listItem, listIndex) => (
                                  <li key={listIndex} className="flex items-start gap-2">
                                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-muted-foreground">{listItem}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Payment and Billing */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Payment and Billing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Subscription Fees</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Some features of our service require payment of fees. You agree to pay all applicable fees as described on our pricing page. Fees are non-refundable except as expressly stated in our refund policy.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Auto-Renewal</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Subscription fees are charged automatically on a recurring basis. You may cancel your subscription at any time, but cancellation will not take effect until the end of your current billing period.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Price Changes</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      We reserve the right to change our fees at any time. We will provide reasonable notice of any fee changes.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Limitations and Disclaimers */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Limitations and Disclaimers</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {limitations.map((limitation, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{limitation}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Termination */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Termination</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We may terminate or suspend your account and bar access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    You may terminate your account at any time by contacting us. Upon termination, your right to use our services will cease immediately.
                  </p>
                </CardContent>
              </Card>

              {/* Governing Law */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Governing Law</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the State of California, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of California.
                  </p>
                </CardContent>
              </Card>

              {/* Changes to Terms */}
              <Card className="mt-8 hover:shadow-glow-subtle transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-jakarta">Changes to Terms</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to the new terms taking effect. By continuing to access or use our services after any revisions become effective, you agree to be bound by the revised terms.
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
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2 text-muted-foreground">
                    <p><strong>Email:</strong> legal@promptly.ai</p>
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