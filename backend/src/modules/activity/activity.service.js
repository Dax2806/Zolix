import Activity from "./activity.model.js";

export const createActivity = async ({
  tenantId,
  entityType,
  entityId,
  action,
  description,
  performedBy,
  metadata = {},
}) => {
  return await Activity.create({
    tenantId,
    entityType,
    entityId,
    action,
    description,
    performedBy,
    metadata,
  });
};

export const getActivitiesService = async (
  filters,
  limit = 20
) => {
  return Activity.find(filters)
    .populate("performedBy", "name email")
    .sort({ createdAt: -1 })
    .limit(Number(limit));
};
