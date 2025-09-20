import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Components
import Navbar from './components/ui/Navbar';
import Sidebar from './components/ui/Sidebar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import SimulationStudio from './pages/SimulationStudio';
import Scenarios from './pages/Scenarios';
import Reports from './pages/Reports';
import Billing from './pages/Billing';
import Integrations from './pages/Integrations';
import Admin from './pages/Admin';
import Help from './pages/Help';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/onboarding" element={
              <div className="min-h-screen">
                <Onboarding />
              </div>
            } />
            
            <Route path="/dashboard" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Dashboard />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/simulation" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <SimulationStudio />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/scenarios" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Scenarios />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/reports" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Reports />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/billing" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Billing />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/integrations" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Integrations />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/admin" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Admin />
                  </main>
                </div>
              </div>
            } />
            
            <Route path="/help" element={
              <div className="min-h-screen">
                <Navbar />
                <div className="flex">
                  <Sidebar />
                  <main className="flex-1 lg:ml-64">
                    <Help />
                  </main>
                </div>
              </div>
            } />
          </Routes>
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;