import { Container } from "semantic-ui-react";

import HeadContent from "./HeadContent";
import Header from "./Header";

function Layout({ children }) {
  return <>
    <HeadContent />
    <Header />
    <Container text style={{ paddingTop: "1em" }}>
      {children}
    </Container>
  </>;
}

export default Layout;