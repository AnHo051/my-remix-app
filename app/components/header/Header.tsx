import { Form, Link, NavLink, useLoaderData } from "@remix-run/react";
import Logo from "../../images/Logo.png";
import MenuIcon from "../../images/menu.svg";
import Button from "../button/Button";
import SideBar from "./SideBar/SideBar";
import { useState } from "react";

export interface NavItemDataType {
  name: string;
  link: string;
}

const Mock_Header_Data: NavItemDataType[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Analyse",
    link: "/analyse",
  },
  {
    name: "Wallet",
    link: "/wallet",
  },
];

export default function Header() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const userId = useLoaderData();

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-center bg-light-blue py-5 font-bold text-primary">
      <div className="flex w-11/12 items-center justify-between">
        <NavLink to="/">
          <img src={Logo} alt="logo" className="h-auto w-32 lg:w-40" />
        </NavLink>
        <div className="hidden items-center justify-center gap-12 text-3xl lg:flex">
          {Mock_Header_Data.map((item, index) => (
            <NavLink to={item.link} key={index}>
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          {userId ? (
            <Form method="post" action="/logout" id="logout-form">
              <Button className="min-w-28 lg:min-w-32" type="submit">
                Logout
              </Button>
            </Form>
          ) : (
            <Link to="/auth?mode=login">
              <Button className="min-w-28 lg:min-w-32">Login</Button>
            </Link>
          )}

          <div className="block lg:hidden">
            <img
              src={MenuIcon}
              alt="menu"
              className="h-8 w-8"
              onClick={() => setOpenSideBar(true)}
              aria-hidden="true"
              
            />
            {openSideBar && (
              <SideBar
                data={Mock_Header_Data}
                onClose={() => setOpenSideBar(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
