"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Divider,
} from "@nextui-org/react";

export default function HeroSection() {
  const [isOpen, setIsOpen] = React.useState(false);
  const router = useRouter();
  const menuItems = [
    { title: "Trang chủ", href: "/" },
    { title: "Về chúng tôi", href: "/about-us-normal", hasSubmenu: true },
    { title: "Sản phẩm", href: "/products", hasSubmenu: true },
    { title: "Affiliate", href: "/affiliate" },
    { title: "Giỏ hàng", href: "/cart" },
  ];
  return (
    // <div className="bg-navbar-background">
    <Navbar
      onMenuOpenChange={setIsOpen}
      className="py-1 px-0 bg-navbar-background mini-laptop:border-b-8 laptop:border-b-8 desktop:border-b-8 border-[#D7A444]"
      maxWidth="xl"
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarBrand
          onClick={() => router.push("/")}
          className="hover:cursor-pointer"
        >
          <div>
            <Image
              src="/images/logo-image.png"
              alt="Đông Y Ông Bụt Logo"
              width={48}
              height={48}
              priority
              loading="eager"
              className="h-auto w-auto mobile:h-14 mobile:w-14 hover:scale-110 transition"
            />
          </div>
          <div className="ml-2">
            <div className="mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg text-text-brown-primary">
              Quán tâm an bệnh
            </div>
            <div className="mobile:text-md tablet:text-lg mini-laptop:text-lg laptop:text-xl desktop:text-xl font-semibold text-text-brown-primary">
              Đông Y Ông Bụt
            </div>
          </div>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="laptop:hidden desktop:hidden"
        />
      </NavbarContent>

      <NavbarContent
        className="hidden laptop:flex desktop:flex gap-6"
        justify="end"
      >
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              href={item.href}
              className="text-text-brown-primary hover:text-[#D7A444] font-medium laptop:text-lg desktop:text-lg "
            >
              <div className="flex justify-between items-center">
                {item.title}
              </div>
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu className="w-full h-1/3 pt-6 bg-navbar-background">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color="foreground"
              className="w-full font-semibold text-text-brown-primary"
              href={item.href}
              size="md"
            >
              <div className="w-full">
                {item.title}
                <Divider className="my-2 bg-[#D7A444]" />
              </div>
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
