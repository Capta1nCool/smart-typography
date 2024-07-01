(() => {
  // lib/plugin.js
  var plugin = {
    noteOption: {
      "Format note": {
        check: async function(app, noteUUID) {
          return true;
        },
        run: async function(app, noteUUID) {
          const replacements = {
            arrows: [
              { pattern: /<-/g, replacement: "\u2190" },
              { pattern: /->/g, replacement: "\u2192" }
            ],
            guillemets: [
              { pattern: /<</g, replacement: "\xAB" },
              { pattern: />>/g, replacement: "\xBB" }
            ],
            comparisons: [
              { pattern: /<=/g, replacement: "\u2264" },
              { pattern: />=/g, replacement: "\u2265" },
              { pattern: /\/=/g, replacement: "\u2260" }
            ],
            ellipsis: [
              { pattern: /\.\.\./g, replacement: "\u2026" }
            ]
          };
          let markdown = await app.getNoteContent({ uuid: noteUUID });
          Object.keys(replacements).forEach((category) => {
            replacements[category].forEach((item) => {
              markdown = markdown.replace(item.pattern, item.replacement);
            });
          });
          await app.replaceNoteContent({ uuid: noteUUID }, markdown);
        }
      }
    }
  };
  var plugin_default = plugin;
})();
