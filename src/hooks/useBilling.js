import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  getBilling, 
  purchaseCredits, 
  getBillingHistory 
} from '../services/api';
import { flexpriceService } from '../services/flexprice';

export const useBilling = () => {
  const queryClient = useQueryClient();

  // Get billing information
  const { data: billing, isLoading, error } = useQuery({
    queryKey: ['billing'],
    queryFn: getBilling,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Get billing history
  const { data: billingHistory, isLoading: historyLoading } = useQuery({
    queryKey: ['billing-history'],
    queryFn: getBillingHistory,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Purchase credits mutation
  const purchaseCreditsMutation = useMutation({
    mutationFn: purchaseCredits,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['billing'] });
      queryClient.invalidateQueries({ queryKey: ['billing-history'] });
    },
    onError: (error) => {
      console.error('Purchase credits failed:', error);
    }
  });

  // Get pricing plans
  const { data: pricingPlans } = useQuery({
    queryKey: ['pricing-plans'],
    queryFn: flexpriceService.getPricingPlans,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Get payment methods
  const { data: paymentMethods } = useQuery({
    queryKey: ['payment-methods'],
    queryFn: flexpriceService.getPaymentMethods,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  // Purchase credits
  const buyCredits = async (amount, paymentMethod = 'card') => {
    try {
      // Create payment session
      const session = await flexpriceService.createPaymentSession(amount);
      if (!session.success) {
        throw new Error(session.message);
      }

      // Process payment
      const payment = await flexpriceService.processPayment(session.sessionId, paymentMethod);
      if (!payment.success) {
        throw new Error(payment.message);
      }

      // Update billing
      const result = await purchaseCreditsMutation.mutateAsync(amount);
      return result.data;
    } catch (error) {
      throw error;
    }
  };

  // Get credit usage
  const getCreditUsage = () => {
    if (!billing?.data) return null;
    
    const { credits, totalCredits } = billing.data;
    const used = totalCredits - credits;
    const percentage = (used / totalCredits) * 100;
    
    return {
      used,
      remaining: credits,
      total: totalCredits,
      percentage: Math.round(percentage * 10) / 10
    };
  };

  // Get monthly usage
  const getMonthlyUsage = () => {
    if (!billingHistory?.data) return [];
    
    const monthlyUsage = billingHistory.data.reduce((acc, transaction) => {
      const month = new Date(transaction.date).toISOString().slice(0, 7);
      if (!acc[month]) {
        acc[month] = { month, credits: 0, amount: 0 };
      }
      acc[month].credits += transaction.credits;
      acc[month].amount += transaction.amount;
      return acc;
    }, {});
    
    return Object.values(monthlyUsage).sort((a, b) => a.month.localeCompare(b.month));
  };

  // Get spending trends
  const getSpendingTrends = () => {
    const monthlyUsage = getMonthlyUsage();
    if (monthlyUsage.length < 2) return null;
    
    const current = monthlyUsage[monthlyUsage.length - 1];
    const previous = monthlyUsage[monthlyUsage.length - 2];
    
    const creditsChange = ((current.credits - previous.credits) / previous.credits) * 100;
    const amountChange = ((current.amount - previous.amount) / previous.amount) * 100;
    
    return {
      credits: {
        change: Math.round(creditsChange * 10) / 10,
        trend: creditsChange > 0 ? 'up' : creditsChange < 0 ? 'down' : 'stable'
      },
      amount: {
        change: Math.round(amountChange * 10) / 10,
        trend: amountChange > 0 ? 'up' : amountChange < 0 ? 'down' : 'stable'
      }
    };
  };

  // Check if user needs more credits
  const needsMoreCredits = () => {
    const usage = getCreditUsage();
    if (!usage) return false;
    
    return usage.percentage > 80; // Alert when 80% of credits used
  };

  // Get recommended plan
  const getRecommendedPlan = () => {
    const usage = getCreditUsage();
    if (!usage || !pricingPlans?.data) return null;
    
    const monthlyUsage = getMonthlyUsage();
    const avgMonthlyCredits = monthlyUsage.length > 0 
      ? monthlyUsage.reduce((sum, month) => sum + month.credits, 0) / monthlyUsage.length
      : 0;
    
    // Find plan that covers average usage with some buffer
    const recommended = pricingPlans.data.find(plan => 
      plan.credits >= avgMonthlyCredits * 1.2
    );
    
    return recommended || pricingPlans.data[0];
  };

  return {
    billing: billing?.data,
    billingHistory: billingHistory?.data || [],
    pricingPlans: pricingPlans?.data || [],
    paymentMethods: paymentMethods?.data || [],
    isLoading,
    historyLoading,
    error,
    buyCredits,
    getCreditUsage,
    getMonthlyUsage,
    getSpendingTrends,
    needsMoreCredits,
    getRecommendedPlan,
    isPurchasing: purchaseCreditsMutation.isPending,
    purchaseError: purchaseCreditsMutation.error
  };
};