'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bus, Calendar, Star, Users, Tag, TrendingUp, TrendingDown } from 'lucide-react';
import { mockPointTransactions, formatPointAmount, formatPointDate, getCategoryLabel, type PointTransaction } from '@/lib/data/points';

export function PointTimeline() {
  const getIcon = (category: PointTransaction['category']) => {
    switch (category) {
      case 'bus':
        return <Bus className="h-5 w-5" />;
      case 'booking':
        return <Calendar className="h-5 w-5" />;
      case 'review':
        return <Star className="h-5 w-5" />;
      case 'referral':
        return <Users className="h-5 w-5" />;
      case 'discount':
        return <Tag className="h-5 w-5" />;
    }
  };

  const getIconColor = (category: PointTransaction['category']) => {
    switch (category) {
      case 'bus':
        return 'text-[--secondary] bg-[--secondary]/10';
      case 'booking':
        return 'text-[--primary] bg-[--primary]/10';
      case 'review':
        return 'text-[--warning] bg-[--warning]/10';
      case 'referral':
        return 'text-purple-500 bg-purple-100';
      case 'discount':
        return 'text-pink-500 bg-pink-100';
    }
  };

  return (
    <div className="space-y-4">
      {mockPointTransactions.map((transaction, index) => (
        <div key={transaction.id} className="flex gap-4">
          {/* Timeline Line */}
          <div className="flex flex-col items-center">
            <div className={`p-3 rounded-full ${getIconColor(transaction.category)}`}>
              {getIcon(transaction.category)}
            </div>
            {index < mockPointTransactions.length - 1 && (
              <div className="w-0.5 h-full bg-gray-200 dark:bg-gray-700 mt-2" />
            )}
          </div>

          {/* Transaction Card */}
          <Card className="flex-1 p-4 hover:shadow-md transition-shadow bg-amber-50 dark:bg-amber-950/20">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{transaction.description}</h4>
                  <Badge variant="outline" className="text-xs">
                    {getCategoryLabel(transaction.category)}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500">
                  {formatPointDate(transaction.timestamp)}
                  {' • '}
                  잔액: {transaction.balance.toLocaleString()}P
                </p>
              </div>

              {/* Amount */}
              <div className="flex flex-col items-end gap-1">
                <div
                  className={`flex items-center gap-1 font-bold text-lg ${
                    transaction.type === 'earn'
                      ? 'text-[--success]'
                      : 'text-[--error]'
                  }`}
                >
                  {transaction.type === 'earn' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {formatPointAmount(transaction.amount, transaction.type)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
}
