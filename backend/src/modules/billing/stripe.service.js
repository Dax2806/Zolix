import Stripe from "stripe";
import AppError from "../../common/errors/AppError.js";
import Tenant from "../tenants/tenant.model.js";
import { getPlanConfig } from "../../common/constants/plans.js";

let stripe;

const initStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

export const createStripeCheckoutSession = async (planId, user) => {
  const stripeInstance = initStripe();
  if (!stripeInstance) {
    throw new AppError("Stripe is not configured on this server. Please add STRIPE_SECRET_KEY to your environment.", 500);
  }

  const tenant = await Tenant.findById(user.tenantId);
  if (!tenant) throw new AppError("Tenant not found", 404);

  const planConfig = getPlanConfig(planId);
  if (!planConfig) throw new AppError("Invalid plan", 400);

  if (planConfig.monthlyPrice === 0) {
    // Free plan, just update it directly
    tenant.plan = "free";
    await tenant.save();
    const url = process.env.FRONTEND_URL || 'http://localhost:5173';
    return { url: `${url}/billing?success=true` };
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'inr',
          product_data: {
            name: `Zolix CRM - ${planConfig.name} Plan`,
            description: "Monthly subscription for CRM usage",
          },
          unit_amount: planConfig.monthlyPrice * 100, // Amount in paise
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${frontendUrl}/billing?success=true`,
    cancel_url: `${frontendUrl}/billing?canceled=true`,
    client_reference_id: tenant._id.toString(),
    metadata: {
      tenantId: tenant._id.toString(),
      planId: planId,
    }
  });

  return { url: session.url };
};

export const handleStripeWebhook = async (body, signature) => {
  const stripeInstance = initStripe();
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  
  if (!stripeInstance || !endpointSecret) {
    throw new AppError("Stripe webhook secrets not configured", 500);
  }

  let event;
  try {
    event = stripeInstance.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    throw new AppError(`Webhook Error: ${err.message}`, 400);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const tenantId = session.metadata.tenantId;
    const planId = session.metadata.planId;
    
    if (tenantId && planId) {
      await Tenant.findByIdAndUpdate(tenantId, { plan: planId });
    }
  }

  return { received: true };
};
