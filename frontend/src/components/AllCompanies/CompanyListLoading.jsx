import { Box, Flex, HStack, Skeleton, SkeletonText } from "@chakra-ui/react"

const CompanyListLoading = () => {
    return <Flex align="center" justify="space-between">
        <HStack align="flex-start">
            <Skeleton height="50px" width="50px" />
            <Box>
                <SkeletonText noOfLines={3} spacing='4' skeletonHeight='2' width={400} />
            </Box>
        </HStack>
        <Skeleton height="40px" width="100px" />
    </Flex>
}

export default CompanyListLoading