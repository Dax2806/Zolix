import Lead from "../models/lead.model.js";

// GET DASHBOARD METRICS
export const getDashboardStats = async (req, res) => {
  try {
    const leads = await Lead.find({
      tenantId: req.user.tenantId,
    });

    const totalLeads = leads.length;

    const newLeads = leads.filter(
      (l) => l.status === "new"
    ).length;

    const contacted = leads.filter(
      (l) => l.status === "contacted"
    ).length;

    const qualified = leads.filter(
      (l) => l.status === "qualified"
    ).length;

    const converted = leads.filter(
      (l) => l.status === "converted"
    ).length;

    const lost = leads.filter(
      (l) => l.status === "lost"
    ).length;

    const conversionRate =
      totalLeads === 0
        ? 0
        : ((converted / totalLeads) * 100).toFixed(2);

    res.json({
      totalLeads,
      newLeads,
      contacted,
      qualified,
      converted,
      lost,
      conversionRate,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
