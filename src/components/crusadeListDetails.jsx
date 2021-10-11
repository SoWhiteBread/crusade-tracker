import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Label, Popup, List } from 'semantic-ui-react';
import { selectListById, deleteList } from '../reducers/listsSlice';
import { deleteManyUnits, selectFilteredUnitIds } from '../reducers/unitsSlice';
import { editList } from '../reducers/pagesSlice';

const CrusadeListDetails = ({ listId }) => {
  const list = useSelector((state) => selectListById(state, listId))
  const { playerName, forceName, faction, supplyTotal, id, crusadeTotal } = list
  const unitIds = useSelector((state) => selectFilteredUnitIds(state, listId))
  const suffix = unitIds.length === 1 ? '' : 's';

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteManyUnits(unitIds))
    dispatch(deleteList(id))
  }
  const loadList = () => {
    dispatch(editList({ page: 'MAIN', currentListId: id }))
  }

  return (
    <Card raised>
      <Card.Content>
        <Card.Header textAlign='left' content={forceName} />
        <Card.Meta textAlign='left' content={playerName} />
        <Card.Description textAlign='left'>{faction} Force</Card.Description>
      </Card.Content>
      <Card.Content textAlign='left' extra>
        <List>
          <List.Item>
            <Label>Power Rating:
              <Label.Detail>{supplyTotal}</Label.Detail>
            </Label>
          </List.Item>
          <List.Item>
            <Label>Unit{suffix}
              <Label.Detail>{unitIds.length}</Label.Detail>
            </Label>
          </List.Item>
          <List.Item>
            <Label>Crusade Points:
              <Label.Detail>{crusadeTotal}</Label.Detail>
            </Label>
          </List.Item>
        </List>
      </Card.Content>
      <Card.Content>
        <Button.Group fluid widths='2'>
          <Button icon='edit' content='Edit' onClick={loadList} />
          <Popup
            size='tiny'
            position='top center'
            on='click'
            content={<Button size='small' compact negative onClick={handleDelete}>Confirm Delete</Button>}
            trigger={<Button content='Delete' negative icon='delete' />} />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default CrusadeListDetails;