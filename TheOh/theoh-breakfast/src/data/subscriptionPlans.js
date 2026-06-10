export const subscriptionPlans = [
  {
    id: 'plan_tomorrow',
    name: 'Next Day Pre-Order',
    durationDays: 1,
    originalPrice: 169,
    discountedPrice: 149,
    savings: 20,
    badge: 'Quick',
    description: 'Order today, get it tomorrow morning.',
    features: [
      'Select any meal for tomorrow',
      'Flexible delivery time',
      'Cancel anytime before 10 PM'
    ]
  },
  {
    id: 'plan_weekly',
    name: '7 Day Plan',
    durationDays: 7,
    originalPrice: 1043, // 149 * 7
    discountedPrice: 899,
    savings: 144,
    badge: 'Popular',
    description: 'A whole week of healthy breakfasts sorted.',
    features: [
      'Choose same or different meals daily',
      'Skip a day if needed',
      'Free delivery included',
      'Pause anytime'
    ]
  },
  {
    id: 'plan_monthly',
    name: '30 Day Plan',
    durationDays: 30,
    originalPrice: 4470, // 149 * 30
    discountedPrice: 3499,
    savings: 971,
    badge: 'Best Value',
    description: 'Transform your mornings for a month.',
    features: [
      'Maximum savings',
      'Full menu access',
      'Priority delivery support',
      'Flexible pausing & skipping',
      'Surprise treats'
    ]
  }
];
