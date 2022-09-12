import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from 'semantic-ui-react';

function Setup() {
  return (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='bars' />
              Set Up a New Stack
            </Header>
            <Button primary>Create</Button>
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name='student' />
              Add to Existing Stack
            </Header>
            <Button primary>Import</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Setup;