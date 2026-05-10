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
  bulkCreateLeads,
} from "../services/lead.service";
import Papa from "papaparse";
import toast from "react-hot-toast";

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

  const handleExportCSV = () => {
    if (sortedLeads.length === 0) return toast.error("No leads to export");
    const csv = Papa.unparse(sortedLeads.map(l => ({
      Name: l.name,
      Email: l.email,
      Phone: l.phone,
      Company: l.company,
      Status: l.status,
      Value: l.value,
      Score: l.score,
      CreatedAt: new Date(l.createdAt).toLocaleString()
    })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const newLeads = results.data.map(row => ({
            name: row.Name || row.name,
            email: row.Email || row.email,
            phone: row.Phone || row.phone,
            company: row.Company || row.company,
            status: row.Status || row.status || "new",
            value: Number(row.Value || row.value) || 0,
            score: Number(row.Score || row.score) || 0,
          })).filter(l => l.name);

          if (newLeads.length === 0) return toast.error("No valid leads found in CSV");
          
          setLoading(true);
          const importedLeads = await bulkCreateLeads(newLeads);
          setLeads(prev => [...importedLeads, ...prev]);
          toast.success(`Successfully imported ${importedLeads.length} leads`);
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to import leads");
        } finally {
          setLoading(false);
          e.target.value = null;
        }
      },
      error: () => {
        toast.error("Failed to parse CSV file");
      }
    });
  };

  return (
    <DashboardLayout>
      {/* Header */}

      <PageHeader
        title="Leads"
        description="Manage and track your customer leads"
        action={
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2 text-sm"
            >
              Export CSV
            </button>
            <label className="cursor-pointer px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-all flex items-center gap-2 text-sm">
              Import CSV
              <input type="file" accept=".csv" className="hidden" onChange={handleImportCSV} />
            </label>
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 bg-black text-white px-5 py-2 rounded-xl font-medium hover:opacity-90 transition-all text-sm"
            >
              <Plus size={18} /> Add Lead
            </button>
          </div>
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