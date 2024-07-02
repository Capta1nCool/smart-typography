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
            ],
            fractions: [
              { pattern: /1\/2/g, replacement: "\xBD" },
              { pattern: /1\/3/g, replacement: "\u2153" },
              { pattern: /2\/3/g, replacement: "\u2154" },
              { pattern: /1\/4/g, replacement: "\xBC" },
              { pattern: /3\/4/g, replacement: "\xBE" },
              { pattern: /1\/5/g, replacement: "\u2155" },
              { pattern: /2\/5/g, replacement: "\u2156" },
              { pattern: /3\/5/g, replacement: "\u2157" },
              { pattern: /4\/5/g, replacement: "\u2158" },
              { pattern: /1\/6/g, replacement: "\u2159" },
              { pattern: /5\/6/g, replacement: "\u215A" },
              { pattern: /1\/7/g, replacement: "\u2150" },
              { pattern: /1\/8/g, replacement: "\u215B" },
              { pattern: /3\/8/g, replacement: "\u215C" },
              { pattern: /5\/8/g, replacement: "\u215D" },
              { pattern: /7\/8/g, replacement: "\u215E" },
              { pattern: /1\/9/g, replacement: "\u2151" },
              { pattern: /1\/10/g, replacement: "\u2152" }
            ],
            dashes: [
              { pattern: /—-(?=.)/g, replacement: "---" },
              { pattern: /–-(?=.)/g, replacement: "\u2014" },
              { pattern: /--/g, replacement: "\u2013" }
            ]
          };
          function replaceQuotes(inputString) {
            let outputString = "";
            let doubleQuoteOpen = true;
            let singleQuoteOpen = true;
            for (let i = 0; i < inputString.length; i++) {
              const char = inputString[i];
              if (char === '"') {
                if (doubleQuoteOpen) {
                  outputString += "\u201C";
                } else {
                  outputString += "\u201D";
                }
                doubleQuoteOpen = !doubleQuoteOpen;
              } else if (char === "'") {
                if (singleQuoteOpen) {
                  outputString += "\u2018";
                } else {
                  outputString += "\u2019";
                }
                singleQuoteOpen = !singleQuoteOpen;
              } else {
                outputString += char;
              }
            }
            return outputString;
          }
          let markdown = await app.getNoteContent({ uuid: noteUUID });
          Object.keys(replacements).forEach((category) => {
            replacements[category].forEach((item) => {
              markdown = markdown.replace(item.pattern, item.replacement);
            });
          });
          markdown = replaceQuotes(markdown);
          await app.replaceNoteContent({ uuid: noteUUID }, markdown);
        }
      }
    }
  };
  var plugin_default = plugin;
})();
