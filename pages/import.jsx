import { Segment, Header, Icon, Button } from "semantic-ui-react";

function Import() {
    return (
        <Segment placeholder>
            <Header icon>
            <Icon name='pdf file outline' />
            Drop a file here.
            </Header>
            <Button primary>Search</Button>
        </Segment>
    );
}

export default Import;