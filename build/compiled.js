(() => {
  // lib/modules/formatNote.js
  function formatNote(markdown, options = {}) {
    const defaultOptions = {
      curlyDoubleQuotes: ["\u201C", "\u201D"],
      curlySingleQuotes: ["\u2018", "\u2019"],
      arrowRight: "\u2192",
      arrowLeft: "\u2190"
    };
    const config = { ...defaultOptions, ...options };
    const replacements = [
      {
        pattern: /""/g,
        replacement: (match, offset, string) => {
          const nextChar = string[offset + 2];
          return nextChar && /[a-zA-Z]/.test(nextChar) ? config.curlyDoubleQuotes[0] : config.curlyDoubleQuotes[1];
        }
      },
      {
        pattern: /''/g,
        replacement: (match, offset, string) => {
          const nextChar = string[offset + 2];
          return nextChar && /[a-zA-Z]/.test(nextChar) ? config.curlySingleQuotes[0] : config.curlySingleQuotes[1];
        }
      },
      { pattern: /\.\.\./g, replacement: "\u2026" },
      { pattern: /->/g, replacement: config.arrowRight },
      { pattern: /<-/g, replacement: config.arrowLeft },
      { pattern: /<</g, replacement: "\xAB" },
      { pattern: />>/g, replacement: "\xBB" }
    ];
    replacements.forEach(({ pattern, replacement }) => {
      markdown = markdown.replace(pattern, replacement);
    });
    return markdown;
  }

  // lib/plugin.js
  var plugin = {
    constants: {},
    insertText: {},
    // --------------------------------------------------------------------------
    // https://www.amplenote.com/help/developing_amplenote_plugins#noteOption
    noteOption: {
      "Format note": {
        check: async function(app, noteUUID) {
          const noteContent = await app.getNoteContent({ uuid: noteUUID });
          return /cool/i.test(noteContent.toLowerCase());
        },
        run: async function(app, noteUUID) {
          const markdown = await app.getNoteContent({ uuid: noteUUID });
          let op = formatNote(markdown);
          app.alert(op);
        }
      }
    }
  };
  var plugin_default = plugin;
})();
