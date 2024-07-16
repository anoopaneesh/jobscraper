import { Button, HStack, Text, Image, Box, Flex, Link as ChakraLink, FormControl, FormLabel, Switch, IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { MdOutlineLocationOn } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteCompany } from "../../services/CompanyService";
import { ChevronDownIcon, DeleteIcon, EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
const CompanyListItem = (props) => {
    const { name, image, link, linkedin,_id, handleDelete, handleActiveToggle, isActive, handleScrapeClick,handleScrapeExtraClick, extract, scraping } = props
    return <Flex align="center" justify="space-between">
        <HStack align="center">
            <Image
                boxSize='50px'
                objectFit='cover'
                src={image}
                alt={name}
            />
            <Box>

                <ChakraLink as={Link} to={`/?company=${_id}`} fontWeight="bold">{name}</ChakraLink>
                {/* <HStack maxW={400}>
                    <Icon as={MdOutlineLocationOn} />
                    <Text fontSize="sm" align="left">{location.join(", ")}</Text>
                </HStack> */}
                {/* <Text fontSize="sm">{name}</Text> */}
            </Box>

        </HStack>

        <HStack spacing={4} align="center">
            <FormControl display='flex' alignItems='center'>
                <FormLabel htmlFor={`isActive_${_id}`} mb='0'>
                    Active
                </FormLabel>
                <Switch id={`isActive_${_id}`} onChange={(event) => handleActiveToggle(event.target.checked, _id)} defaultChecked={isActive} />
            </FormControl>
            <IconButton
                as={Link}
                to={`edit/${_id}`}
                aria-label={`edit_${_id}`}
                icon={<EditIcon />}
            />
            <IconButton aria-label={`delete_${_id}`} icon={<DeleteIcon />} onClick={() => handleDelete(_id)} colorScheme="red" />
            <Button isDisabled={scraping} px={4} onClick={() => handleScrapeClick(_id)}>
                <Text mx={4}>Scrape</Text>
            </Button>
            <Button isDisabled={scraping || !extract.jobExtra} px={10} onClick={() => handleScrapeExtraClick(_id)}>
                <Text mx={4}>Scrape Extra</Text>
            </Button>
            <Menu>
                <MenuButton as={IconButton} aria-label='open links' icon={<ExternalLinkIcon />} />
                <MenuList>
                    <MenuItem as={ChakraLink} href={link} target="_blank" _hover={{textDecor:"none"}}>Careers page</MenuItem>
                    <MenuItem as={ChakraLink} href={linkedin} target="_blank" _hover={{textDecor:"none"}}>Linkedin</MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    </Flex>
}

export default CompanyListItem