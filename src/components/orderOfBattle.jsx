import React from 'react';
import { Segment, Header, Button, Card } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';
import UnitListing from './unitListing';
import { changePage } from '../reducers/pagesSlice';
import { selectFilteredUnitIds } from '../reducers/unitsSlice';
const style = {
  paddingBottom: 10
}


const OrderOfBattle = () => {
  const dispatch = useDispatch();
  const pageChange = () => {
    dispatch(changePage('ADD'))
  }
  const listId = useSelector((state) => state.pages.currentListId)
  const unitIds = useSelector((state) => selectFilteredUnitIds(state, listId))
  const suffix = unitIds.length === 1 ? '' : 's';
  return (
      <Segment>
        <Header>Crusade Cards ({unitIds.length} Unit{suffix})</Header>
        {unitIds.length > 0 && <Card.Group style={style} stackable itemsPerRow='4'>
          {unitIds.map((unit) => <UnitListing key={unit} id={unit} />)}
        </Card.Group>}
        <Button onClick={pageChange} content='Add New Unit' />
      </Segment>
  );
}


export default OrderOfBattle;