const plugin = {
  noteOption: {
    "Format note": {
      check: async function (app, noteUUID) {
        return true;
      },
      run: async function (app, noteUUID) {
        const replacements = {
          arrows: [
            { pattern: /<-/g, replacement: '←' },
            { pattern: /->/g, replacement: '→' }
          ],
          guillemets: [
            { pattern: /<</g, replacement: '«' },
            { pattern: />>/g, replacement: '»' }
          ],
          comparisons: [
            { pattern: /<=/g, replacement: '≤' },
            { pattern: />=/g, replacement: '≥' },
            { pattern: /\/=/g, replacement: '≠' }
          ],
          ellipsis: [
            { pattern: /\.\.\./g, replacement: '…' }
          ]
        };

        let markdown = await app.getNoteContent({ uuid: noteUUID });

        Object.keys(replacements).forEach(category => {
          replacements[category].forEach(item => {
            markdown = markdown.replace(item.pattern, item.replacement)
          });
        });

        await app.replaceNoteContent({ uuid: noteUUID }, markdown);
      }
    }
  },
};
export default plugin;
