import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Box,
  Button,
  FormControl,
  HStack,
  Heading,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { Field, Form, Formik, FormikBag } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import Image from "next/image";
import QueryAPI from "@/service/QueryAPI";

const Home: NextPage = () => {
  const initialValues = {
    file: "",
  };
  const validationSchema = yup.object().shape({
    file: yup.string().required(),
  });

  function handleOnSubmit(values: any, action: any) {}
  const [vgg16, setVGG16] = useState({
    name: "-",
    condition: "-",
    disease: "-",
  });

  const [imageData, setImageData] = useState<any>(null);
  useEffect(() => {
    console.log(imageData);
  }, [imageData]);
  const [imageDataBase64, setImageDataBase64] = useState<any>(null);

  function onSubmit() {
    let formData = new FormData();
    formData.append("file", imageData);
    console.log(formData.getAll);
    (async () => {
      const data = await QueryAPI.uploadImage(formData);
      console.log(data.data.data);
    })();
  }
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <div
        className={`w-[400px] h-[400px] left-[-100px] top-[-80px] overflow-hidden fixed -z-10`}
      >
        <Image
          src={"/plant 1.png"}
          alt={"plant"}
          fill
          className="object-contain"
        />
      </div>
      <div
        className={`w-[350px] h-[350px] right-[-90px] bottom-[-40px] overflow-hidden fixed -z-10`}
      >
        <Image
          src={"/plant 2.png"}
          alt={"plant"}
          fill
          className="object-contain"
        />
      </div>
      <div className="w-fit h-full flex flex-col items-center justify-center">
        <Box>
          <Heading size={"xl"}>
            <Text as="span">Plant Disease </Text>
            Image Classification
          </Heading>
        </Box>

        <div className=" max-w-[35vw] rounded-xl border-dashed border-4 w-screen h-[400px] overflow-hidden">
          <div
            className="w-full h-full flex flex-row items-center justify-center"
            draggable="true"
            onDragStart={(e) => {
              console.log("Drag");
            }}
            onDragEnd={(e) => {
              e.preventDefault();
              console.log("Drag Ended");
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDrop={(e) => {
              e.preventDefault();
              console.log("Dropped");
              e.stopPropagation();
              const dt = e.dataTransfer;
              const data = dt.files;
              console.log(data);
              setImageData(data[0]);
              const fileReader = new FileReader();

              fileReader.readAsDataURL(data[0]);

              fileReader.onloadend = function (e) {
                console.log(e.target?.result);
                setImageDataBase64(e.target?.result);
              };
            }}
            onDragEnter={() => {
              console.log("Enter");
            }}
          >
            {imageData === null || imageDataBase64 == "" ? (
              <Heading className=" max-w-[15rem] text-center" size={"md"}>
                Click or Drag And Drop to Upload Image
              </Heading>
            ) : (
              <div className="w-full h-full relative">
                <Image
                  src={imageDataBase64 ? imageDataBase64 : ""}
                  alt="data"
                  layout="fill"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </div>
        <HStack className="w-full">
          <Button
            onClick={() => {
              setImageData(null);
              setImageDataBase64(null);
            }}
          >
            Remove
          </Button>
          <Button onClick={onSubmit}>Classify Plant Disease</Button>
        </HStack>

        <Heading size={"lg"}>Classification Result</Heading>
        <HStack>
          <Box>
            <Text>VGG16</Text>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Plant Name</Td>
                    <Td>: {vgg16.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Condition</Td>
                    <Td>: {vgg16.condition}</Td>
                  </Tr>
                  <Tr>
                    <Td>Disease</Td>
                    <Td>: {vgg16.disease}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Box>
            <Text>ResNet50V2</Text>
            <TableContainer>
              <Table>
                <Tbody>
                  <Tr>
                    <Td>Plant Name</Td>
                    <Td>: {vgg16.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Condition</Td>
                    <Td>: {vgg16.condition}</Td>
                  </Tr>
                  <Tr>
                    <Td>Disease</Td>
                    <Td>: {vgg16.disease}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </HStack>
        <Button>Clear Results</Button>
      </div>
    </div>
  );
};

export default Home;
