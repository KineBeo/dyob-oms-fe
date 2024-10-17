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
    const [isInvisible, setIsInvisible] = React.useState(false);
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
 const handleSubMenuClick = (href: string) => {
   router.push(href);
   setIsOpen(false);
 };
  return (
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
      {/* Desktop */}
      <NavbarContent
        className="hidden laptop:flex desktop:flex gap-6"
        justify="end"
      >
        {menuItems.map((item, index) =>
          item.hasSubmenu ? (
            <Dropdown key={index}>
              <DropdownTrigger>
                <Button className="bg-white text-text-brown-primary hover:text-[#D7A444] font-medium laptop:text-lg desktop:text-lg">
                  {item.title}
                </Button>
              </DropdownTrigger>
              <DropdownMenu className=" rounded-none">
                {item.submenu ? (
                  item.submenu.map((submenuItem, subIndex) => (
                    <DropdownItem
                      className="text-text-brown-primary font-bold text-2xl "
                      key={`${item.title}-submenu-${subIndex}`}
                      onClick={() => item.href && router.push(submenuItem.href)}
                    >
                      {submenuItem.title}
                    </DropdownItem>
                  ))
                ) : (
                  <></>
                )}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={index}>
              <Link
                href={item.href}
                className="text-text-brown-primary hover:text-[#D7A444] font-medium laptop:text-lg desktop:text-lg"
              >
                <div className="flex justify-between items-center">
                  {item.title}
                </div>
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
              </Link>
            </NavbarItem>
          )
        )}
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu className="w-full pt-6 bg-navbar-background">
        {menuItems.map((item, index) =>
          item.hasSubmenu ? (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Accordion className="px-0">
                <AccordionItem
                  key={item.title}
                  aria-label={item.title}
                  title={
                    <span className="font-semibold text-text-brown-primary w-fit ">
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
                        className="w-full py-2 px-4 text-text-brown-primary hover:text-[#D7A444] cursor-pointer"
                      >
                        <Link
                          color="foreground"
                          className="w-full font-semibold text-text-brown-primary"
                          href={item.href}
                          size="md"
                        >
                          <div className="w-full">
                            {subItem.title}
                          </div>
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
                href={item.href}
                size="lg"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-full flex items-center justify-between">
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
              <Divider className=" bg-[#D7A444]" />
            </NavbarMenuItem>
          )
        )}
      </NavbarMenu>
    </Navbar>
  );
}
