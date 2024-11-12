import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text } from "@chakra-ui/react"
import React from "react"
import { useAppDispatch } from "../app/store";
import { useSelector } from "react-redux";
import { globalSelector, onCloseCartDrawerAction } from "../app/features/globalSlice";
import CartDrawerItem from "./CartDrawerItem";
import { cartSelector, clearCart } from "../app/features/CartSlice";
import { IProduct } from './../interfaces/index';

const CartDrawer = () => {
    const btnRef = React.useRef<HTMLButtonElement | null>(null);
    const dispatch = useAppDispatch();
    const {isOpenCartDrawer} = useSelector(globalSelector);
    const {cartProducts} = useSelector(cartSelector);

  // const totalPrice = cartProducts.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    
 
  return (

  <Drawer
    isOpen={isOpenCartDrawer}
    placement='right'
    onClose={()=>{dispatch(onCloseCartDrawerAction())}}
    finalFocusRef={btnRef}
  >
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>Your Shopping Cart</DrawerHeader>

      <DrawerBody>
      {cartProducts.length ? (
              cartProducts.map((product: IProduct) => (
                <CartDrawerItem key={product.id} {...product} />
              ))
            ) : (
              <Text p={"10px 0"} fontSize={"lg"}>
                Your cart is empty
              </Text>
            )}
      
      </DrawerBody>

      <DrawerFooter>
        <Button variant='outline' colorScheme="red" mr={3} onClick={()=>{dispatch(clearCart())}}>
          Clear All
        </Button>

      </DrawerFooter>
    </DrawerContent>
  </Drawer>
  )
}
export default CartDrawer