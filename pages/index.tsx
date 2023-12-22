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
import { useEffect, useRef, useState } from "react";
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
  const [resnet, setResnet] = useState({
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
      const res = data?.data.data;
      if (res !== null) {
        const dataVGG = {
          name: res.vgg16.name,
          condition: res.vgg16.condition,
          disease: res.vgg16.disease,
        };
        setVGG16(dataVGG);

        const dataResnet = {
          name: res.resnet.name,
          condition: res.resnet.condition,
          disease: res.resnet.disease,
        };
        setResnet(dataResnet);
      } else {
        setVGG16({
          name: "-",
          condition: "-",
          disease: "-",
        });
        setResnet({
          name: "-",
          condition: "-",
          disease: "-",
        });
      }
    })();
  }
  const fileRef = useRef<any>();
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
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
        <Box mb={"48px"} mt={"128px"}>
          <Heading size={"xl"}>
            <Text as="span">Plant Disease </Text>
            Image Classification
          </Heading>
        </Box>

        <div className="rounded-xl border-dashed border-4 overflow-hidden">
          <div
            className="w-[45rem] h-[400px] flex flex-row items-center justify-center"
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
            onClick={() => {
              console.log(fileRef.current.value);
              fileRef.current.click();
            }}
          >
            {imageData === null || imageDataBase64 == "" ? (
              <Heading className=" max-w-[15rem] text-center" size={"md"}>
                Click or Drag And Drop to Upload Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={fileRef}
                  onChange={(e) => {
                    setImageData(e.target.files ? e.target.files[0] : null);
                    const fileReader = new FileReader();
                    if (e.target.files) {
                      fileReader.readAsDataURL(e.target.files[0]);

                      fileReader.onloadend = function (e) {
                        setImageDataBase64(e.target?.result);
                      };
                    }
                  }}
                />
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
        <HStack w={"full"} mt={"48px"}>
          <Button
            onClick={() => {
              setImageData(null);
              setImageDataBase64(null);
              fileRef.current.files = undefined;
            }}
          >
            Remove Image
          </Button>
          <Button onClick={onSubmit}>Classify Plant Disease</Button>
        </HStack>
        <VStack gap={"16px"} align={"left"} w="full" mt={"48px"}>
          <Heading size={"lg"}>Classification Result</Heading>
          <HStack w={"full"} fontWeight={"bold"}>
            <Box>
              <Text>VGG16</Text>
              <TableContainer>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Plant Name
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {vgg16.name}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Condition
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {vgg16.condition}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Disease
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {vgg16.disease}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
            <Box ml={"128px"}>
              <Text>ResNet50V2</Text>
              <TableContainer>
                <Table>
                  <Tbody>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Plant Name
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {resnet.name}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Condition
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {resnet.condition}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        Disease
                      </Td>
                      <Td border={"none"} textAlign={"left"} pl={0}>
                        : {resnet.disease}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </HStack>
          <Button
            w="fit-content"
            bgColor={"red.800"}
            textColor={"white"}
            _hover={{}}
            onClick={() => {
              setVGG16({
                name: "-",
                condition: "-",
                disease: "-",
              });
              setResnet({
                name: "-",
                condition: "-",
                disease: "-",
              });
            }}
          >
            Clear Results
          </Button>
        </VStack>
      </div>
    </div>
  );
};

export default Home;
