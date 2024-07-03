import { Button, HStack, Text, Image, Box, Flex, Icon, Link, IconButton, Tooltip } from "@chakra-ui/react"
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
const JobListItem = (props) => {
    const { _id, title, location, link, isApplied, isBookmarked ,company, handleApplied, handleBookmark } = props
    return <Flex align="center" justify="space-between">
        <HStack align="flex-start">
            <Image
                boxSize='50px'
                objectFit='cover'
                src={company.image}
                alt={company.name}
            />
            <Box>

                <Link fontWeight="bold" href={link} target="_blank">{title}</Link>
                <HStack maxW={400}>
                    <Icon as={MdOutlineLocationOn} />
                    <Text fontSize="sm" align="left">{location.join(", ")}</Text>
                </HStack>
                <Link fontSize="sm" href={company.linkedin} target="_blank">{company.name}</Link>
            </Box>

        </HStack>
        <HStack align="center" spacing={4}>
            <Button as="a" href={link} target="_blank">{isApplied ? 'View' : 'Apply'}</Button>
            <Tooltip label='Bookmark'>
                <IconButton
                    icon={<Icon as={isBookmarked ? FaBookmark : FaRegBookmark} />}
                    onClick={() => handleBookmark(_id,isBookmarked)}
                />
            </Tooltip>
            <Tooltip label='Applied'>
                <IconButton
                    icon={<Icon as={isApplied ? FaCheckSquare : FaRegCheckSquare} />}
                    onClick={() => handleApplied(_id,isApplied)}
                />
            </Tooltip>
        </HStack>

    </Flex>
}

export default JobListItem