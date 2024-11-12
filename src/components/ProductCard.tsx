import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProduct } from "../interfaces";

interface IProps {
  product:IProduct
}

const ProductCard = ({product}: IProps) => {
  const { colorMode } = useColorMode();
  const{id,attributes} = product
  return (
    <>
      <Card border={"1px solid #a8b5c8"} bg={"none"}>
        <CardBody>
          <Image
            src={`${import.meta.env.VITE_SERVER_URL}${attributes?.thumbnail?.data?.attributes?.url}`}
            alt="Green double couch with wooden legs"
            // borderRadius="50%"
            // width="200px"
            // height="200px"
            boxSize={"200px"}
            // border={"1px solid black"}
            borderRadius="full"
            mx={"auto"}
            objectFit={"cover"}
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign={"center"} mb={2}>
              {attributes.title}
            </Heading>
            <Text fontSize={"sm"} textAlign={"center"} mb={2}>
              {attributes.description}
            </Text>
            <Text color="purple.600" fontSize="3xl" textAlign={"center"} mb={2}>
              {attributes.price}
            </Text>
            <Button
              as={Link}
              to={`/products/${id}`}
              bg={colorMode === "light" ? "#e6f3fd" : "#9f7aea"}
              color={colorMode !== "light" ? "#e6f3fd" : "#9f7aea"}
              size={"xl"}
              variant="outline"
              border={"none"}
              py={5}
              overflow={"hidden"}
              w={"full"}
              _hover={{
                bg: colorMode !== "light" ? "#e6f3fd" : "#9f7aea",
                color: colorMode === "light" ? "white" : "#9f7aea",
                border: "transparent",
              }}
              mt={6}
             
            >
              View details
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};

export default ProductCard;
