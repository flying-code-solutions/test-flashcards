import HeadContent from "./HeadContent";
import Header from "./Header";

function Layout({ children }) {
  return <>
    <HeadContent />
    <Header />
    {children}
  </>;
}

export default Layout;