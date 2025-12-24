// Stripe products and prices configuration
// Maps our internal plan types to Stripe product/price IDs

export const STRIPE_PLANS = {
  basic: {
    product_id: "prod_TfCj18sjggBGVT",
    price_id: "price_1ShsKLGG40HuLABOCs63wgCS",
    name: "Basic",
    price_monthly: 29,
  },
  medium: {
    product_id: "prod_TfCjaPPRWBnsPH",
    price_id: "price_1ShsKQGG40HuLABOqfOQiDLB",
    name: "Medium",
    price_monthly: 59,
  },
  premium: {
    product_id: "prod_TfCju3C6AevWst",
    price_id: "price_1ShsKSGG40HuLABO3CvqZpta",
    name: "Premium",
    price_monthly: 99,
  },
} as const;

export type StripePlanType = keyof typeof STRIPE_PLANS;

export const getStripePriceId = (planType: StripePlanType): string => {
  return STRIPE_PLANS[planType].price_id;
};

export const getPlanFromProductId = (productId: string): StripePlanType | null => {
  for (const [key, value] of Object.entries(STRIPE_PLANS)) {
    if (value.product_id === productId) {
      return key as StripePlanType;
    }
  }
  return null;
};
