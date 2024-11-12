import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Image,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Textarea,
  Flex,

} from "@chakra-ui/react";
import TableSkeleton from "./TableSkeleton";
import {
  useGetDashboardProductsQuery,
  useDeleteDashboardProductMutation,
  useUpdateDashboardProductMutation,
  useCreateDashboardProductMutation,
} from "../app/services/productApiSlice";
import { IProduct } from "../interfaces";
import { AiOutlineEye } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router-dom";
import CustomAlertDialog from "../shared/AlertDialog";
import { ChangeEvent, useEffect, useState } from "react";
import CustomModal from "../shared/Modal";
import { useSelector } from "react-redux";
import { networkSelector } from "../app/features/NetworkSlice";
const DashboardProductsTable = () => {
  const {isOnline} = useSelector(networkSelector);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenEditModal,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: isOpenCreateModal,
    onOpen: onOpenCreateModal,
    onClose: onCloseCreateModal,
  } = useDisclosure();
  const { isLoading, data } = useGetDashboardProductsQuery({ page: 1 });
  const [deleteProduct, { isLoading: deleteLoading, isSuccess }] =
    useDeleteDashboardProductMutation();
  const [updateProduct, { isLoading: isUpdating,isSuccess: isUpdatingSuccess }] =
  useUpdateDashboardProductMutation();
  const [createProduct, { isLoading: isCreating,isSuccess: isCreatingSuccess }] =
  useCreateDashboardProductMutation();
  const [clickedProductId, setClickedProducId] = useState<number | null>(null);

  const defaultProductObj =    {
    id: 0,
    qty: 0,
    attributes: {
      title: "",
      description: "",
      price: 0,
      stock: 0,
      category: { data: { attributes: { id: 1, title: "" } } },
      thumbnail: { data: { attributes: { id: 1, url: "" } } },
    },
  }

  const [clickedProducToEdit, setClickedProducToEdit] = useState<IProduct>(defaultProductObj);
  const [thumbnail, setThumbnail] = useState<File| null>(null);
  
  const [clickedProducToCreate, setClickedProducToCreate] = useState<IProduct>(defaultProductObj);
  const [thumbnailCreate, setThumbnailCreate] = useState<File| null>(null);
  

  //Handlers

  //Edit
  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setClickedProducToEdit({
      ...clickedProducToEdit,
      attributes: {
       ...clickedProducToEdit.attributes,
        [name]: value,
      },
    });
  };
  const onChangeHandlerPrice = (value: string) => {
    setClickedProducToEdit({
      ...clickedProducToEdit,
      attributes: { ...clickedProducToEdit.attributes, price: +value },
    });
  };
  const onChangeHandlerStock = (value: string) => {
    setClickedProducToEdit({
      ...clickedProducToEdit,
      attributes: { ...clickedProducToEdit.attributes, stock: +value },
    });
  };
  const onChangeHandlerThumbnail = (e: ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;
    if (files?.length) {
      setThumbnail(files[0]);
    }
    
  }

  const onSubmitHandlerEdit = ()  => {
    const formData = new FormData();
    formData.append("data",JSON.stringify({
      title:clickedProducToEdit.attributes.title,
      description: clickedProducToEdit.attributes.description,
      price: clickedProducToEdit.attributes.price,
      stock: clickedProducToEdit.attributes.stock,
      
    }))
    if (thumbnail) {
      formData.append("files.thumbnail", thumbnail);
    }
    updateProduct({id:clickedProductId,body:formData})
    
  };
  //Create Product
  const onChangeHandlerCreate = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = e.target;
    setClickedProducToCreate({
      ...clickedProducToCreate,
      attributes: {
       ...clickedProducToCreate.attributes,
        [name]: value,
      },
    });
  };
  const onChangeHandlerCreatePrice = (value: string) => {
    setClickedProducToCreate({
      ...clickedProducToCreate,
      attributes: { ...clickedProducToCreate.attributes, price: +value },
    });
  };
  const onChangeHandlerCreateStock = (value: string) => {
    setClickedProducToCreate({
      ...clickedProducToCreate,
      attributes: { ...clickedProducToCreate.attributes, stock: +value },
    });
  };
  const onChangeHandlerCreateThumbnail = (e: ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;
    if (files?.length) {
      setThumbnailCreate(files[0]);
    }
    
  }



  const onSubmitHandlerCreate = ()  => {
    console.log(clickedProducToCreate);
    console.log(thumbnailCreate);
    const formData = new FormData();
    formData.append("data",JSON.stringify({
      title:clickedProducToCreate.attributes.title,
      description: clickedProducToCreate.attributes.description,
      price: clickedProducToCreate.attributes.price,
      stock: clickedProducToCreate.attributes.stock,
      
    }))
    if (thumbnailCreate) {
      formData.append("files.thumbnail", thumbnailCreate);
    }
    createProduct({body:formData})
    
  };



  useEffect(() => {
    if (isSuccess) {
      setClickedProducId(null);
      onClose();
    }
    if (isUpdatingSuccess) {
      setClickedProducId(null);
      onCloseEditModal();
    }
    if (isCreatingSuccess) {
      setClickedProducToCreate({
        id: 0,
        qty: 0,
        attributes: {
          title: "",
          description: "",
          price: 0,
          stock: 0,
          category: { data: { attributes: { id: 1, title: "" } } },
          thumbnail: { data: { attributes: { id: 1, url: "" } } },
        },
      })
      onCloseCreateModal();
    }
  }, [isSuccess, isUpdatingSuccess, isCreatingSuccess, onClose, onCloseEditModal, onCloseCreateModal]);




  if (isLoading || !isOnline) return <TableSkeleton />;



  return (
    <>
    <Flex direction={"column"} maxW="85%" mx="auto" my={6}>
      <Button colorScheme='blue' width={"fit-content"} ml={"auto"} onClick={()=>onOpenCreateModal()}>Create Product</Button>
      <TableContainer border="1px solid #2d3748" my={6} p={3} rounded={"lg"}>
        <Table variant="simple">
          <TableCaption> Total Entries: {data?.data.length ?? 0}</TableCaption>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Catagory</Th>
              <Th>Descriptin</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.data?.map((product: IProduct) => (
              <Tr key={product.id}>
                <Td>{product?.id}</Td>
                <Td>{product?.attributes?.title.slice(0, 10)}...</Td>
                <Td>
                  {product?.attributes?.category?.data?.attributes?.title.slice(
                    0,
                    10
                  )}
                  ...
                </Td>
                <Td>{product?.attributes?.description.slice(0, 10)}...</Td>
                <Td>
                  <Image
                    src={`${import.meta.env.VITE_SERVER_URL}${
                      product?.attributes?.thumbnail?.data?.attributes?.url
                    }`}
                    alt={"alt"}
                    objectFit="cover"
                    height="50px"
                    width={"50px"}
                    rounded={"full"}
                    m={"10px 0"}
                    mr={"3"}
                  />
                </Td>
                <Td isNumeric>{product?.attributes?.price}</Td>
                <Td isNumeric>{product?.attributes?.stock}</Td>
                <Td>
                  <Button
                    mr={2}
                    colorScheme="purple"
                    variant={"solid"}
                    as={Link}
                    to={`/products/${product.id}`}
                  >
                    <AiOutlineEye size={17} />
                  </Button>
                  <Button
                    mr={2}
                    colorScheme="red"
                    variant={"solid"}
                    onClick={() => {
                      onOpen();
                      setClickedProducId(product.id);
                    }}
                  >
                    <BsTrash size={17} />
                  </Button>
                  <Button
                    colorScheme="blue"
                    variant={"solid"}
                    onClick={() => {
                      onOpenEditModal();
                      setClickedProducId(product.id);
                      setClickedProducToEdit(product);
                    }}
                  >
                    <CiEdit size={17} />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Catagory</Th>
              <Th>Descriptin</Th>
              <Th>Thumbnail</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Stock</Th>
              <Th>Action</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      </Flex>

      <CustomAlertDialog
        title="Are you sure?"
        description="Do you really want to destory this product? this product cannot undone. "
        okTxt="Destory"
        isOpen={isOpen}
        onClose={onClose}
        cancelTxt="Cancel"
        isLoading={deleteLoading}
        onOkHandler={() => deleteProduct(clickedProductId)}
      />

         {/* Product Edit CustomModal */}
      <CustomModal
        title="Update Product"
        okTxt="Update"
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        cancelTxt="Cancel"
        isLoading={isUpdating}
        onSubmitHandler={onSubmitHandlerEdit}
      >
     

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Product Title"
              value={clickedProducToEdit.attributes.title}
              onChange={onChangeHandler}
              name="title"
            />
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Product Description"
              value={clickedProducToEdit.attributes.description}
              onChange={onChangeHandler}
              name="description"
            />
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              defaultValue={clickedProducToEdit.attributes.price}
              precision={2}
              step={0.2}
              onChange={onChangeHandlerPrice}
              name="price"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Count in stock</FormLabel>
            <NumberInput
              name="stock"
              defaultValue={clickedProducToEdit.attributes.stock}
              onChange={onChangeHandlerStock}
              precision={2}
              step={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Thumbnail</FormLabel>
            <Input type="file" id="thumbnail" h={"full"} p={2} accept="image/png ,image/gif,image/jpeng" onChange={onChangeHandlerThumbnail}/>
          </FormControl>
  
      </CustomModal>
         {/* Product Create CustomModal */}
      <CustomModal
        title="Add Product"
        okTxt="Add"
        isOpen={isOpenCreateModal}
        onClose={onCloseCreateModal}
        cancelTxt="Cancel"
        isLoading={isCreating}
        onSubmitHandler={onSubmitHandlerCreate}
      >
     

          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Product Title"
              value={clickedProducToCreate.attributes.title}
              onChange={onChangeHandlerCreate}
              name="title"
            />
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Product Description"
              value={clickedProducToCreate.attributes.description}
              onChange={onChangeHandlerCreate}
              name="description"
            />
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Price</FormLabel>
            <NumberInput
              defaultValue={clickedProducToCreate.attributes.price}
              precision={2}
              step={0.2}
              onChange={onChangeHandlerCreatePrice}
              name="price"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Count in stock</FormLabel>
            <NumberInput
              name="stock"
              defaultValue={clickedProducToCreate.attributes.stock}
              onChange={onChangeHandlerCreateStock}
              precision={2}
              step={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <FormControl my={3}>
            <FormLabel>Thumbnail</FormLabel>
            <Input type="file" id="thumbnail" h={"full"} p={2} accept="image/png ,image/gif,image/jpeng" onChange={onChangeHandlerCreateThumbnail}/>
          </FormControl>
  
      </CustomModal>
    </>
  );
};
export default DashboardProductsTable;
