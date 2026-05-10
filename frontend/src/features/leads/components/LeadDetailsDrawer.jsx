import {
  useEffect,
  useState,
} from "react";

import Drawer
  from "../../../components/ui/Drawer";

import StatusBadge
  from "../../../components/ui/StatusBadge";

import LeadNotes
  from "./LeadNotex";

import LeadStatusManager
  from "./LeadStatusManager";

import LeadTasks
  from "./LeadTasks";

import ActivityTimeline
  from "./ActivityTimeline";

import LeadInsights
  from "./LeadInsights";

import {
  getLeadActivities,
} from "../services/lead.service";

const LeadDetailsDrawer = ({
  open,
  onClose,
  lead,
}) => {
  const [
    updatedLead,
    setUpdatedLead,
  ] = useState(null);

  const [
    activities,
    setActivities,
  ] = useState([]);

  const [
    activityLoading,
    setActivityLoading,
  ] = useState(false);

  // Use updated lead if available

  const currentLead =
    updatedLead || lead;

  const fetchActivities =
    async (leadId) => {
      if (!leadId) return;

      try {
        setActivityLoading(true);

        const data =
          await getLeadActivities(
            leadId
          );

        setActivities(data);
      } catch (error) {
        console.error(error);
      } finally {
        setActivityLoading(false);
      }
    };

  useEffect(() => {
    if (open && currentLead?._id) {
      fetchActivities(
        currentLead._id
      );
    }
  }, [open, currentLead?._id]);

  if (!currentLead)
    return null;

  // Handle status updates

  const handleStatusUpdated = (
    newLead
  ) => {
    setUpdatedLead(newLead);
    fetchActivities(newLead._id);
  };

  // Handle notes updates

  const handleNoteAdded = (
    newLead
  ) => {
    setUpdatedLead(newLead);
    fetchActivities(newLead._id);
  };

  const handleTasksUpdated = (
  newLead
) => {
  setUpdatedLead(newLead);
  fetchActivities(newLead._id);
};

  return (
    <Drawer
      open={open}
      onClose={() => {
        setUpdatedLead(null);

        onClose();
      }}
      title="Lead Details"
    >
      {/* Header */}

      <div className="mb-8">
        <h3
          className="
          text-2xl
          font-bold
        "
        >
          {currentLead.name}
        </h3>

        <p
          className="
          text-slate-400
          mt-2
        "
        >
          {currentLead.email}
        </p>

        <div className="mt-4">
          <StatusBadge
            status={
              currentLead.status
            }
          />
        </div>
      </div>

      {/* Status Manager */}

      <LeadStatusManager
  lead={currentLead}
  onStatusUpdated={
    handleStatusUpdated
  }
/>

      <LeadInsights
        lead={currentLead}
      />

      {/* Information */}

      <div
        className="
        mt-8
        space-y-6
      "
      >
        <div>
          <p
            className="
            text-sm
            text-slate-400
            mb-1
          "
          >
            Phone
          </p>

          <p className="font-medium">
            {currentLead.phone ||
              "Not provided"}
          </p>
        </div>

        <div>
          <p
            className="
            text-sm
            text-slate-400
            mb-1
          "
          >
            Source
          </p>

          <p
            className="
            capitalize
            font-medium
          "
          >
            {currentLead.source}
          </p>
        </div>

        <div>
          <p
            className="
            text-sm
            text-slate-400
            mb-1
          "
          >
            Created At
          </p>

          <p className="font-medium">
            {new Date(
              currentLead.createdAt
            ).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Notes */}

      <LeadNotes
  lead={currentLead}
  onNoteAdded={
    handleNoteAdded
  }
/>

<LeadTasks
  lead={currentLead}
  onTasksUpdated={
    handleTasksUpdated
  }
/>

      <ActivityTimeline
        activities={activities}
        loading={activityLoading}
      />
    </Drawer>
  );
};

export default LeadDetailsDrawer;
