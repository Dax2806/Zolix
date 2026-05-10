import {
  successResponse,
} from "../../common/utils/apiResponse.js";
import {
  getBillingService,
  getPlansService,
  updatePlanService,
} from "./billing.service.js";
import {
  createStripeCheckoutSession,
  handleStripeWebhook,
} from "./stripe.service.js";

export const getPlans = (
  req,
  res
) => {
  return successResponse(res, {
    message:
      "Plans fetched successfully",
    data: getPlansService(),
  });
};

export const getBilling =
  async (req, res, next) => {
    try {
      const billing =
        await getBillingService(
          req.user
        );

      return successResponse(res, {
        message:
          "Billing fetched successfully",
        data: billing,
      });
    } catch (error) {
      next(error);
    }
  };

export const updatePlan =
  async (req, res, next) => {
    try {
      const billing =
        await updatePlanService(
          req.body.plan,
          req.user
        );

      return successResponse(res, {
        message:
          "Plan updated successfully",
        data: billing,
      });
    } catch (error) {
      next(error);
    }
  };

export const createCheckoutSession = async (req, res, next) => {
  try {
    const { plan } = req.body;
    const session = await createStripeCheckoutSession(plan, req.user);
    
    return successResponse(res, {
      message: "Checkout session created",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};

export const stripeWebhook = async (req, res, next) => {
  try {
    const signature = req.headers['stripe-signature'];
    const result = await handleStripeWebhook(req.body, signature);
    res.json(result);
  } catch (error) {
    console.error("Stripe Webhook Error:", error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};
