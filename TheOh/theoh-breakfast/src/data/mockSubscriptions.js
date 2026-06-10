export const mockSubscriptions = [
  {
    id: 'sub_1',
    customerName: 'Rahul Sharma',
    planId: 'plan_weekly',
    planName: '7 Day Plan',
    startDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    endDate: new Date(Date.now() + 86400000 * 8).toISOString(),
    status: 'active', // active, paused, cancelled
    totalPrice: 899,
    mealSelections: [
      { day: 1, meal: 'Classic Oatmeal' },
      { day: 2, meal: 'Avocado Toast' },
      { day: 3, meal: 'Classic Oatmeal' },
      // ...
    ]
  },
  {
    id: 'sub_2',
    customerName: 'Priya Patel',
    planId: 'plan_monthly',
    planName: '30 Day Plan',
    startDate: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
    endDate: new Date(Date.now() + 86400000 * 25).toISOString(),
    status: 'active',
    totalPrice: 3499,
    mealSelections: [
      { day: 1, meal: 'Protein Pancakes' }
    ]
  }
];
