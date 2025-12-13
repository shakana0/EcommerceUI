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
import {
  IconBulb,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconHeadphones,
  IconKeyboard,
} from "@tabler/icons-react";
import { ApiToggleBtn } from "../ui/apiToggleBtn";
import { BackButton } from "../ui/backButton";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const { isSignedIn } = useAuth();

  const navItems = [
    { name: "Home", link: "/" },
    { name: "Categories", link: "/categories" },
    ...(isSignedIn ? [{ name: "Profile", link: "/profile" }] : []),
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
          <div className="flex gap-4">
            <ApiToggleBtn />
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
                label: "Gaming Computers",
                href: "/categories/gaming-computers",
                icon: <IconDeviceDesktop />,
              }}
            />
            <SidebarLink
              link={{
                label: "Headphones & Audio",
                href: "/categories/headphones-audio",
                icon: <IconHeadphones />,
              }}
            />
            <SidebarLink
              link={{
                label: "Smart Home Devices",
                href: "/categories/smart-home-devices",
                icon: <IconBulb />,
              }}
            />
            <SidebarLink
              link={{
                label: "Mobile Accessories",
                href: "/categories/mobile-accessories",
                icon: <IconDeviceMobile />,
              }}
            />
            <SidebarLink
              link={{
                label: "Computer Peripherals",
                href: "/categories/computer-peripherals",
                icon: <IconKeyboard />,
              }}
            />
          </SidebarBody>
        </Sidebar>

        {/* Main content */}
        <main className="flex-1 p-6 pt-10">
          <BackButton />

          <Outlet />
        </main>
      </div>
    </div>
  );
}
