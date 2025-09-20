import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getScenarios, 
  getScenario, 
  updateScenario, 
  deleteScenario, 
  duplicateScenario 
} from '../services/api';

export const useScenarios = () => {
  const queryClient = useQueryClient();

  // Get all scenarios
  const { data: scenarios, isLoading, error } = useQuery({
    queryKey: ['scenarios'],
    queryFn: getScenarios,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Get single scenario
  const useScenario = (id) => {
    return useQuery({
      queryKey: ['scenario', id],
      queryFn: () => getScenario(id),
      enabled: !!id,
      staleTime: 5 * 60 * 1000,
    });
  };

  // Update scenario mutation
  const updateScenarioMutation = useMutation({
    mutationFn: ({ id, data }) => updateScenario(id, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
      queryClient.invalidateQueries({ queryKey: ['scenario', variables.id] });
    },
    onError: (error) => {
      console.error('Update scenario failed:', error);
    }
  });

  // Delete scenario mutation
  const deleteScenarioMutation = useMutation({
    mutationFn: deleteScenario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
    },
    onError: (error) => {
      console.error('Delete scenario failed:', error);
    }
  });

  // Duplicate scenario mutation
  const duplicateScenarioMutation = useMutation({
    mutationFn: duplicateScenario,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['scenarios'] });
    },
    onError: (error) => {
      console.error('Duplicate scenario failed:', error);
    }
  });

  // Update scenario
  const updateScenarioData = async (id, data) => {
    try {
      const result = await updateScenarioMutation.mutateAsync({ id, data });
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  // Delete scenario
  const deleteScenarioData = async (id) => {
    try {
      await deleteScenarioMutation.mutateAsync(id);
    } catch (error) {
      throw error;
    }
  };

  // Duplicate scenario
  const duplicateScenarioData = async (id) => {
    try {
      const result = await duplicateScenarioMutation.mutateAsync(id);
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  // Get scenarios by category
  const getScenariosByCategory = (category) => {
    if (!scenarios?.data) return [];
    return scenarios.data.filter(scenario => scenario.category === category);
  };

  // Get recent scenarios
  const getRecentScenarios = (limit = 5) => {
    if (!scenarios?.data) return [];
    return scenarios.data
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, limit);
  };

  // Search scenarios
  const searchScenarios = (query) => {
    if (!scenarios?.data || !query) return scenarios?.data || [];
    const lowercaseQuery = query.toLowerCase();
    return scenarios.data.filter(scenario =>
      scenario.name.toLowerCase().includes(lowercaseQuery) ||
      scenario.description?.toLowerCase().includes(lowercaseQuery) ||
      scenario.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  // Get scenario statistics
  const getScenarioStats = () => {
    if (!scenarios?.data) return null;
    
    const total = scenarios.data.length;
    const categories = scenarios.data.reduce((acc, scenario) => {
      acc[scenario.category] = (acc[scenario.category] || 0) + 1;
      return acc;
    }, {});
    
    const avgRunway = scenarios.data.reduce((sum, scenario) => sum + scenario.runway, 0) / total;
    const avgBurn = scenarios.data.reduce((sum, scenario) => sum + scenario.monthlyBurn, 0) / total;
    
    return {
      total,
      categories,
      avgRunway: Math.round(avgRunway * 10) / 10,
      avgBurn: Math.round(avgBurn)
    };
  };

  return {
    scenarios: scenarios?.data || [],
    isLoading,
    error,
    useScenario,
    updateScenarioData,
    deleteScenarioData,
    duplicateScenarioData,
    getScenariosByCategory,
    getRecentScenarios,
    searchScenarios,
    getScenarioStats,
    isUpdating: updateScenarioMutation.isPending,
    isDeleting: deleteScenarioMutation.isPending,
    isDuplicating: duplicateScenarioMutation.isPending,
    updateError: updateScenarioMutation.error,
    deleteError: deleteScenarioMutation.error,
    duplicateError: duplicateScenarioMutation.error
  };
};