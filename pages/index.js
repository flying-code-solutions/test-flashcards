import { Button, Header, Container, List } from "semantic-ui-react";

export default function Home() {
  return <>
    <Container fluid textAlign="center">
      <Header as="h1" content="Flashcards - a Free Learning App" />
      <Container textAlign="left">
        <p>Studying for a test or just reviewing concepts in whatever field you're trying to master? Use Flashcards:</p>
        <List bulleted>
          <List.Item>Import flashcards from Excel files or create them in the app, then store them in Stacks</List.Item>
          <List.Item>Easily review key words/concepts</List.Item>
          <List.Item>It's free!</List.Item>
        </List>
      </Container>
      <Button
        color="purple"
        content="Sign Up"
        icon="signup"
      />
      <Button
        secondary
        content="Log In"
        icon="sign in"
      />
    </Container>
  </>;
}
