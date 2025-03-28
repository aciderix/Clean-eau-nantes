import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import AdminIndex from "@/pages/admin/index";
import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminContent from "@/pages/admin/content";
import AdminMessages from "@/pages/admin/messages";
import AdminSubscribers from "@/pages/admin/subscribers";

function Router() {
  return (
    <Switch>
      {/* Main site routes */}
      <Route path="/" component={Home} />
      
      {/* Admin routes */}
      <Route path="/admin" component={AdminIndex} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path="/admin/content" component={AdminContent} />
      <Route path="/admin/messages" component={AdminMessages} />
      <Route path="/admin/subscribers" component={AdminSubscribers} />
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
