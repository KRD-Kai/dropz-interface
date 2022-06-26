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
    Center,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

// Replace test data with your own

export default function GridListWithHeading({ dropletz }) {
    let completedCount = 0;
    const features = dropletz
        .filter((droplet) => droplet.completed)
        .map(function (droplet, i) {
            completedCount++;
            return {
                id: i,
                title: droplet.appName,
                text: droplet.desc,
            };
        });
    return (
        <Box p={4}>
            <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
                <Heading fontSize={"2xl"}>Your completed dropletz</Heading>
                <Text color={"gray.600"} fontSize="2xl">
                    Engagement score:{" "}
                    <Text as="span" color={"green.800"} fontSize="3xl">
                        {(completedCount / dropletz.length) * 100}%
                    </Text>
                </Text>
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

            <Center>
                {completedCount == 0 &&
                    "None yet :( Head over to the droplets page!"}
            </Center>
        </Box>
    );
}
