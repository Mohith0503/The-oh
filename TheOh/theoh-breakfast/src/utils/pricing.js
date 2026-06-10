export const SUBSCRIPTION_PLANS = {
  tomorrow: {
    id: 'tomorrow',
    name: 'Next Day Pre-Order',
    duration: 1,
    discountPercentage: 0,
    badge: null
  },
  weekly: {
    id: 'weekly',
    name: 'Weekly Plan',
    duration: 7,
    discountPercentage: 5,
    badge: 'Popular'
  },
  monthly: {
    id: 'monthly',
    name: 'Monthly Plan',
    duration: 30,
    discountPercentage: 10,
    badge: 'Best Value'
  }
};

export function calculateSubscriptionPrice(basePrice, planId, qty = 1) {
  const plan = SUBSCRIPTION_PLANS[planId];
  if (!plan) return { original: 0, discount: 0, final: 0 };

  const originalTotal = basePrice * plan.duration * qty;
  const discountAmount = Math.floor(originalTotal * (plan.discountPercentage / 100));
  const finalPrice = originalTotal - discountAmount;

  return {
    original: originalTotal,
    discount: discountAmount,
    final: finalPrice,
    unitPrice: finalPrice / (plan.duration * qty)
  };
}
