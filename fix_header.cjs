const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
  '<div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">',
  '<div className="max-w-5xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-2">'
);

code = code.replace(
  '<main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">',
  '<main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">'
);

code = code.replace(
  'className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink"',
  'className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group shrink overflow-hidden"'
);

code = code.replace(
  'className="flex items-center space-x-2 sm:space-x-4 shrink-0"',
  'className="flex items-center space-x-1.5 sm:space-x-4 shrink-0"'
);

code = code.replace(
  'className="h-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white px-3 sm:px-4 rounded-full transition-colors flex items-center justify-center gap-1.5 sm:gap-2 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 shrink-0"',
  'className="h-10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white w-10 sm:w-auto p-0 sm:px-4 rounded-full transition-colors flex items-center justify-center sm:gap-2 bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-800/50 shrink-0"'
);

code = code.replace(
  '<ChevronDown size={14} className={`transition-transform ${isDataMenuOpen ? \'rotate-180\' : \'\'}`} />',
  '<ChevronDown size={14} className={`hidden sm:block transition-transform ${isDataMenuOpen ? \'rotate-180\' : \'\'}`} />'
);

fs.writeFileSync('src/App.tsx', code);
