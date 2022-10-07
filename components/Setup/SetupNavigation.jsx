import { useRouter } from "next/router";
import {
  Button,
  Divider,
  Grid,
  Header,
  Icon,
  Search,
  Segment,
} from 'semantic-ui-react';

function SetupNavigation() {
  const router = useRouter();

  return (
    <Segment placeholder>
      <Grid columns={2} stackable textAlign='center'>
        <Divider vertical>Or</Divider>

        <Grid.Row verticalAlign='middle'>
          <Grid.Column>
            <Header icon>
              <Icon name='bars' />
              Manage Stacks
            </Header>
            <Button primary onClick={() => router.push("/stacks")}>Go</Button>
          </Grid.Column>

          <Grid.Column>
            <Header icon>
              <Icon name='student' />
              Add Flashcards
            </Header>
            <Button primary onClick={() => router.push("/import")}>Import</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default SetupNavigation;