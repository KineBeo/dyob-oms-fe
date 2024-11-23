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
  User,
  Avatar,
} from "@nextui-org/react";
import { IoCartOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import { RootState } from "@/store/store";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { cartService } from "@/utils/cart/cartApi";

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
  const dispatch = useDispatch();

  // Get auth state from Redux
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleLogout = async () => {
    if (user?.id !== undefined && cartItems.length > 0) {
      await cartService.clearCart(user.id);
    }
    dispatch(logout());
    dispatch(clearCart());

    router.push("/");
  };

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
      title: "Tiếp thị liên kết",
      href: "/affiliate",
      hasSubmenu: true,
      submenu: [
        {
          title: "Chính sách",
          href: "/affiliate/legal",
        },
        {
          title: "Tìm hiểu thêm",
          href: "/affiliate",
        },
      ],
    },
  ];

  const renderAuthButton = () => {
    if (isAuthenticated && user) {
      return (
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="bg-[#FBF6EC] font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444]"
              isIconOnly={true}
            >
              <Avatar
                className=""
                classNames={{
                  base: "bg-gradient-to-br from-[#FBF6EC] to-[#D7A444]",
                }}
                name={user.fullname.split(" ").pop()}
              />
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem
              key="profile"
              className="font-bold text-text-brown-primary text-xl"
              onClick={() => router.push("/affiliate-dashboard")}
            >
              Tài khoản của tôi
            </DropdownItem>
            <DropdownItem
              key="orders"
              className="font-bold text-text-brown-primary text-xl"
              onClick={() => router.push("/orders")}
            >
              Đơn hàng
            </DropdownItem>
            <DropdownItem
              key="logout"
              className="font-bold text-red-500 text-xl"
              onClick={handleLogout}
            >
              Đăng xuất
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }
    return (
      <Dropdown isOpen={openMenuIndex === menuItems.length}>
        <DropdownTrigger>
          <Button
            className="bg-[#FBF6EC] font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444]"
            onMouseEnter={() => setOpenMenuIndex(menuItems.length)}
            onMouseLeave={() => setOpenMenuIndex(null)}
            isIconOnly={true}
            startContent={<FaRegUserCircle size={24} />}
          />
        </DropdownTrigger>
        <DropdownMenu
          onMouseEnter={() => setOpenMenuIndex(menuItems.length)}
          onMouseLeave={() => setOpenMenuIndex(null)}
        >
          <DropdownItem
            className="font-bold text-2xl text-text-brown-primary"
            onClick={() => router.push("/authentication/login")}
          >
            Đăng nhập
          </DropdownItem>
          <DropdownItem
            className="font-bold text-2xl text-text-brown-primary"
            onClick={() => router.push("/authentication/register")}
          >
            Đăng ký
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  };

  const renderMobileAuthMenu = () => {
    if (isAuthenticated && user) {
      return (
        <NavbarMenuItem>
          <Accordion isCompact className="px-0">
            <AccordionItem
              key="auth"
              aria-label="Authentication"
              title={
                <span className="w-fit font-medium text-text-brown-primary">
                  <div className="flex items-center gap-2">{user.fullname}</div>
                  <Divider className="bg-[#D7A444]" />
                </span>
              }
            >
              <div className="flex flex-col gap-2 ml-4">
                <div className="w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer">
                  <Link
                    color="foreground"
                    className="w-full font-medium text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg"
                    size="md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/affiliate-dashboard");
                    }}
                  >
                    <div className="w-full">Tài khoản của tôi</div>
                  </Link>
                </div>
                <div className="w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer">
                  <Link
                    color="foreground"
                    className="w-full font-medium text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg"
                    size="md"
                    onClick={() => {
                      setIsOpen(false);
                      router.push("/orders");
                    }}
                  >
                    <div className="w-full">Đơn hàng</div>
                  </Link>
                </div>
                <div className="w-full text-red-500 hover:text-red-600 cursor-pointer">
                  <Link
                    color="foreground"
                    className="w-full font-medium mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg"
                    size="md"
                    onClick={() => {
                      setIsOpen(false);
                      handleLogout();
                    }}
                  >
                    <div className="w-full">Đăng xuất</div>
                  </Link>
                </div>
              </div>
            </AccordionItem>
          </Accordion>
        </NavbarMenuItem>
      );
    }

    return (
      <NavbarMenuItem>
        <Accordion isCompact className="px-0">
          <AccordionItem
            key="auth"
            aria-label="Authentication"
            title={
              <span className="w-fit font-medium text-text-brown-primary">
                <div className="flex items-center gap-2">Tài khoản</div>
                <Divider className="bg-[#D7A444]" />
              </span>
            }
          >
            <div className="flex flex-col gap-2 ml-4">
              <div className="w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer">
                <Link
                  color="foreground"
                  className="w-full font-medium text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg"
                  size="md"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/authentication/login");
                  }}
                >
                  <div className="w-full">Đăng nhập</div>
                </Link>
              </div>
              <div className="w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer">
                <Link
                  color="foreground"
                  className="w-full font-semibold text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg"
                  size="md"
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/authentication/register");
                  }}
                >
                  <div className="w-full">Đăng ký</div>
                </Link>
              </div>
            </div>
          </AccordionItem>
        </Accordion>
      </NavbarMenuItem>
    );
  };

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
              width={50}
              height={50}
              priority
              loading="eager"
              className="w-auto mobile:w-14 h-auto mobile:h-14 hover:scale-110 transition"
            />
          </div>
          <div className="ml-2">
            <div className="font-semibold text-text-brown-primary mobile:text-md tablet:text-lg mini-laptop:text-lg laptop:text-xl desktop:text-xl">
              Đông Y Ông Bụt
            </div>
            <div className="text-text-brown-primary mobile:text-sm tablet:text-md mini-laptop:text-md laptop:text-lg desktop:text-lg">
              Quán tâm an bệnh
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
                    className="bg-[#FBF6EC] font-semibold text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444] "
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
                        className="font-medium text-xl text-text-brown-primary"
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
                onClick={() => item.href && router.push(item.href)}
                className=" font-semibold text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444] cursor-pointer hover:scale-95 transition-all "
              >
                <div className="flex justify-between items-center">
                  {item.title}
                </div>
              </Link>
            </NavbarItem>
          )
        )}

        <div className="relative">{renderAuthButton()}</div>
        <NavbarItem>
          <Badge color="danger" content={cartItems.length} size="md">
            <Button
              onClick={() => router.push("/cart")}
              radius="full"
              isIconOnly
              className="bg-[#FBF6EC] font-medium text-text-brown-primary laptop:text-lg desktop:text-lg hover:text-[#D7A444] hover:scale-110"
            >
              <IoCartOutline size={30} />
            </Button>
          </Badge>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile */}
      <NavbarMenu className="bg-navbar-background pt-6 w-full">
        {menuItems.map((item, index) =>
          item.hasSubmenu ? (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Accordion isCompact className="px-0">
                <AccordionItem
                  key={item.title}
                  aria-label={item.title}
                  title={
                    <span className="w-fit font-medium text-text-brown-primary">
                      {item.title}
                      <Divider className="bg-[#D7A444]" />
                    </span>
                  }
                >
                  <div className="flex flex-col gap-2 ml-4">
                    {item.submenu?.map((subItem, subIndex) => (
                      <div
                        key={`${subItem.title}-${subIndex}`}
                        className="w-full text-text-brown-primary hover:text-[#D7A444] cursor-pointer"
                      >
                        <Link
                          color="foreground"
                          className="w-full font-medium text-text-brown-primary"
                          size="md"
                          onClick={() => {
                            setIsOpen(false);
                            if (subItem.href) {
                              router.push(subItem.href);
                            }
                          }}
                        >
                          <div className="w-full">{subItem.title}</div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </AccordionItem>
              </Accordion>
            </NavbarMenuItem>
          ) : (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <Link
                color="foreground"
                className="w-full font-medium text-text-brown-primary"
                size="md"
                onClick={() => {
                  setIsOpen(false);
                  if (item.href) {
                    router.push(item.href);
                  }
                }}
              >
                <div className="flex justify-between items-center w-full">
                  {item.title}
                </div>
              </Link>
              <Divider className="bg-[#D7A444]" />
            </NavbarMenuItem>
          )
        )}
        {renderMobileAuthMenu()}
        <NavbarMenuItem>
          <div
            onClick={() => {
              setIsOpen(false);
              router.push("/cart");
            }}
            className="w-full font-medium text-text-brown-primary"
          >
            <div className="flex justify-between items-center w-full">
              Giỏ hàng
              <Badge
                color="danger"
                content={cartItems.length}
                isInvisible={isInvisible}
                shape="circle"
                size="md"
              >
                <IoCartOutline size={30} />
              </Badge>
            </div>
          </div>
          <Divider className="bg-[#D7A444]" />
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
