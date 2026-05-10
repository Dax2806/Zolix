import { Link } from "react-router-dom";
import { ArrowRight, Zap, Users, Brain, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: <Users className="text-white" size={24} />,
    color: "from-blue-500 to-indigo-600",
    title: "Smart Lead Management",
    desc: "Capture, organize, and track every lead. Our intuitive interface ensures no opportunity ever falls through the cracks."
  },
  {
    icon: <Brain className="text-white" size={24} />,
    color: "from-purple-500 to-pink-600",
    title: "AI-Powered Insights",
    desc: "Leverage artificial intelligence to analyze lead sentiment, score opportunities, and suggest the exact next steps."
  },
  {
    icon: <Zap className="text-white" size={24} />,
    color: "from-amber-400 to-orange-500",
    title: "Workflow Automations",
    desc: "Put your busywork on autopilot. Automatically create tasks and send personalized emails when lead statuses change."
  },
  {
    icon: <BarChart3 className="text-white" size={24} />,
    color: "from-emerald-400 to-teal-500",
    title: "Real-time Analytics",
    desc: "Make data-driven decisions with real-time dashboards showing your conversion rates, pipeline value, and team performance."
  },
  {
    icon: <Users className="text-white" size={24} />,
    color: "from-rose-400 to-red-500",
    title: "Team Collaboration",
    desc: "Work together seamlessly. Assign leads, share notes, and use built-in chat spaces to close deals as a unified team."
  },
  {
    icon: <Shield className="text-white" size={24} />,
    color: "from-slate-600 to-slate-800",
    title: "Enterprise Security",
    desc: "Bank-grade security with role-based access control (RBAC), secure authentication, and encrypted data storage."
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-slate-300 font-sans selection:bg-indigo-500 selection:text-white relative">
      {/* Abstract Backgrounds */}
      <div className="fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030014]/50 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.4)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Zolix</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                Log in
              </Link>
              <Link to="/register" className="text-sm font-medium bg-white text-black px-5 py-2.5 rounded-full hover:bg-slate-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Start Free Trial
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 overflow-hidden relative">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Zolix CRM 2.0 is now live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-8">
              Manage leads. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Close deals faster.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              The intelligent CRM built for modern teams. Automate your workflows, collaborate seamlessly, and let AI uncover your best opportunities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-[0_0_30px_rgba(99,102,241,0.4)]">
                Get Started Now <ArrowRight size={20} />
              </Link>
              <Link to="/login" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors backdrop-blur-md">
                Sign in to Workspace
              </Link>
            </div>
          </div>

          {/* Dashboard Preview mockup */}
          <div className="max-w-6xl mx-auto mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10"></div>
            <div className="bg-[#0A0A0F]/80 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transform perspective-1000 rotate-x-2 scale-95 hover:scale-100 transition-transform duration-700 ease-out">
              <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="p-8 grid grid-cols-4 gap-6 opacity-60 pointer-events-none">
                 <div className="col-span-1 space-y-4">
                   <div className="h-8 bg-white/5 rounded-lg w-full"></div>
                   <div className="h-8 bg-white/5 rounded-lg w-3/4"></div>
                   <div className="h-8 bg-white/5 rounded-lg w-5/6"></div>
                 </div>
                 <div className="col-span-3 space-y-6">
                   <div className="flex gap-4">
                     <div className="h-32 bg-indigo-500/10 rounded-xl w-1/3 border border-indigo-500/20"></div>
                     <div className="h-32 bg-emerald-500/10 rounded-xl w-1/3 border border-emerald-500/20"></div>
                     <div className="h-32 bg-amber-500/10 rounded-xl w-1/3 border border-amber-500/20"></div>
                   </div>
                   <div className="h-64 bg-white/5 rounded-xl w-full border border-white/5"></div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 relative z-10">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold tracking-tight text-white mb-6">Everything you need to scale</h2>
              <p className="text-lg text-slate-400">Stop juggling spreadsheets. Zolix provides a unified workspace for your entire revenue team to operate at peak efficiency.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${feature.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 text-slate-500 text-center border-t border-white/5 mt-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Zolix</span>
          </div>
          <p>© {new Date().getFullYear()} Zolix CRM. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};
export default LandingPage;
