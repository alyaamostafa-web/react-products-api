import { createStandaloneToast } from "@chakra-ui/react";
import { IProduct } from "../interfaces";

const { toast } = createStandaloneToast();

export const addItemsToShoppingCart = (
  shoppingCartItems: IProduct[],
  cartItems: IProduct
) => {
  const existsItem = shoppingCartItems.find((item) => item.id === cartItems.id);

  if (existsItem) {
    toast({
      title: "Added to your car.",
      description: "This item is already exist, the quantity will be increased",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    return shoppingCartItems.map((item) =>
      item.id === cartItems.id ? { ...item, qty: item.qty + 1 } : item
    );
  }
  toast({
    title: "Added to your car.",
    status: "success",
    duration: 2000,
    isClosable: true,
  });
  return [...shoppingCartItems, { ...cartItems, qty: 1 }];
};
