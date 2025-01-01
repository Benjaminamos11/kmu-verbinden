import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import Membership from "@/pages/Membership";
import Partners from "@/pages/Partners";
import Presidency from "@/pages/Presidency";
import Redaktion from "@/pages/Redaktion";
import Rechtsdienst from "@/pages/Rechtsdienst";
import UnsereAuftrag from "@/pages/UnsereAuftrag";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import News from "@/pages/News";
import NewsDetail from "@/pages/NewsDetail";
import Experts from "@/pages/Experts";
import ExpertDetail from "@/pages/ExpertDetail";
import PartnerDashboard from "@/pages/PartnerDashboard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/presidency" element={<Presidency />} />
          <Route path="/redaktion" element={<Redaktion />} />
          <Route path="/rechtsdienst" element={<Rechtsdienst />} />
          <Route path="/unsere-auftrag" element={<UnsereAuftrag />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:slug" element={<NewsDetail />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/experts/:id" element={<ExpertDetail />} />
          <Route path="/partner-dashboard/:partnerType" element={<PartnerDashboard />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;