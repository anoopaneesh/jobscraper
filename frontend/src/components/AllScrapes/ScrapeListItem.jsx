import { Button, HStack, Text, Image, Box, Flex, VStack } from "@chakra-ui/react"
import { MdOutlineLocationOn } from "react-icons/md";
const ScrapeListItem = (props) => {
    const { _id, startedAt, status, endedAt, jobs } = props
    return <Flex align="center" justify="space-between">
        <HStack align="flex-start">
            <Image
                boxSize='50px'
                objectFit='cover'
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Gear-icon-transparent-background.png"
                alt="gear icon"
            />
            <Box>
                <VStack maxW={300} align="flex-start">
                    <HStack>
                        <Text fontSize="sm" fontWeight="bold">Started : </Text>
                        <Text fontSize="sm">{`${startedAt ? new Date(startedAt).toLocaleString() : "NA"}`}</Text>
                    </HStack>
                    <HStack>
                        <Text fontSize="sm" fontWeight="bold">Ended&nbsp;&nbsp;&nbsp;: </Text>
                        <Text fontSize="sm">{`${endedAt ? new Date(endedAt).toLocaleString() : "NA"}`}</Text>
                    </HStack>
                </VStack>
            </Box>

        </HStack>

        <Text fontSize="sm">{status}</Text>

        <HStack justify="flex-start" w={300}>
            <Text fontSize="sm" fontWeight="bold">Jobs Scraped : </Text>
            <Text fontSize="sm">{`${jobs || "NA"}`}</Text>
        </HStack>
    </Flex>
}

export default ScrapeListItem