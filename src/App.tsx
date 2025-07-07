
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Workspace from "./pages/Workspace";
import History from "./pages/History";
import Templates from "./pages/Templates";
import Saved from "./pages/Saved";
import Docs from "./pages/Docs";
import Examples from "./pages/Examples";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import AccountSettings from "./pages/settings/AccountSettings";
import SecuritySettings from "./pages/settings/SecuritySettings";
import NotificationSettings from "./pages/settings/NotificationSettings";
import AppearanceSettings from "./pages/settings/AppearanceSettings";
import ApiKeysSettings from "./pages/settings/ApiKeysSettings";
import BillingSettings from "./pages/settings/BillingSettings";
import LanguageSettings from "./pages/settings/LanguageSettings";
import DataSettings from "./pages/settings/DataSettings";
import WorkspaceSettings from "./pages/settings/WorkspaceSettings";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Help from "./pages/Help";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Billing from "./pages/Billing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/history" element={<History />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/account" element={<AccountSettings />} />
          <Route path="/settings/security" element={<SecuritySettings />} />
          <Route path="/settings/notifications" element={<NotificationSettings />} />
          <Route path="/settings/appearance" element={<AppearanceSettings />} />
          <Route path="/settings/api-keys" element={<ApiKeysSettings />} />
          <Route path="/settings/billing" element={<BillingSettings />} />
          <Route path="/settings/language" element={<LanguageSettings />} />
          <Route path="/settings/data" element={<DataSettings />} />
          <Route path="/settings/workspace" element={<WorkspaceSettings />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/help" element={<Help />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/billing" element={<Billing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
