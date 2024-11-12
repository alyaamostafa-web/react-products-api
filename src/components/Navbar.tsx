"use client";

import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BsMoon, BsSun } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import CookiseServices from "../services/CookiseServices";
import { useSelector } from "react-redux";
import { cartSelector } from "../app/features/CartSlice";
import { useAppDispatch } from "../app/store";
import { onOpenCartDrawerAction } from "../app/features/globalSlice";

interface Props {
  children: string;
}
const Links = ["Dashboard", "Products", "Team"];
const NavLink = (props: Props) => {

  const { children } = props;

  return (
    <Box
      as={Link}
      to={children.toLowerCase()}
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const dispatch = useAppDispatch();
  const {cartProducts} = useSelector(cartSelector)
  const token = CookiseServices.get("jwt");
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logout = () => {
    CookiseServices.remove("jwt");
    window.location.reload();
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={
              isOpen ? (
                <CgClose fontSize={"25px"} style={{ margin: "auto" }} />
              ) : (
                <IoIosMenu fontSize={"25px"} style={{ margin: "auto" }} />
              )
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Link to="/">My App</Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7} alignItems={"center"}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <BsMoon /> : <BsSun />}
              </Button>
              <Button onClick={()=>{dispatch(onOpenCartDrawerAction())}}>Cart {cartProducts.length}</Button>
              {token ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      size={"sm"}
                      src={"https://avatars.dicebear.com/api/male/username.svg"}
                    />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>Username</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </Stack>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
