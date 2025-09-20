import { useState, useCallback, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { runSimulation, saveScenario, getScenarios } from '../services/api';

export const useSimulation = () => {
  const queryClient = useQueryClient();
  const [currentScenario, setCurrentScenario] = useState({
    name: 'New Scenario',
    startingCash: 500000,
    monthlyRevenue: 75000,
    monthlyExpenses: 60000,
    payroll: 40000,
    marketing: 10000,
    headcount: 25,
    averageSalary: 80000,
    growthRate: 0.05,
    burnRate: 0.1,
    runway: 18,
    assumptions: {
      taxRate: 0.25,
      capex: 0,
      seasonality: 0
    }
  });

  // Run simulation mutation
  const runSimulationMutation = useMutation({
    mutationFn: runSimulation,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['simulations'] });
    },
    onError: (error) => {
      console.error('Simulation failed:', error);
    }
  });

  // Save scenario mutation
  const saveScenarioMutation = useMutation({
    mutationFn: saveScenario,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
    },
    onError: (error) => {
      console.error('Save scenario failed:', error);
    }
  });

  // Get scenarios query
  const { data: scenarios, isLoading: scenariosLoading } = useQuery({
    queryKey: ['scenarios'],
    queryFn: getScenarios,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Update scenario parameters
  const updateScenario = useCallback((updates) => {
    setCurrentScenario(prev => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Calculate derived metrics
  const calculatedMetrics = useMemo(() => {
    const { startingCash, monthlyRevenue, monthlyExpenses, headcount, averageSalary } = currentScenario;
    
    const annualPayroll = headcount * averageSalary;
    const monthlyPayroll = annualPayroll / 12;
    const totalMonthlyExpenses = monthlyExpenses + monthlyPayroll;
    const monthlyBurn = totalMonthlyExpenses - monthlyRevenue;
    const runway = monthlyBurn > 0 ? startingCash / monthlyBurn : Infinity;
    
    return {
      monthlyBurn,
      runway: Math.round(runway * 10) / 10,
      totalMonthlyExpenses,
      annualPayroll,
      monthlyPayroll
    };
  }, [currentScenario]);

  // Run simulation
  const simulate = useCallback(async () => {
    try {
      const result = await runSimulationMutation.mutateAsync({
        ...currentScenario,
        ...calculatedMetrics
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  }, [currentScenario, calculatedMetrics, runSimulationMutation]);

  // Save current scenario
  const saveCurrentScenario = useCallback(async (name) => {
    try {
      const result = await saveScenarioMutation.mutateAsync({
        name: name || currentScenario.name,
        ...currentScenario,
        ...calculatedMetrics,
        createdAt: new Date().toISOString()
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  }, [currentScenario, calculatedMetrics, saveScenarioMutation]);

  // Load scenario
  const loadScenario = useCallback((scenario) => {
    setCurrentScenario({
      name: scenario.name,
      startingCash: scenario.startingCash,
      monthlyRevenue: scenario.monthlyRevenue,
      monthlyExpenses: scenario.monthlyExpenses,
      payroll: scenario.payroll,
      marketing: scenario.marketing,
      headcount: scenario.headcount,
      averageSalary: scenario.averageSalary,
      growthRate: scenario.growthRate,
      burnRate: scenario.burnRate,
      runway: scenario.runway,
      assumptions: scenario.assumptions || {
        taxRate: 0.25,
        capex: 0,
        seasonality: 0
      }
    });
  }, []);

  // Reset scenario to defaults
  const resetScenario = useCallback(() => {
    setCurrentScenario({
      name: 'New Scenario',
      startingCash: 500000,
      monthlyRevenue: 75000,
      monthlyExpenses: 60000,
      payroll: 40000,
      marketing: 10000,
      headcount: 25,
      averageSalary: 80000,
      growthRate: 0.05,
      burnRate: 0.1,
      runway: 18,
      assumptions: {
        taxRate: 0.25,
        capex: 0,
        seasonality: 0
      }
    });
  }, []);

  return {
    currentScenario,
    calculatedMetrics,
    scenarios: scenarios?.data || [],
    scenariosLoading,
    updateScenario,
    simulate,
    saveCurrentScenario,
    loadScenario,
    resetScenario,
    isSimulating: runSimulationMutation.isPending,
    isSaving: saveScenarioMutation.isPending,
    simulationError: runSimulationMutation.error,
    saveError: saveScenarioMutation.error
  };
};