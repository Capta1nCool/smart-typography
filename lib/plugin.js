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
        const noteContent = await app.getNoteContent({ uuid: noteUUID });

        // This note option is ONLY shown when the note contains the word "cool"
        return /cool/i.test(noteContent.toLowerCase());
      },
      run: async function (app, noteUUID) {
        const markdown = await app.getNoteContent({ uuid: noteUUID });

        let op = formatNote(markdown)
        app.alert(op)
      }
    }
  },
};
export default plugin;
