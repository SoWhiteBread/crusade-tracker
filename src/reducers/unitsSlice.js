import { createSlice, createSelector, createEntityAdapter } from '@reduxjs/toolkit';
import { selectListById } from './listsSlice';


const unitsAdapter = createEntityAdapter();

const initialState = unitsAdapter.getInitialState();

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    saveUnit: unitsAdapter.upsertOne,
    deleteUnit: unitsAdapter.removeOne,
    deleteManyUnits: unitsAdapter.removeMany,
    updateUnit: unitsAdapter.updateOne,
  }
})

export const { saveUnit, deleteUnit, deleteManyUnits, updateUnit } = unitsSlice.actions;

export default unitsSlice.reducer;

export const { selectAll: selectUnits, selectById: selectUnitById, } = unitsAdapter.getSelectors((state) => state.units);
export const selectUnitIds = createSelector(
  selectUnits, (units) => units.map((unit) => unit.id)
);

export const selectUnitsByList = createSelector(
  selectUnits, selectListById, (units, list) => { return units.filter((unit) => unit.list === list.id)}
);

export const selectFilteredUnitIds = createSelector(
  selectUnitsByList, (filteredUnits) => filteredUnits.map((unit) => unit.id)
)