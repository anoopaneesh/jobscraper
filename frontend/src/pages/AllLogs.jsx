import { Container, Text, VStack } from "@chakra-ui/react"
import { useSocketData } from "../contexts/SocketContext"


const AllLogs = () => {
    const { logEntries } = useSocketData()
    return <Container maxW="6xl" py={10}>
        <VStack align="flex-start">
            {logEntries.map(item => <Text key={item}>{item}</Text>)}
        </VStack>
    </Container>
}


export default AllLogs