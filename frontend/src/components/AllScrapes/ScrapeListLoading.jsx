import { Box, Flex, HStack, Skeleton, SkeletonText } from "@chakra-ui/react"

const ScrapeListLoading = () => {
    return <Flex align="center" justify="space-between">
        <HStack align="flex-start" maxW={300}>
            <Skeleton height="50px" width="50px" />
            <Box>
                <SkeletonText noOfLines={3} spacing='4' skeletonHeight='2' width={300} />
            </Box>
        </HStack>

        <SkeletonText noOfLines={1} spacing='4' skeletonHeight='2' width={100} />
        <HStack justify="flex-start" w={300}>
            <SkeletonText noOfLines={1} spacing='4' skeletonHeight='2' width={100} />
        </HStack>

    </Flex>
}

export default ScrapeListLoading