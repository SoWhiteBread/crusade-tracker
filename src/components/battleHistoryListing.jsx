import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Header, Image, Grid, Container } from 'semantic-ui-react';
import { selectListById } from '../reducers/listsSlice';
import { startCase } from 'lodash'

const image = require(`../svgs/swords.svg`).default

const BattleHistoryListing = ({battle}) => {
  const playerOneList = useSelector((state) => selectListById(state, battle.playerOneListId))
  const playerTwoList = useSelector((state) => selectListById(state, battle.playerTwoListId))

  return (
    <Card raised>
          <Card.Content>
            <Card.Header>{battle.battleName}</Card.Header>
            <Card.Meta>{battle.battleDate}</Card.Meta>
          </Card.Content>
          <Card.Content>
            <Grid>
              <Grid.Row columns='equal' verticalAlign='middle'>
                <Grid.Column>
                  <Header content={battle.playerOneListName} subheader={playerOneList ? playerOneList.playerName : ''} />
                  <p>{playerOneList ? playerOneList.faction : ''}</p>
                </Grid.Column>
                <Grid.Column><Image src={image} size='mini' /></Grid.Column>
                <Grid.Column>
                  <Header>{battle.playerTwoTracked ? battle.playerTwoListName : 'Unknown Foe'}
                  <Header.Subheader>{battle.playerTwoTracked && playerTwoList ? playerTwoList.playerName : ''}</Header.Subheader></Header>
                  <p>{battle.playerTwoTracked && playerTwoList ? playerTwoList.faction : ''}</p>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Card.Content>
          <Card.Content>
            <Grid>
              <Grid.Row columns='equal' verticalAlign='top'>
                <Grid.Column>
                  <Header>Battle Size</Header>
                  <p>{startCase(battle.battleSize)}</p>
                </Grid.Column>
                <Grid.Column>
                  <Header>Mission</Header>
                  <p>{battle.mission}</p>
                </Grid.Column>
                <Grid.Column>
                  <Header>Victor</Header>
                  <p>{battle.winner === 'playerOne' ? battle.playerOneListName : battle.playerTwoListName}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns='equal'>
                <Grid.Column>
                  <Header>{battle.playerOneListName} Victory Points</Header>
                  <p>{battle.playerOneVP}</p>
                </Grid.Column>
                <Grid.Column>
                  <Header>{battle.playerTwoTracked ? battle.playerTwoListName : 'Unknown Foe'} Victory Points</Header>
                  <p>{battle.playerTwoVP}</p>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Container text>
                  <p>{battle.gameNotes}</p>
                </Container>
              </Grid.Row>
            </Grid>
          </Card.Content>
        </Card>
  )
}

export default BattleHistoryListing