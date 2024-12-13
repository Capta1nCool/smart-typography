import { mockAppWithContent } from "./test-helpers";
import plugin from "./plugin";

describe("Format Note Plugin", () => {
  const formatNote = plugin.noteOption["Format note"];

  it("should replace arrows with Unicode equivalents", async () => {
    const { app, note } = mockAppWithContent("Arrow test: <- and ->");
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe("Arrow test: ← and →");
  });

  it("should replace guillemets with Unicode equivalents", async () => {
    const { app, note } = mockAppWithContent("Guillemets test: << and >>");
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe("Guillemets test: « and »");
  });

  it("should replace comparison operators with Unicode equivalents", async () => {
    const { app, note } = mockAppWithContent("Comparisons test: <=, >=, /=");
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe("Comparisons test: ≤, ≥, ≠");
  });

  it("should replace ellipsis with Unicode equivalent", async () => {
    const { app, note } = mockAppWithContent("Ellipsis test: ...");
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe("Ellipsis test: …");
  });

  it("should replace fractions with Unicode equivalents", async () => {
    const { app, note } = mockAppWithContent("Fractions test: 1/2, 3/4, 5/6");
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe("Fractions test: ½, ¾, ⅚");
  });

  it("should replace straight quotes with smart quotes", async () => {
    const { app, note } = mockAppWithContent(`Quotes test: "Double quotes" and 'single quotes'`);
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe(`Quotes test: “Double quotes” and ‘single quotes’`);
  });

  it("should perform multiple replacements in a single run", async () => {
    const { app, note } = mockAppWithContent(`All tests: <-, ->, <<, >>, ..., "quotes"`);
    await formatNote.run(app, note.uuid);
    expect(note.body).toBe(`All tests: ←, →, «, », …, “quotes”`);
  });

  it("should call app.replaceNoteContent with the updated content", async () => {
    const { app, note } = mockAppWithContent("Simple test: <- ->");
    await formatNote.run(app, note.uuid);
    expect(app.replaceNoteContent).toHaveBeenCalledWith(
      { uuid: note.uuid },
      "Simple test: ← →"
    );
  });
});
