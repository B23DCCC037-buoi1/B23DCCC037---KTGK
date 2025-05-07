import { Note } from "@/models/Note/note";

const STORAGE_KEY = "notes";

export const noteService = {
  getNotes(): Note[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveNotes(notes: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  },

  addNote(note: Note) {
    const notes = this.getNotes();
    notes.push(note);
    this.saveNotes(notes);
  },

  updateNote(updatedNote: Note) {
    const notes = this.getNotes().map(note => note.id === updatedNote.id ? updatedNote : note);
    this.saveNotes(notes);
  },

  deleteNote(id: string) {
    const notes = this.getNotes().filter(note => note.id !== id);
    this.saveNotes(notes);
  }
};
