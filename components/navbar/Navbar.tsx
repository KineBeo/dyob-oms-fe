"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Badge,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { IoCartOutline } from "react-icons/io5";

interface SubLink {
  title: string;
  href: string;
}
interface MenuItem {
  title: string;
  href: string;
  hasSubmenu?: boolean;
  submenu?: SubLink[];
}


export default function HeroSection() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const [isInvisible] = React.useState(false);
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { title: "Trang chủ", href: "/" },
    {
      title: "Về chúng tôi",
      href: "/about-us-normal",
      hasSubmenu: true,
      submenu: [
        {
          title: "Đông y Ông Bụt",
          href: "/about-us-normal",
        },
        {
          title: "Câu chuyện",
          href: "/about-us",
        },
      ],
    },
    { title: "Sản phẩm", href: "/products", hasSubmenu: false },
    {
      title: "Affiliate",
      href: "/affiliate",
      hasSubmenu: true,
      submenu: [
        {
          title: "Đăng nhập",
          href: "/affiliate/login",
        },
        {
          title: "Tìm hiểu thêm",
          href: "/affiliate",
        },
      ]
    },
    { title: "Giỏ hàng", href: "/cart" },
  ];
  return (
    <Navbar
      isMenuOpen={isOpen}
      onMenuOpenChange={setIsOpen}
      className="border-[#D7A444] bg-navbar-background px-0 py-1 desktop:border-b-8 laptop:border-b-8 mini-laptop:border-b-8"
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
              className="w-auto mobile:w-14 h-auto mobile:h-14 hover:scale-110 transition"
            />
          </div>
          <div className="ml-2">
            <div className="text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg">
              Quán tâm an bệnh
            </div>
            <div className="font-semibold text-text-brown-primary mobile:text-md tablet:text-lg mini-laptop:text-lg laptop:text-xl desktop:text-xl">
              Đông Y Ông Bụt
            </div>
          </div>
        </NavbarBrand>
        <NavbarMenuToggle
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="desktop:hidden laptop:hidden"
        />
      </NavbarContent>

      {/* Desktop */}
      <NavbarContent
        className="desktop:flex laptop:flex gap-6 hidden"
        justify="end"
      >
        {menuItems.map((item, index) =>
          item.hasSubmenu ? (
            <div className="relative" key={index}>
              <Dropdown isOpen={openMenuIndex === index}>
                <DropdownTrigger>
                  <Button
                    className="bg-[#FBF6EC] font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444]"
                    onMouseEnter={() => setOpenMenuIndex(index)}
                    onMouseLeave={() => setOpenMenuIndex(null)}
                  >
                    {item.title}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  onMouseEnter={() => setOpenMenuIndex(index)}
                  onMouseLeave={() => setOpenMenuIndex(null)}
                >
                  {item.submenu ? (
                    item.submenu.map((submenuItem, subIndex) => (
                      <DropdownItem
                        className="font-bold text-2xl text-text-brown-primary"
                        key={`${item.title}-submenu-${subIndex}`}
                        onClick={() =>
                          item.href && router.push(submenuItem.href)
                        }
                      >
                        {submenuItem.title}
                      </DropdownItem>
                    ))
                  ) : (
                    <></>
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <NavbarItem key={index}>
              <Link
                onClick={() =>
                  item.href && router.push(item.href)
                }
                className="font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444]"
              >
                <div className="flex justify-between items-center">
                  {item.title !== "Giỏ hàng" && item.title}
                </div>
                {item.title === "Giỏ hàng" && (
                  <Badge
                    color="danger"
                    content={40}
                    isInvisible={isInvisible}
                    shape="rectangle"
                    size="sm"
                  >
                    <IoCartOutline size={30} className="mb-1" />
                  </Badge>
                )}
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu className="bg-navbar-background pt-6 w-full">
        {menuItems.map((item, index) =>
          item.hasSubmenu ? (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Accordion className="px-0">
                <AccordionItem
                  key={item.title}
                  aria-label={item.title}
                  title={
                    <span className="w-fit font-semibold text-text-brown-primary">
                      {item.title}
                      <Divider className="bg-[#D7A444]" />
                    </span>
                  }
                >
                  <div className="flex flex-col gap-2">
                    {item.submenu?.map((subItem, subIndex) => (
                      <div
                        key={`${subItem.title}-${subIndex}`}
                        // onClick={() => handleSubMenuClick(subItem.href)}
                        className="px-4 py-2 w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer"
                      >
                        <Link
                          color="foreground"
                          className="w-full font-semibold text-text-brown-primary"
                          size="md"
                          onClick={() => {
                            setIsOpen(false);
                            if (item.href) {
                              router.push(item.href);
                            }
                          }}
                        >
                          <div className="w-full">{subItem.title}</div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <Divider className="bg-[#D7A444]" />
                </AccordionItem>
              </Accordion>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                color="foreground"
                className="w-full font-semibold text-text-brown-primary"
                size="lg"
                onClick={() => {
                  setIsOpen(false);
                  if (item.href) {
                    router.push(item.href);
                  }
                }}
              >
                <div className="flex justify-between items-center w-full">
                  {item.title}
                  {item.title === "Giỏ hàng" && (
                    <Badge
                      color="danger"
                      content={40}
                      isInvisible={isInvisible}
                      shape="rectangle"
                      size="sm"
                    >
                      <IoCartOutline size={25} />
                    </Badge>
                  )}
                </div>
              </Link>
              <Divider className="bg-[#D7A444]" />
            </NavbarMenuItem>
          )
        )}
      </NavbarMenu>
    </Navbar >
  );
}
