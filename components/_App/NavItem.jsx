import Link from "next/link";
import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

function NavItem({ label, route }) {
  const router = useRouter();

  function isActive(route) {
    return router.pathname === route;
  }

  return (
    <Link href={route}>
      <Menu.Item active={isActive(route)}>
        {label}
      </Menu.Item>
    </Link>
  )
}

export default NavItem;