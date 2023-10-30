import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Flex,
  Grid,
  Heading,
  Text,
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../Redux/action";

const ItemsList = ({ elem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [editData, setEditData] = useState({
    invoiceNumber: elem.number,
    invoiceDate: elem.invoiceDate,
    invoiceAmount: elem.invoiceAmount,
  });
  const editLoading = useSelector((store) => store.editLoading);
  const editError = useSelector((store) => store.editError);
  const editSuccess = useSelector((store) => store.editSuccess);

  const handleDataChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    console.log("editData", editData);
    dispatch(updateData(id, editData));
  };

  const handleDelete = (id) => {};

  useEffect(()=>{
    if(editSuccess){
        alert(editSuccess)
    }
    if(editError){
        alert(editError)
    }
  },[editError,editSuccess])

  return (
    <Box boxShadow={"lg"} p="20px" bgColor={"#F5F5F0"} position={"relative"}>
      <Flex
        gap="10px"
        w="fit-content"
        position={"absolute"}
        top="10px"
        left="10px"
      >
        <Button
          variant={"outline"}
          size={"xs"}
          colorScheme="green"
          onClick={onOpen}
        >
          Edit
        </Button>
        <Button
          variant={"outline"}
          size={"xs"}
          colorScheme="red"
          onClick={() => handleDelete(elem._id)}
        >
          Delete
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={(e) => handleEdit(e, elem._id)}>
              <Input
                placeholder="Invoice Number"
                type="string"
                value={editData.invoiceNumber}
                name="invoiceNumber"
                onChange={handleDataChange}
                mt="10px"
              />
              <Input
                placeholder="Invoice Date"
                type="date"
                value={editData.invoiceDate}
                name="invoiceDate"
                onChange={handleDataChange}
                mt="10px"
              />
              <Input
                placeholder="Invoice Amount"
                type="number"
                value={editData.invoiceAmount}
                name="invoiceAmount"
                onChange={handleDataChange}
                mt="10px"
              />
              <Button
                type
                submit
                colorScheme="blue"
                mt="10px"
                isLoading={editLoading}
              >
                {" "}
                Create{" "}
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Heading fontSize={"24px"}>INVOICE</Heading>
      <Flex
        mt="20px"
        justifyContent={"space-between"}
        w="100%"
        fontSize={"14px"}
        // alignItems={"end"}
      >
        <Box textAlign={"left"}>
          <Text fontWeight={"bold"}>BILLED TO:</Text>
          <Text>Pooja EnterPrises</Text>
          <Text>+91 8103153152</Text>
          <Text>187/A Geeta Bhawan, Indore, MP</Text>
        </Box>
        <Box textAlign={"left"}>
          <Text fontWeight={"bold"}>Invoice No. {elem.number}</Text>
          <Text>{elem.invoiceDate.split("T").map(String)[0]}</Text>
        </Box>
      </Flex>

      <TableContainer mt="20px">
        <Table variant="striped" colorScheme="red">
          <Thead>
            <Tr>
              <Th>Item</Th>
              <Th>Quantity</Th>
              <Th isNumeric>Unit Price</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Cuban Collar Shirt</Td>
              <Td>{Math.floor(elem.invoiceAmount / 100)}</Td>
              <Td>$100</Td>
              <Td>${elem.invoiceAmount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>

      <Text textAlign={"left"} mt="20px" fontWeight={"bold"}>
        Thank You!
      </Text>

      <Flex
        mt="20px"
        justifyContent={"space-between"}
        w="100%"
        fontSize={"14px"}
        alignItems={"end"}
      >
        <Box textAlign={"left"}>
          <Text fontWeight={"bold"}>Payment Information</Text>
          <Text>SBI Bank</Text>
          <Text>Account Name: Ayush Verma</Text>
          <Text>Account No. 71000313152456</Text>
          <Text>Pay By {elem.invoiceDate.split("T").map(String)[0]}</Text>
        </Box>
        <Box textAlign={"left"} h="fit-content">
          <Text fontWeight={"bold"}> Ayush Verma</Text>
          <Text>123, New Palasia, Indore, MP</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemsList;
