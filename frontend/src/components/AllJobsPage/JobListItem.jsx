import { Button, HStack, Text, Image, Box, Flex, Icon, Link, IconButton, Tooltip, Collapse, useDisclosure } from "@chakra-ui/react"
import { MdOutlineLocationOn } from "react-icons/md";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { FaCheckSquare, FaRegCheckSquare } from "react-icons/fa";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { capitalize } from "../../utils/utils";

const JobListItem = (props) => {
    const getValueString = (value) => {
        if (Array.isArray(value)) {
            return value.length ? value.map(capitalize).join(" , ") : 'NA'
        }
        return value ?? "NA"
    }
    const { isOpen, onToggle } = useDisclosure()
    const { _id, title, location, link, isApplied, isBookmarked, company, handleApplied, handleBookmark, extra } = props
    return <Box><Flex align="center" justify="space-between">
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
                    onClick={() => handleBookmark(_id, isBookmarked)}
                />
            </Tooltip>
            <Tooltip label='Applied'>
                <IconButton
                    icon={<Icon as={isApplied ? FaCheckSquare : FaRegCheckSquare} />}
                    onClick={() => handleApplied(_id, isApplied)}
                />
            </Tooltip>
            <Tooltip label='Show more'>
                <IconButton
                    icon={isOpen ? <ChevronUpIcon w={6} h={6} /> : <ChevronDownIcon w={6} h={6} />}
                    onClick={onToggle}
                />
            </Tooltip>
        </HStack>

    </Flex>
        <Collapse in={isOpen} animateOpacity>
            <Box
                p='20px'
                shadow='md'
            >
                {extra && (Object.entries(extra).map(([key, value]) => <HStack key={key}>
                    <Text fontWeight="bold">{capitalize(key)} : </Text>
                    <Text>{getValueString(value)}</Text>
                </HStack>))}
            </Box>
        </Collapse>
    </Box>
}

export default JobListItem