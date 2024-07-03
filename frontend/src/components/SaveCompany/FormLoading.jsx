import { Box, Flex, HStack, Skeleton, SkeletonText, VStack } from "@chakra-ui/react"

const FormLoading = () => {
    return <VStack align="stretch">
        <Skeleton height="30px" width="500px" />
        <Skeleton height="30px" width="500px" />
        <Skeleton height="30px" width="500px" />
        <Skeleton height="50px" width="500px" />
        <Skeleton height="50px" width="500px" />
    </VStack>

}

export default FormLoading