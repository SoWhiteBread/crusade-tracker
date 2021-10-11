import { createSlice, createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { selectListById } from './listsSlice';

const requisitionsAdapter = createEntityAdapter();

const initialState = requisitionsAdapter.getInitialState();

const requisitionsSlice = createSlice({
  name: 'requisitions',
  initialState,
  reducers: {
    saveRequisition: requisitionsAdapter.upsertOne,
    deleteRequisition: requisitionsAdapter.removeOne,
    deleteManyRequisitions: requisitionsAdapter.removeMany,
  }
})

export const { saveRequisition, deleteRequisition, deleteManyRequisitions } = requisitionsSlice.actions;

export default requisitionsSlice.reducer;

export const { selectAll: selectRequisitions, selectById: selectRequisitionById, } = requisitionsAdapter.getSelectors((state) => state.requisitions)
export const selectrequisitionIds = createSelector(
  selectRequisitions, (requisitions) => requisitions.map((requisition) => requisition.id)
);

export const selectRequisitionsByList = createSelector(
  selectRequisitions, selectListById, (req, list) => { return req.filter((req) => req.list === list.id)}
);

export const selectFilteredRequisitionIds = createSelector(
  selectRequisitionsByList, (filteredReqs) => filteredReqs.map((req) => req.id)
)