import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { getUserFromSession } from "./data/auth.server";
import { LinksFunction, LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <div className="mt-[5.75rem]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "use-credentials",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
  }
];


export async function loader({ request }: LoaderFunctionArgs) {
  return getUserFromSession(request);
}

export const meta: MetaFunction = () => {
  return [
    { title: "RemixExpenses" },
    { name: "description", content: "Welcome to Remix Expense!" },
  ];
};
