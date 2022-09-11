import Link from "next/link";
import { useRouter } from "next/router";
import { Container, Menu } from "semantic-ui-react";

import NavItem from "./NavItem";

function Header() {
  const user = false;

  return (
    <Menu fluid id="menu" inverted stackable>
      <Container text>
        <Link href="/">
          <Menu.Item header>Flashcards</Menu.Item>
        </Link>
        <NavItem label="Practice" route="/practice" />
        <NavItem label="Setup" route="/setup" />
        <Menu.Menu position="right">
          {user
            ? (
              <NavItem label="Account" route="/account" />
            )
            : (
              <>
                <NavItem label="Log In" route="/login" />
                <NavItem label="Sign Up" route="/signup" />
              </>
            )
          }
        </Menu.Menu>
      </Container>
    </Menu>
  );
}

export default Header;