import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import notesData from "@/data/notes.json";
import { Note } from "@prisma/client";
import { db } from "@/lib/db";
export interface NotesState {
  notes: Note[];
}

const initialState: NotesState = {
  notes: notesData,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
    },
    // setStartupPokemon: (state, action: PayloadAction<Pokemon[]>) => {
    //   state.startupPokemon = action.payload
    // },
  },
});

export const { setNotes } = notesSlice.actions;
export default notesSlice.reducer;
