const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// Add the state
code = code.replace(
  'const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);',
  'const [isDataMenuOpen, setIsDataMenuOpen] = useState(false);\n  const [isArchivedCollapsed, setIsArchivedCollapsed] = useState(false);'
);

// Update the rendering of the section
const oldSection = `{archivedTracks.length > 0 && (
              <section>
                <h2 className="text-2xl font-display text-zinc-900 dark:text-white mb-6 flex items-center space-x-3">
                  <span>Completed</span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-full font-sans">{archivedTracks.length}</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">`;

const newSection = `{archivedTracks.length > 0 && (
              <section>
                <div 
                  className="flex items-center space-x-3 mb-6 cursor-pointer group w-fit" 
                  onClick={() => setIsArchivedCollapsed(!isArchivedCollapsed)}
                >
                  <h2 className="text-2xl font-display text-zinc-900 dark:text-white flex items-center space-x-3 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                    <span>Archived</span>
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs px-2.5 py-1 rounded-full font-sans">{archivedTracks.length}</span>
                  </h2>
                  <ChevronDown size={24} className={\`text-zinc-400 transition-transform duration-300 \${isArchivedCollapsed ? '-rotate-90' : ''}\`} />
                </div>
                
                <AnimatePresence initial={false}>
                  {!isArchivedCollapsed && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">`;

code = code.replace(oldSection, newSection);

const oldSectionEnd = `                  ))}
                </div>
              </section>
            )}`;

const newSectionEnd = `                  ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>
            )}`;

code = code.replace(oldSectionEnd, newSectionEnd);

fs.writeFileSync('src/App.tsx', code);
