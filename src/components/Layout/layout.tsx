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
  useAuth,
  UserButton,
} from "@clerk/clerk-react";
import { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import { IconMenu2 } from "@tabler/icons-react";
import { ApiToggleBtn } from "../ui/apiToggleBtn";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const { isSignedIn } = useAuth();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    ...(isSignedIn ? [{ name: "Profile", link: "/profile" }] : []), // 🔒 lägg till bara om SignedIn
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground text-black dark:bg-black dark:text-white">
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <Link to="/" className="text-xl font-bold">
            ProductCatalog
          </Link>
          <NavItems items={navItems} />
          <ApiToggleBtn />
          <div className="flex gap-4">
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
            <a href="/">Home</a>
            <a href="/categories">Categories</a>
            <SignedIn>
              <a href="/profile">Profile</a>
            </SignedIn>
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
        <Sidebar className="hidden md:flex">
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
