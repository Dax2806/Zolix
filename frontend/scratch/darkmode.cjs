const fs = require('fs');
const path = require('path');

const map = {
  'bg-slate-50': 'bg-[#030014]',
  'bg-white': 'bg-[#0A0A0F]',
  'text-slate-900': 'text-white',
  'text-slate-800': 'text-slate-200',
  'text-slate-700': 'text-slate-300',
  'text-slate-600': 'text-slate-400',
  'text-slate-500': 'text-slate-400',
  'border-slate-200': 'border-white/10',
  'border-slate-100': 'border-white/5',
  'bg-slate-100': 'bg-white/10',
  'bg-slate-200': 'bg-white/20',
  'hover:bg-slate-50': 'hover:bg-white/5',
  'hover:bg-slate-100': 'hover:bg-white/10',
  'hover:bg-slate-200': 'hover:bg-white/20',
  'bg-indigo-50': 'bg-indigo-500/10',
  'text-indigo-700': 'text-indigo-300',
  'border-indigo-100': 'border-indigo-500/20',
  'bg-emerald-50': 'bg-emerald-500/10',
  'text-emerald-700': 'text-emerald-300',
  'border-emerald-100': 'border-emerald-500/20',
  'bg-amber-50': 'bg-amber-500/10',
  'text-amber-700': 'text-amber-300',
  'border-amber-100': 'border-amber-500/20',
  'bg-red-50': 'bg-red-500/10',
  'text-red-600': 'text-red-400',
  'border-red-100': 'border-red-500/20',
  'divide-slate-200': 'divide-white/10',
  'divide-slate-100': 'divide-white/5',
  'ring-slate-200': 'ring-white/10',
  'shadow-sm': 'shadow-[0_0_15px_rgba(0,0,0,0.5)]',
  'text-black': 'text-white'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js')) {
      if (fullPath.includes('LandingPage.jsx')) continue;
      
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      // Make sure we only replace exact word matches for tailwind classes to avoid partial matches
      for (const [key, value] of Object.entries(map)) {
        // Regex to match whole word boundaries for the classes
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        if (regex.test(content)) {
          content = content.replace(regex, value);
          changed = true;
        }
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(__dirname, '../src'));
