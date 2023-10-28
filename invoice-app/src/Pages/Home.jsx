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
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getData } from "../Redux/action";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const invoices = useSelector((store) => store.products);
  const isLoading = useSelector((store) => store.isLoading);
  const dispatch = useDispatch();

  console.log("isLoading", isLoading);
  console.log("invoices", invoices);

  useEffect(() => {
    dispatch(getData());
  }, []);

  if (isLoading) return <CircularProgress isIndeterminate size="120px" />;

  return (
    <Box>
      <Grid w={"100%"} gridTemplateColumns="repeat(2,1fr)" gap="50px" p="20px">
        {invoices?.length > 0 &&
          invoices?.map((elem) => (
            <Box key={elem._id} boxShadow={"lg"} p="20px" border="1px solid grey" >
              <Heading fontSize={"24px"}>INVOICE</Heading>
              <Flex
                mt="20px"
                justifyContent={"space-between"}
                w="100%"
                fontSize={"14px"}
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


              <TableContainer mt="20px" >
                <Table variant="simple">
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
                      <Td>{Math.floor(elem.invoiceAmount/100)}</Td>
                      <Td >$100</Td>
                      <Td>${elem.invoiceAmount}</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>

              <Text textAlign={"left"} mt="20px"  fontWeight={"bold"}  >
                Thank You!
              </Text>
            
              <Flex
                mt="20px"
                justifyContent={"space-between"}
                w="100%"
                fontSize={"14px"}
              >
                <Box textAlign={"left"}>
                    <Text fontWeight={"bold"}>Payment Information</Text>
                  <Text>SBI Bank</Text>
                  <Text>Account Name: Ayush Verma</Text>
                  <Text>Account No. 71000313152456</Text>
                  <Text>Pay By {elem.invoiceDate.split("T").map(String)[0]}</Text>
                </Box>
                <Box textAlign={"left"}>
                  <Text fontWeight={"bold"}> Ayush Verma</Text>
                  <Text>123, New Palasia, Indore, MP</Text>
                </Box>
              </Flex>
            </Box>
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
