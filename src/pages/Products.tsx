import { Grid } from "@chakra-ui/react";
import ProductCard from "../components/ProductCard";
import { IProduct } from "../interfaces";
import axiosInstance from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import ProductSkeleton from './../components/ProductSkeleton';

const ProductsPage = () => {

  const getProductList = async () => {
    const { data } = await axiosInstance.get(
      "/products?populate=thumbnail,category"
    );
    return data
  };

  const { isLoading, data,error } =useQuery({
    queryKey: ['products'],
    queryFn: getProductList,
  })
  if (error) return 'An error has occurred: ' + error.message

  if(isLoading)  
  return (
    <Grid
    templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
    gap={6}
    margin={30}
  >
      {Array.from({ length: 10 }, (_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </Grid>
  );

  return (
    <Grid
      templateColumns={"repeat(auto-fill,minmax(300px,1fr))"}
      gap={6}
      margin={30}
    >
      {data.data.length ? (
        data.data.map((product: IProduct) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <h3>No Product</h3>
      )}
    </Grid>
  );
};
export default ProductsPage;
