import React, { useState, useEffect } from 'react';
import { TrendingUp, AlertCircle, Clock, Zap } from 'lucide-react';

export type BadgeType = 'bestseller' | 'limited' | 'deal-expiring' | 'trending' | 'rare-find';

interface UrgencyBadgeProps {
  type: BadgeType;
  text?: string;
  expiryTime?: Date;
  count?: number;
}

export const UrgencyBadge: React.FC<UrgencyBadgeProps> = ({
  type,
  text,
  expiryTime,
  count
}) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!expiryTime || type !== 'deal-expiring') return;

    const updateTimer = () => {
      const now = new Date();
      const diff = expiryTime.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (hours > 24) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        setTimeLeft(`${days}d left`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m left`);
      } else {
        setTimeLeft(`${minutes}m left`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [expiryTime, type]);

  const badgeConfig = {
    bestseller: {
      bg: 'bg-emerald-500/20',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      icon: TrendingUp,
      label: text || '🏆 Bestseller',
      tooltip: 'Top rated by customers'
    },
    limited: {
      bg: 'bg-orange-500/20',
      text: 'text-orange-400',
      border: 'border-orange-500/30',
      icon: AlertCircle,
      label: text || `⚠️ Only ${count || '5'} left`,
      tooltip: 'Limited stock available'
    },
    'deal-expiring': {
      bg: 'bg-red-500/20',
      text: 'text-red-400',
      border: 'border-red-500/30',
      icon: Clock,
      label: text || `⏰ ${timeLeft || 'Ending soon'}`,
      tooltip: 'Deal expires soon'
    },
    trending: {
      bg: 'bg-blue-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      icon: Zap,
      label: text || '⚡ Trending Now',
      tooltip: 'Popular this week'
    },
    'rare-find': {
      bg: 'bg-purple-500/20',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      icon: AlertCircle,
      label: text || '💎 Rare Find',
      tooltip: 'Hard to find elsewhere'
    }
  };

  const config = badgeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} ${config.text} border ${config.border} px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:scale-105 cursor-default group`}
      title={config.tooltip}
    >
      <Icon className="h-3.5 w-3.5 flex-shrink-0" />
      <span>{config.label}</span>
      
      {/* Tooltip on hover */}
      <div className="absolute mt-8 hidden rounded-lg bg-charcoal px-2 py-1 text-[10px] text-off-white/80 whitespace-nowrap group-hover:block z-50 bottom-full left-1/2 transform -translate-x-1/2">
        {config.tooltip}
      </div>
    </div>
  );
};

// Composite component for product cards
interface ProductUrgencyProps {
  bestseller?: boolean;
  stockCount?: number;
  dealExpiry?: Date;
  trending?: boolean;
  rareFind?: boolean;
}

export const ProductUrgencyBadges: React.FC<ProductUrgencyProps> = ({
  bestseller,
  stockCount,
  dealExpiry,
  trending,
  rareFind
}) => {
  return (
    <div className="flex flex-wrap gap-2">
      {bestseller && <UrgencyBadge type="bestseller" />}
      {stockCount !== undefined && stockCount > 0 && (
        <UrgencyBadge type="limited" count={stockCount} />
      )}
      {dealExpiry && <UrgencyBadge type="deal-expiring" expiryTime={dealExpiry} />}
      {trending && <UrgencyBadge type="trending" />}
      {rareFind && <UrgencyBadge type="rare-find" />}
    </div>
  );
};

export default UrgencyBadge;
