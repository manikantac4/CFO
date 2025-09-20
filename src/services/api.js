import axios from "axios";

const api = axios.create({ 
  baseURL: "/api",
  timeout: 10000,
});

// Request interceptor for auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Simulation endpoints
export const runSimulation = (scenario) => 
  api.post("/simulate", scenario);

export const getSimulationHistory = () => 
  api.get("/simulations");

// Scenarios endpoints
export const saveScenario = (data) => 
  api.post("/scenarios", data);

export const getScenarios = () => 
  api.get("/scenarios");

export const getScenario = (id) => 
  api.get(`/scenarios/${id}`);

export const updateScenario = (id, data) => 
  api.put(`/scenarios/${id}`, data);

export const deleteScenario = (id) => 
  api.delete(`/scenarios/${id}`);

export const duplicateScenario = (id) => 
  api.post(`/scenarios/${id}/duplicate`);

// Reports endpoints
export const generateReport = (id, type) => 
  api.post(`/reports/${id}`, { type });

export const getReports = () => 
  api.get("/reports");

export const downloadReport = (id) => 
  api.get(`/reports/${id}/download`, { responseType: 'blob' });

// Billing endpoints
export const getBilling = () => 
  api.get("/billing");

export const purchaseCredits = (amount) => 
  api.post("/billing/purchase", { amount });

export const getBillingHistory = () => 
  api.get("/billing/history");

// Integrations endpoints
export const triggerPathwayUpdate = () => 
  api.post("/integrations/pathway/trigger");

export const uploadCSV = (file, mapping) => 
  api.post("/integrations/csv", { file, mapping });

export const getWebhookConfig = () => 
  api.get("/integrations/webhook");

export const updateWebhookConfig = (config) => 
  api.put("/integrations/webhook", config);

// Auth endpoints
export const login = (credentials) => 
  api.post("/auth/login", credentials);

export const signup = (userData) => 
  api.post("/auth/signup", userData);

export const logout = () => 
  api.post("/auth/logout");

export const getCurrentUser = () => 
  api.get("/auth/me");

// Admin endpoints
export const getSystemLogs = () => 
  api.get("/admin/logs");

export const getSystemStats = () => 
  api.get("/admin/stats");

export const triggerError = (type) => 
  api.post("/admin/trigger-error", { type });

export default api;