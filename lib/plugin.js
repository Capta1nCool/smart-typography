const plugin = {
  noteOption: {
    "Format note": {
      check: async function (app, noteUUID) {
        return true;
      },
      run: async function (app, noteUUID) {
        const markdown = await app.getNoteContent({ uuid: noteUUID });

        let regex = /(<-|->)/g;

        let outputString = markdown.replace(regex, (match) => {
          switch (match) {
            case '->':
              return '→';
            case '<-':
              return '←';
            default:
              return match;
          }
        });

        // Replace '<<' with '«' and '>>' with '»'
        regex = /(?:<<)|(?:>>)/g;

        outputString = outputString.replace(regex, (match) => {
          switch (match) {
            case '<<':
              return '«';
            case '>>':
              return '»';
            default:
              return match;
          }
        });

        // Replace comparison sign
        regex = /<=|>=|\/=/g;

        outputString = outputString.replace(regex, (match) => {
          switch (match) {
            case '<=':
              return '≤';
            case '>=':
              return '≥';
            case '/=':
              return '≠';
            default:
              return match;
          }
        });

        // Replace elipses
        outputString = outputString.replace(/\.\.\./g, '…');

        await app.replaceNoteContent({ uuid: noteUUID }, outputString);
      }
    }
  },
};
export default plugin;
