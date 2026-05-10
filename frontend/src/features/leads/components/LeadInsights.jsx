import {
  useEffect,
  useState,
} from "react";

import {
  Copy,
  Sparkles,
} from "lucide-react";

import toast from "react-hot-toast";

import {
  getLeadInsights,
} from "../services/lead.service";

const scoreStyles = {
  hot: "bg-red-500/10 text-red-700",
  warm: "bg-amber-500/10 text-amber-300",
  cold: "bg-white/10 text-slate-400",
};

const LeadInsights = ({ lead }) => {
  const [
    insights,
    setInsights,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!lead?._id) return;

      try {
        setLoading(true);
        const data =
          await getLeadInsights(
            lead._id
          );
        setInsights(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInsights();
  }, [
    lead?._id,
    lead?.status,
    lead?.notes?.length,
    lead?.tasks?.length,
  ]);

  const copyReply = async () => {
    if (!insights?.replyDraft) return;

    await navigator.clipboard.writeText(
      insights.replyDraft
    );
    toast.success("Reply copied");
  };

  return (
    <div
      className="
      mt-8
      border
      border-white/10
      rounded-2xl
      p-5
      bg-[#0A0A0F]
    "
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <h4 className="text-lg font-semibold">
            AI Insights
          </h4>
        </div>

        {insights && (
          <span
            className={`
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
            ${
              scoreStyles[
                insights.scoreLabel
              ]
            }
          `}
          >
            {insights.score}/100
          </span>
        )}
      </div>

      {loading ? (
        <p className="mt-4 text-sm text-slate-400">
          Generating insights...
        </p>
      ) : !insights ? (
        <p className="mt-4 text-sm text-slate-400">
          Insights unavailable.
        </p>
      ) : (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-400">
            {insights.summary}
          </p>

          <div>
            <p className="text-sm font-medium mb-2">
              Suggested next steps
            </p>
            <div className="space-y-2">
              {insights.suggestions.map(
                (suggestion) => (
                  <div
                    key={suggestion}
                    className="
                    bg-[#030014]
                    border
                    border-white/5
                    rounded-xl
                    p-3
                    text-sm
                    text-slate-300
                  "
                  >
                    {suggestion}
                  </div>
                )
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium">
                Reply draft
              </p>

              <button
                onClick={copyReply}
                className="
                inline-flex
                items-center
                gap-1
                text-sm
                text-slate-400
                hover:text-white
              "
              >
                <Copy size={14} />
                Copy
              </button>
            </div>

            <p
              className="
              bg-[#030014]
              border
              border-white/5
              rounded-xl
              p-3
              text-sm
              text-slate-300
            "
            >
              {insights.replyDraft}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadInsights;
