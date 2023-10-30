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
import Navbar from "../Components/Navbar";
import { useLocation } from "react-router-dom";

const Home = () => {
  const invoices = useSelector((store) => store.products);
  const isLoading = useSelector((store) => store.isLoading);
  const postSuccess = useSelector((store) => store.postSuccess);
  const editSuccess = useSelector((store) => store.editSuccess);
  const deleteSuccess = useSelector((store) => store.deleteSuccess);
  const dispatch = useDispatch();
  const location = useLocation();

    // console.log("location", location);

  // console.log("isLoading", isLoading);
  // console.log("invoices", invoices);

  useEffect(() => {
    dispatch(getData(location.search));
  }, [location.search, dispatch, postSuccess, editSuccess, deleteSuccess]);

  if (isLoading)
    return <CircularProgress mt="100px" isIndeterminate size="120px" />;

  return (
    <Box>
      <Navbar />
      <Grid
        mt="70px"
        w={"100%"}
        gridTemplateColumns={{
          base: "repeat(1,1fr)",
          md: "repeat(1,1fr)",
          lg: "repeat(2,1fr)",
        }}
        gap="50px"
        p="20px"
      >
        {invoices?.length > 0 &&
          invoices?.map((elem) => <ItemsList key={elem._id} elem={elem} />)}
      </Grid>
    </Box>
  );
};

export default Home;
