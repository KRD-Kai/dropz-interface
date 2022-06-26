import {
    Badge,
    Button,
    Center,
    Flex,
    Heading,
    Link,
    Stack,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { isExternal } from "util/types";

// import Image from "next/image";
export default function socialProfileWithImageHorizontal({ droplet }) {
    return (
        <Center py={6}>
            <Stack
                borderWidth="1px"
                borderRadius="lg"
                w={{ sm: "100%", md: "540px" }}
                height={{ sm: "476px", md: "15rem" }}
                direction={{ base: "column", md: "row" }}
                bg={useColorModeValue("white", "gray.900")}
                boxShadow={"2xl"}
                padding={4}
            >
                <Flex flex={1} bg="grey.200">
                    <Image
                        objectFit="contain"
                        src={`/${droplet.appName}.png`}
                        alt={`${droplet.appName} logo`}
                    />
                </Flex>
                <Stack
                    flex={1}
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={1}
                    pt={2}
                >
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                        {droplet.appName}
                    </Heading>
                    <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
                        {droplet.handle}
                    </Text>
                    <Text
                        textAlign={"center"}
                        color={useColorModeValue("gray.700", "gray.400")}
                        px={3}
                    >
                        {droplet.desc}
                    </Text>

                    <Stack
                        width={"100%"}
                        mt={"2rem"}
                        direction={"row"}
                        padding={2}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <a
                            href={`${droplet.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ display: "flex", flex: 1 }}
                        >
                            <Button
                                flex={1}
                                fontSize={"sm"}
                                rounded={"full"}
                                bg={"blue.400"}
                                color={"white"}
                                boxShadow={
                                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                }
                                _hover={{
                                    bg: "blue.500",
                                }}
                                _focus={{
                                    bg: "blue.500",
                                }}
                            >
                                Complete
                            </Button>
                        </a>
                    </Stack>
                </Stack>
            </Stack>
        </Center>
    );
}
