import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const initialData = {
  invoiceNumber: "",
  invoiceDate: "",
  invoiceAmount: "",
};

const Navbar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialNum = searchParams.get("invoiceNumber");
  const [num, setNum] = useState(initialNum || "");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState(initialData);

//   console.log("initialNum", initialNum);

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  const handleSearch = () => {
    console.log("number is:", num);
    num && setSearchParams({ invoiceNumber: num });
  };

  const handleFinancialYear = (e) => {
    setSearchParams({ financialYear: e.target.value });
  };

  const handleDataChange = (e) => {
    setData({...data, [e.target.name] : e.target.value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
  };

  return (
    <Flex
      w="100%"
      position={"fixed"}
      top="0"
      justifyContent={"space-between"}
      pl="100px"
      pr="100px"
      alignItems={"center"}
      bgColor={"white"}
      zIndex="1"
      boxShadow={"md"}
      h="60px"
    >
      <Image
        w="70px"
        src="https://www.shutterstock.com/image-vector/invoice-typographic-stamp-sign-badge-260nw-1027820257.jpg"
      />

      <Flex alignItems={"center"} w="30%" gap="5px">
        <Input
          placeholder="Search by Invoice no."
          value={num}
          onChange={handleChange}
        />
        <Image
          cursor={"pointer"}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Vector_search_icon.svg/1890px-Vector_search_icon.svg.png"
          w="30px"
          onClick={handleSearch}
        />
      </Flex>

      <Select w="30%" onChange={handleFinancialYear}>
        <option value="">All</option>
        <option value="2020-2021"> 2020-2021</option>
        <option value="2021-2022">2021-2022</option>
        <option value="2022-2023">2022-2023</option>
        <option value="2023-2024">2023-2024</option>
      </Select>
      <Button onClick={onOpen}>Create Invoice</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Invoice Number"
                type="string"
                value={data.invoiceNumber}
                name="invoiceNumber"
                onChange={handleDataChange}
              />
              <Input
                placeholder="Invoice Date"
                type="date"
                value={data.invoiceDate}
                name="invoiceDate"
                onChange={handleDataChange}
              />
              <Input
                placeholder="Invoice Amount"
                type="number"
                value={data.invoiceAmount}
                name="invoiceAmount"
                onChange={handleDataChange}
              />
              <Button type submit>
                {" "}
                Create{" "}
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};

export default Navbar;
