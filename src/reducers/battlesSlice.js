import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { selectListById } from './listsSlice';

const battlesAdapter = createEntityAdapter();

const initialState = battlesAdapter.getInitialState();

const battlesSlice = createSlice({
  name: 'battles',
  initialState,
  reducers: {
    saveBattle: battlesAdapter.upsertOne,
    deleteBattle: battlesAdapter.removeOne,
    deleteManyBattles: battlesAdapter.removeMany,
  }
})

export const { saveBattle, deleteBattle, deleteManyBattles } = battlesSlice.actions;

export default battlesSlice.reducer;

export const { selectAll: selectBattles, selectById: selectBattleById, } = battlesAdapter.getSelectors((state) => state.battles)
export const selectBattleIds = createSelector(
  selectBattles, (battles) => battles.map((battle) => battle.id)
);

export const selectBattlesByList = createSelector(
  selectBattles, selectListById, (battle, list) => { return battle.filter((battle) => battle.list === list.id)}
);
export const selectFilteredBattleIds = createSelector(
  selectBattlesByList, (filteredBattles) => filteredBattles.map((battle) => battle.id)
)