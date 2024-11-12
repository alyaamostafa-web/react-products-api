import { Button, Divider, Flex, Image, Stack, Text } from "@chakra-ui/react";
import { BsTrash3Fill } from "react-icons/bs";
// import { FaPlus } from "react-icons/fa";
// import { TiMinus } from "react-icons/ti";
import { IProduct } from './../interfaces/index';
import { useAppDispatch } from "../app/store";
import { removeFromCart } from "../app/features/CartSlice";


const CartDrawerItem = ({id,attributes:{title, price,thumbnail},qty} : IProduct) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <Flex mb={3} py={2} alignItems={"center"}>
        <Image
          src={`${import.meta.env.VITE_SERVER_URL}${thumbnail.data.attributes?.url}`}
          alt={"alt"}
          objectFit="cover"
          height="80px"
          width={"80px"}
          rounded={"full"}
          mr={5}
        />
        <Stack>
          <Text size={"sm"}>Title: {title}</Text>

          <Text size={"sm"}>price: {price}</Text>
          <Text size={"sm"}>Quantity: {qty}</Text>
          {/* <Flex>
            <FaPlus
              style={{ margin: "0 10px" }}
              cursor={"pointer"}
              onClick={() => {}}
            />{" "}
            <TiMinus
              onClick={() => {}}
              cursor={"pointer"}
              style={{ margin: "0 10px" }}
            />
          </Flex> */}
          <Button
            variant="outline"
            w="full"
            leftIcon={<BsTrash3Fill />}
            colorScheme="red"
            size={"sm"}
            onClick={() => {dispatch(removeFromCart(id))}}
          >
            Remove:
          </Button>
        </Stack>
      </Flex>
      <Divider />
    </>
  );
};
export default CartDrawerItem;
