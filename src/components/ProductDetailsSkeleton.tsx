import { Box, Skeleton, SkeletonText } from "@chakra-ui/react"

const ProductDetailsSkeleton = () => {
  return (
    <Box p={5} bg="gray.700" rounded={"lg"}>
        <Skeleton height="200px"/>
        <SkeletonText mt="4"  noOfLines={1} spacing="4" mx={"auto"} maxW={"200px"} />
        <SkeletonText mt="4"  noOfLines={3} spacing="4"  />
        <SkeletonText mt="4"  noOfLines={1} spacing="4"  mx={"auto"} maxW={"120px"} />
        <Skeleton mt={4} height={"50px"} w={"full"} rounded={"lg"}  />
   



  </Box>
  )
}
export default ProductDetailsSkeleton