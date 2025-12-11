import "../../index.css";
import { Link, Outlet } from "@tanstack/react-router";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "../ui/resizable-navbar";
import ThemeToggle from "./themeToggle";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { IconMenu2 } from "@tabler/icons-react";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground text-black dark:bg-black dark:text-white">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <Link to="/" className="text-xl font-bold">
            ProductCatalog
          </Link>
          <NavItems
            items={[
              { name: "Home", link: "/" },
              { name: "Profile", link: "/profile" },
              { name: "Categories", link: "/categories" },
            ]}
          />
          <div className="flex gap-4 items-end">
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </NavBody>

        {/* Mobile */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle isOpen={isOpen} onClick={toggleMenu} />
          </MobileNavHeader>
          <MobileNavMenu isOpen={isOpen} onClose={toggleMenu}>
            <a href="/catalog">Catalog</a>
            <a href="/profile">Profile</a>
            <a href="/cart">Cart</a>
            <ThemeToggle />
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <div className="flex flex-1">
        <Sidebar>
          <SidebarBody className="min-h-screen gap-6">
            <SidebarLink
              link={{
                label: "Fruits & Berries",
                href: "/categories/fruits",
                icon: <IconMenu2 />,
              }}
            />
            <SidebarLink
              link={{
                label: "Vegetables",
                href: "/categories/vegetables",
                icon: <IconMenu2 />,
              }}
            />
            <SidebarLink
              link={{
                label: "Dairy Products",
                href: "/categories/dairy",
                icon: <IconMenu2 />,
              }}
            />
            <SidebarLink
              link={{
                label: "Meat & Poultry",
                href: "/categories/meat",
                icon: <IconMenu2 />,
              }}
            />
            <SidebarLink
              link={{
                label: "Bakery & Bread",
                href: "/categories/bakery",
                icon: <IconMenu2 />,
              }}
            />
          </SidebarBody>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
