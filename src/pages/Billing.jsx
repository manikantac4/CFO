import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Download,
  Calendar
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import { useBilling } from '../hooks/useBilling';
import { formatCurrency } from '../utils/currency';

const Billing = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  
  const {
    billing,
    billingHistory,
    pricingPlans,
    paymentMethods,
    getCreditUsage,
    getMonthlyUsage,
    getSpendingTrends,
    needsMoreCredits,
    getRecommendedPlan,
    buyCredits,
    isPurchasing
  } = useBilling();

  const creditUsage = getCreditUsage();
  const monthlyUsage = getMonthlyUsage();
  const spendingTrends = getSpendingTrends();
  const recommendedPlan = getRecommendedPlan();

  const handlePurchase = async (plan) => {
    try {
      await buyCredits(plan.credits);
      setShowPurchaseModal(false);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Billing & Credits
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage your subscription and credit usage
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Download Invoice
          </Button>
          <Button variant="primary" size="sm" onClick={() => setShowPurchaseModal(true)}>
            <Plus size={16} className="mr-2" />
            Buy Credits
          </Button>
        </div>
      </div>

      {/* Credit Usage Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="kpi-chip">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Remaining Credits
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {creditUsage?.remaining || 0}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {creditUsage?.percentage || 0}% of total
                </p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <CreditCard className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${creditUsage?.percentage || 0}%` }}
                />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="kpi-chip">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  This Month
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {monthlyUsage[monthlyUsage.length - 1]?.credits || 0}
                </p>
                <div className="flex items-center mt-1">
                  {spendingTrends?.credits?.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-red-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
                  )}
                  <span className={`text-sm ${
                    spendingTrends?.credits?.trend === 'up' 
                      ? 'text-red-600 dark:text-red-400' 
                      : 'text-green-600 dark:text-green-400'
                  }`}>
                    {spendingTrends?.credits?.change || 0}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <Calendar className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="kpi-chip">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Spent
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  {formatCurrency(
                    monthlyUsage.reduce((sum, month) => sum + month.amount, 0),
                    'USD',
                    { compact: true }
                  )}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  All time
                </p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <TrendingUp className="w-6 h-6 text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Low Credits Alert */}
      {needsMoreCredits() && (
        <motion.div
          className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Low Credit Warning
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                You're running low on credits. Consider purchasing more to avoid interruption.
              </p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowPurchaseModal(true)}>
              Buy Credits
            </Button>
          </div>
        </motion.div>
      )}

      {/* Pricing Plans */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Pricing Plans
          </h3>
          {recommendedPlan && (
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Recommended: {recommendedPlan.name}
            </span>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative p-6 border rounded-lg ${
                plan.popular
                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/10'
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-pink-500 text-white px-3 py-1 text-xs font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  {plan.name}
                </h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(plan.price, 'USD')}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">/month</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {plan.credits.toLocaleString()} credits
                </p>
              </div>
              
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button
                variant={plan.popular ? 'primary' : 'outline'}
                className="w-full"
                onClick={() => {
                  setSelectedPlan(plan);
                  setShowPurchaseModal(true);
                }}
              >
                Choose Plan
              </Button>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Transaction History */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
          Transaction History
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Description
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Credits
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Amount
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {billingHistory.map((transaction, index) => (
                <motion.tr
                  key={transaction.id}
                  className="border-b border-slate-200 dark:border-slate-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                    {transaction.description}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                    {transaction.credits}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-900 dark:text-slate-100">
                    {formatCurrency(transaction.amount, 'USD')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Purchase Modal */}
      <Modal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        title="Purchase Credits"
        size="md"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Select Plan
            </label>
            <div className="space-y-3">
              {pricingPlans.map((plan) => (
                <label
                  key={plan.id}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                    selectedPlan?.id === plan.id
                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/10'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan?.id === plan.id}
                      onChange={() => setSelectedPlan(plan)}
                      className="text-pink-600"
                    />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-slate-100">
                        {plan.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {plan.credits.toLocaleString()} credits
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900 dark:text-slate-100">
                      {formatCurrency(plan.price, 'USD')}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      /month
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Payment Method
            </label>
            <select className="input-field">
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.icon} {method.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowPurchaseModal(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => selectedPlan && handlePurchase(selectedPlan)}
              disabled={!selectedPlan || isPurchasing}
              loading={isPurchasing}
            >
              Purchase
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Billing;