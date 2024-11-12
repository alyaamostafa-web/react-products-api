import {  useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import { Box, Button, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text, useColorMode } from "@chakra-ui/react";
import { BsArrowLeft } from "react-icons/bs";
import imgFalBack from "../assets/150.png"
import { useAppDispatch } from "../app/store";
import { addToCart } from "../app/features/CartSlice";

const ProductDetailsPage = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams();
  const navigate = useNavigate();
  const { colorMode } = useColorMode();
  const getProductDetails = async () => {
    const { data } = await axiosInstance.get(
      `/products/${id}?populate=thumbnail,category&fields=price&fields=title&fields=description`
      // `/products/${id}?populate=*`
    );
    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["products", id],
    queryFn: getProductDetails,
  });

  const goBack = () => navigate(-1);
  //   console.log(data?.data?.attributes);

  useEffect(() => {
    document.title = `Products tore | Product ${data?.data?.attributes?.title} page`;
  }, []);

  if (isLoading)
    return (
      <Box maxW={"sm"} mx={"auto"} my={20}>
        <ProductDetailsSkeleton />
      </Box>
    );

  return (
    <>
    <Flex alignItems={"center"} maxW={"sm"} mx={"auto"} my={7} fontSize={"lg"} cursor={"pointer"} onClick={goBack}>
      <BsArrowLeft />
      <Text ml={2}> Back</Text>
    </Flex>
    <Card maxW={"sm"} mx={"auto"} mb={20} border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${data?.data?.attributes?.thumbnail?.data?.attributes?.url}`}
            alt={data?.data?.attributes?.title}
            borderRadius="lg"
            w={"full"}
            h={"200px"}
            fallbackSrc={imgFalBack}

          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"} mb={2}>
              {data?.data?.attributes?.title}
            </Heading>
            <Text textAlign={"center"}>
            {data?.data?.attributes?.description}
            </Text>
            <Text color="blue.100" fontSize="2xl" textAlign={"center"}>
            {data?.data?.attributes?.category?.data?.attributes?.title}
            </Text>
            <Text color="blue.300" fontSize="2xl" textAlign={"center"}>
            {data?.data?.attributes?.price}
            </Text>

          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
        <Button

              size={"lg"}
              variant="solid"
              colorScheme="purple"
              border={"none"}
              p={8}
              w={"full"}
              bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
              color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
              _hover={{
                bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                color: colorMode === "light" ? "white" : "#9f7aea",
                border: "transparent",
              }}
              textTransform={"uppercase"}
              onClick={()=>{dispatch(addToCart(data.data))}}
            >
              Add to cart
            </Button>
        </CardFooter>
      </Card>
    </>
  )
};
export default ProductDetailsPage;
