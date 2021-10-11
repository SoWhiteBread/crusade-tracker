import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const listsAdapter = createEntityAdapter();

const initialState = listsAdapter.getInitialState();

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    saveList: listsAdapter.upsertOne,
    deleteList: listsAdapter.removeOne,
    updateList: listsAdapter.updateOne,
  }
})

export const { saveList, deleteList, updateList } = listsSlice.actions;

export default listsSlice.reducer;

export const { selectAll: selectLists, selectById: selectListById, } = listsAdapter.getSelectors((state) => state.lists)
export const selectListIds = createSelector(
  selectLists, (lists) => lists.map((list) => list.id)
);

