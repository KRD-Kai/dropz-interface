import {
    Box,
    Container,
    Heading,
    SimpleGrid,
    Icon,
    Text,
    Stack,
    HStack,
    VStack,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own

export default function GridListWithHeading({ dropletz }) {
    console.log(dropletz);

    const features = dropletz
        .filter((droplet) => droplet.completed)
        .map(function (droplet, i) {
            return {
                id: i,
                title: droplet.appName,
                text: droplet.desc,
            };
        });
    console.log("FEATES", features);
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading fontSize={"2xl"}>Your completed dropletz</Heading>
            </Stack>

            <Container maxW={"6xl"} mt={10}>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
                    {features.map((feature) => (
                        <HStack key={feature.id} align={"top"}>
                            <Box color={"green.400"} px={2}>
                                <Icon as={CheckIcon} />
                            </Box>
                            <VStack align={"start"}>
                                <Text fontWeight={600}>{feature.title}</Text>
                                <Text color={"gray.600"}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </SimpleGrid>
            </Container>
        </Box>
    );
}
