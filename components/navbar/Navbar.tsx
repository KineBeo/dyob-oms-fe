"use client";
import Image from "next/image";
import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenu,NavbarMenuItem
} from "@nextui-org/react";

export default function HeroSection() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { title: "Trang chủ", href: "/" },
    { title: "Về chúng tôi", href: "/aboutus", hasSubmenu: true },
    { title: "Sản phẩm", href: "/products", hasSubmenu: true },
    { title: "Phản hồi", href: "/feedback" },
    { title: "Giỏ hàng", href: "/cart" },
  ];
  return (
    <div className="bg-navbar-background">
      {/* Desktop  */}
      {/* <nav className="bg-navbar-background shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-20">
            <div className="flex items-center ">
              <div className="flex-shrink-0 flex items-center">
                <Image
                  src="/images/logo-image.png"
                  alt="Đông Y Ông Bụt Logo"
                  width={64}
                  height={64}
                  className="h-16 w-auto"
                />
                <div className="ml-2">
                  <div className="text-lg font-medium text-text-brown-primary">
                    Quán tâm an bệnh
                  </div>
                  <div className="text-2xl font-bold text-text-brown-primary">
                    Đông Y Ông Bụt
                  </div>
                </div>
              </div>
              <IoMdMenu
                className="md:hidden w-10 h-10 text-[#D4A45F] ml-20"
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
            <div className="flex items-center">
              <div className="hidden mini-laptop:flex laptop:flex desktop:flex space-x-8">
                {menuItems.map((item, index) => (
                  <Link
                    href={item.href}
                    className="text-text-brown-primary hover:text-yellow-600 px-3 py-2 rounded-md font-medium text-2xl"
                  >
                    <div className="flex justify-between items-center">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="h-4 bg-navbar-line"></div>
      </nav> */}
      {/* Mobilie */}
      {/* <div className="mini-laptop:hidden laptop:hidden desktop:hidden ">
        <div className={`bg-[#FDF5E6] ${isOpen ? "block" : "hidden"}`}>
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-[#E6CCB3]">
              <Link
                href={item.href}
                className="block p-4 text-text-brown-primary hover:bg-[#FFE4B5]"
              >
                <div className="flex justify-between items-center font-medium">
                  {item.title}
                  {item.hasSubmenu && <span className="text-sm">▼</span>}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div> */}
      <Navbar onMenuOpenChange={setIsOpen} className="py-1 px-0">
        <NavbarContent className=" desktop:-ml-20">
          <NavbarBrand>
            <Image
              src="/images/logo-image.png"
              alt="Đông Y Ông Bụt Logo"
              width={64}
              height={64}
              className="h-auto w-auto mobile:h-14 mobile:w-14"
            />
            <div className="ml-2">
              <div className="text-lg  laptop:text-medium mini-laptop:text-medium tablet:text-medium mobile:text-medium font-medium text-text-brown-primary">
                Quán tâm an bệnh
              </div>
              <div className="text-2xl laptop:text-large mini-laptop:text-large tablet:text-large mobile:text-large font-bold text-text-brown-primary">
                Đông Y Ông Bụt
              </div>
            </div>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="laptop:hidden desktop:hidden"
          />
        </NavbarContent>

        <NavbarContent className="hidden laptop:flex desktop:flex gap-4 ">
          {menuItems.map((item, index) => (
            <NavbarItem>
              <Link
                href={item.href}
                className="text-text-brown-primary hover:text-yellow-600 px-3 py-2 rounded-md font-medium text-2xl laptop:text-lg"
              >
                <div className="flex justify-between items-center text-text-brown-primary">
                  {item.title}
                </div>
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarMenu className="w-full h-1/3 pt-6">
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                className="w-full"
                href="#"
                size="lg"
              >
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="h-3 bg-navbar-line w-full fixed bottom-2/3 left-0 "></div>
        </NavbarMenu>
      </Navbar>
      <div className="h-4 mobile:h-3 tablet:h-3 mini-laptop:h-3  bg-navbar-line w-full"></div>
    </div>
  );
}
