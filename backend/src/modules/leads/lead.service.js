import Lead from "./lead.model.js";
import {
  createActivity,
} from "../activity/activity.service.js";

export const createLeadService = async (
  data,
  user
) => {
  const lead = await Lead.create({
    ...data,

    tenantId: user.tenantId,

    createdBy: user.id,
  });

  await createActivity({
    tenantId: user.tenantId,

    entityType: "lead",

    entityId: lead._id,

    action: "created",

    description: `Lead ${lead.name} created`,

    performedBy: user.id,
  });

  return lead;
};

export const bulkCreateLeadsService = async (leadsData, user) => {
  const preparedLeads = leadsData.map((data) => ({
    ...data,
    tenantId: user.tenantId,
    createdBy: user.id,
  }));

  const insertedLeads = await Lead.insertMany(preparedLeads);

  if (insertedLeads.length > 0) {
    await createActivity({
      tenantId: user.tenantId,
      entityType: "lead",
      entityId: insertedLeads[0]._id,
      action: "imported",
      description: `Imported ${insertedLeads.length} leads via CSV`,
      performedBy: user.id,
    });
  }

  return insertedLeads;
};

export const getLeadsService = async (
  query,
  user
) => {
  const {
    status,
    search,
    page = 1,
    limit = 10,
  } = query;

  const filters = {
    tenantId: user.tenantId,
  };

  if (status) {
    filters.status = status;
  }

  if (search) {
    filters.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        phone: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const leads = await Lead.find(filters)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(Number(limit));

  const total = await Lead.countDocuments(
    filters
  );

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    leads,
  };
};

export const getLeadByIdService = async (
  id,
  user
) => {
  const lead = await Lead.findOne({
    _id: id,
    tenantId: user.tenantId,
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  return lead;
};

export const updateLeadService = async (
  id,
  data,
  user
) => {
  const existingLead = await Lead.findOne({
    _id: id,
    tenantId: user.tenantId,
  });

  if (!existingLead) {
    throw new Error("Lead not found");
  }

  const lead = await Lead.findOneAndUpdate(
    {
      _id: id,
      tenantId: user.tenantId,
    },
    data,
    {
      new: true,
    }
  );

  if (!lead) {
    throw new Error("Lead not found");
  }

  await createActivity({
    tenantId: user.tenantId,
    entityType: "lead",
    entityId: lead._id,
    action: "updated",
    description: `Lead ${lead.name} updated`,
    performedBy: user.id,
    metadata: {
      changedFields: Object.keys(data),
    },
  });

  return lead;
};

export const deleteLeadService = async (
  id,
  user
) => {
  const lead = await Lead.findOneAndDelete({
    _id: id,
    tenantId: user.tenantId,
  });

  if (!lead) {
    throw new Error("Lead not found");
  }

  await createActivity({
    tenantId: user.tenantId,
    entityType: "lead",
    entityId: lead._id,
    action: "deleted",
    description: `Lead ${lead.name} deleted`,
    performedBy: user.id,
  });

  return {
    message: "Lead deleted successfully",
  };
};
