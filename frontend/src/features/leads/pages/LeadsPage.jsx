import {
  useEffect,
  useState,
} from "react";

import {
  Plus,
} from "lucide-react";

import DashboardLayout
  from "../../../layouts/DashboardLayout";

import PageHeader
  from "../../../components/layout/PageHeader";

import LeadsTable
  from "../components/LeadsTable";

import AddLeadModal
  from "../components/AddLeadModal";

import LeadsToolbar
  from "../components/LeadsToolbar";

import LeadDetailsDrawer
  from "../components/LeadDetailsDrawer";

import {
  getLeads,
} from "../services/lead.service";

const LeadsPage = () => {
  const [leads, setLeads] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  // Modal State

  const [openModal, setOpenModal] =
    useState(false);

  // Drawer State

  const [
    selectedLead,
    setSelectedLead,
  ] = useState(null);

  const [openDrawer, setOpenDrawer] =
    useState(false);

  // Search & Filter State

  const [search, setSearch] =
    useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("");

  // Sorting State

  const [sortBy, setSortBy] =
    useState("newest");

  // Fetch Leads

  useEffect(() => {
    const fetchLeads =
      async () => {
        try {
          const data =
            await getLeads();

          setLeads(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    fetchLeads();
  }, []);

  // Handle New Lead

  const handleLeadCreated = (
    lead
  ) => {
    setLeads((prev) => [
      lead,
      ...prev,
    ]);
  };

  // Handle Lead Click

  const handleLeadClick = (
    lead
  ) => {
    setSelectedLead(lead);

    setOpenDrawer(true);
  };

  // Filter Leads

  const filteredLeads =
    leads.filter((lead) => {
      const matchesSearch =
        lead.name
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        lead.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter
          ? lead.status ===
            statusFilter
          : true;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  // Sort Leads

  const sortedLeads = [
    ...filteredLeads,
  ].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(
            a.createdAt
          ) -
          new Date(
            b.createdAt
          )
        );

      case "a-z":
        return a.name.localeCompare(
          b.name
        );

      case "z-a":
        return b.name.localeCompare(
          a.name
        );

      case "newest":
      default:
        return (
          new Date(
            b.createdAt
          ) -
          new Date(
            a.createdAt
          )
        );
    }
  });

  return (
    <DashboardLayout>
      {/* Header */}

      <PageHeader
        title="Leads"
        description="Manage and track your customer leads"
        action={
          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="
            flex
            items-center
            gap-2
            bg-black
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            hover:opacity-90
            transition-all
          "
          >
            <Plus size={18} />

            Add Lead
          </button>
        }
      />

      {/* Toolbar */}

      <LeadsToolbar
        search={search}
        setSearch={setSearch}
        statusFilter={
          statusFilter
        }
        setStatusFilter={
          setStatusFilter
        }
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Content */}

      {loading ? (
        <div
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-10
          text-center
        "
        >
          Loading leads...
        </div>
      ) : sortedLeads.length ===
        0 ? (
        <div
          className="
          bg-white
          border
          border-slate-200
          rounded-2xl
          p-10
          text-center
        "
        >
          <h3
            className="
            text-xl
            font-semibold
          "
          >
            {search ||
            statusFilter
              ? "No matching leads"
              : "No leads yet"}
          </h3>

          <p
            className="
            text-slate-500
            mt-2
          "
          >
            {search ||
            statusFilter
              ? "Try adjusting your filters."
              : "Start by adding your first lead."}
          </p>

          {!search &&
            !statusFilter && (
              <button
                onClick={() =>
                  setOpenModal(
                    true
                  )
                }
                className="
                mt-6
                inline-flex
                items-center
                gap-2
                bg-black
                text-white
                px-5
                py-3
                rounded-xl
                font-medium
              "
              >
                <Plus size={18} />

                Add First Lead
              </button>
            )}
        </div>
      ) : (
        <LeadsTable
          leads={sortedLeads}
          onLeadClick={
            handleLeadClick
          }
        />
      )}

      {/* Add Lead Modal */}

      <AddLeadModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        onLeadCreated={
          handleLeadCreated
        }
      />

      {/* Lead Details Drawer */}

      <LeadDetailsDrawer
        open={openDrawer}
        onClose={() =>
          setOpenDrawer(false)
        }
        lead={selectedLead}
      />
    </DashboardLayout>
  );
};

export default LeadsPage;