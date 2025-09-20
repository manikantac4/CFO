import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  BookOpen, 
  MessageCircle, 
  Mail,
  HelpCircle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', icon: BookOpen },
    { id: 'getting-started', name: 'Getting Started', icon: HelpCircle },
    { id: 'simulations', name: 'Simulations', icon: MessageCircle },
    { id: 'reports', name: 'Reports', icon: ExternalLink },
    { id: 'billing', name: 'Billing', icon: Mail }
  ];

  const articles = [
    {
      id: 1,
      title: 'Getting Started with CFO Helper',
      category: 'getting-started',
      description: 'Learn the basics of setting up your first financial scenario',
      content: 'CFO Helper is designed to make financial planning accessible to everyone. Start by creating your first scenario...',
      tags: ['basics', 'setup', 'tutorial']
    },
    {
      id: 2,
      title: 'Understanding Runway Calculations',
      category: 'simulations',
      description: 'How runway is calculated and what it means for your business',
      content: 'Runway represents the number of months your company can operate with current cash reserves...',
      tags: ['runway', 'cash', 'metrics']
    },
    {
      id: 3,
      title: 'Creating and Managing Scenarios',
      category: 'simulations',
      description: 'Step-by-step guide to building financial scenarios',
      content: 'Scenarios allow you to model different business situations and compare outcomes...',
      tags: ['scenarios', 'modeling', 'comparison']
    },
    {
      id: 4,
      title: 'Generating Financial Reports',
      category: 'reports',
      description: 'How to create and export professional financial reports',
      content: 'Generate PDF and CSV reports for investors, board members, and stakeholders...',
      tags: ['reports', 'export', 'pdf']
    },
    {
      id: 5,
      title: 'Understanding Credit Usage',
      category: 'billing',
      description: 'How credits work and managing your usage',
      content: 'Credits are consumed when you run simulations, generate reports, or use advanced features...',
      tags: ['credits', 'billing', 'usage']
    },
    {
      id: 6,
      title: 'Integrating with Pathway',
      category: 'getting-started',
      description: 'Connect your accounting system for real-time data',
      content: 'Pathway integration allows you to automatically sync financial data from your accounting system...',
      tags: ['pathway', 'integration', 'data']
    }
  ];

  const glossary = [
    {
      term: 'Burn Rate',
      definition: 'The rate at which a company is spending its cash reserves, typically measured monthly.'
    },
    {
      term: 'Runway',
      definition: 'The amount of time (usually in months) a company can continue operating with its current cash reserves.'
    },
    {
      term: 'Scenario',
      definition: 'A financial model that represents a specific set of assumptions about your business.'
    },
    {
      term: 'Cash Flow',
      definition: 'The movement of money in and out of your business over a specific period.'
    },
    {
      term: 'P&L',
      definition: 'Profit and Loss statement showing revenue, expenses, and profit over a period.'
    },
    {
      term: 'Headcount',
      definition: 'The total number of employees in your organization.'
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Help Center
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Find answers to your questions and learn how to use CFO Helper
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        <input
          type="text"
          placeholder="Search help articles..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-700 dark:text-pink-300'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <category.icon size={20} />
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Contact Support
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Get help from our team
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Mail className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Email Support
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    support@cfohelper.com
                  </p>
                </div>
              </div>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    Documentation
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Complete user guide
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Articles */}
          <div className="space-y-4">
            {filteredArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                        {article.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 mb-3">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight size={16} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Glossary */}
          <Card className="mt-8">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
              Financial Terms Glossary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {glossary.map((item, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                    {item.term}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {item.definition}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;