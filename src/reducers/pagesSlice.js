import { createSlice } from "@reduxjs/toolkit";

const initialState = { page: 'FRONT', editId: '', currentListId: '', battle: '', help: true };

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    changePage(state, action) {
      state.page = action.payload
    },
    editUnit(state, action) {
      state.page = action.payload.page
      state.editId = action.payload.editId
    },
    editList(state, action) {
      state.page = action.payload.page
      state.currentListId = action.payload.currentListId
    },
    resolveBattle(state, action) {
      state.page = action.payload.page
      state.battle = action.payload.battle
    },
    toggleHelp(state, action) {
      state.help = !state.help
    }
  },
});

export const { changePage, editUnit, editList, resolveBattle, toggleHelp } = pagesSlice.actions;

export default pagesSlice.reducer