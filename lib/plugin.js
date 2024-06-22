import formatNote from "./modules/formatNote";

const plugin = {

  constants: {
  },

  insertText: {
  },

  // --------------------------------------------------------------------------
  // https://www.amplenote.com/help/developing_amplenote_plugins#noteOption
  noteOption: {
    "Format note": {
      check: async function (app, noteUUID) {
        return true;
      },
      run: async function (app, noteUUID) {
        const markdown = await app.getNoteContent({ uuid: noteUUID });

        const doubleQuotePattern = /""(.*?)""/g;
        let op = markdown.replace(doubleQuotePattern, (match, p1) => `“${p1}”`);

        app.alert(op)
      }
    }
  },
};
export default plugin;
