"use client";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useAppDispatch } from "../../app/store";
import { loginSelector, userLogin } from "../../app/features/loginSlice";
import { useSelector } from "react-redux";
import { IUserLogin } from "../../interfaces";


interface IProps {
  isAuthenticated: boolean;
}

export default function LoginPage({ isAuthenticated }: IProps) {
      // if (isAuthenticated) return <Navigate to="/" replace />   ;
  useEffect(() => {
    
    if (isAuthenticated) return  window.history.back()  ;

  }, [isAuthenticated])
  
 


  const dispatch = useAppDispatch();
  const { loading } = useSelector(loginSelector);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<IUserLogin>({
    identifier: "",
    password: "",
  });
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    if (!user.identifier && !user.password) {
      setIsEmail(true);
      setIsPassword(true);
      return;
    }
    if (!user.identifier) {
      setIsEmail(true);
      return;
    }
    if (!user.password) {
      setIsPassword(true);
      return;
    }

    setIsEmail(false);
    setIsPassword(false);
    dispatch(userLogin(user));
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          as={"form"}
          onSubmit={submitHandler}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="identifier"
                value={user.identifier}
                isInvalid={isEmail}
                errorBorderColor="crimson"
                onChange={onChangeHandler}
              />
              {isEmail && (
                <FormHelperText color={"red.500"}>
                  Email is Required
                </FormHelperText>
              )}
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={user.password}
                  name="password"
                  isInvalid={isPassword}
                  errorBorderColor="crimson"
                  type={showPassword ? "text" : "password"}
                  onChange={onChangeHandler}
                />
                <InputRightElement h={"full"} w={""}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {isPassword && (
                <FormHelperText color={"red.500"}>
                  Password is Required
                </FormHelperText>
              )}
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>
              <Button
                bg={isEmail || isPassword ? "red.500" : "blue.400"}
                color={"white"}
                _hover={{
                  bg: isEmail || isPassword ? "red.600" : "blue.600",
                }}
                type="submit"
                isLoading={loading}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
