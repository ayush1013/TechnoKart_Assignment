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
import ItemsList from "../Components/ItemsList";

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
            <ItemsList key={elem._id} elem={elem} />
          ))}
      </Grid>
    </Box>
  );
};

export default Home;
