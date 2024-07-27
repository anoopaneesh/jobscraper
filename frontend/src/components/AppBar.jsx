import { Box, Button, HStack, Heading, Icon, IconButton, Tooltip, useColorMode } from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import { FaBookmark, FaChartSimple, FaRegBookmark, FaSquareCheck } from "react-icons/fa6"
import { FaRegCheckSquare } from "react-icons/fa"
import { IoDocumentText } from "react-icons/io5";

const AppBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return <Box px={10} py={4} bgColor={colorMode === 'light' ? 'white' : '#1A202C'} shadow="sm" position="sticky" top={0} zIndex={10}>
        <HStack align="center" justify="space-between">
            <Box w={40}>
                <Heading as={Link} to="/" size="lg">JobScraper</Heading>
            </Box>
            <HStack spacing={4} align="center">
                <ChakraLink as={Link} to='/'>
                    Jobs
                </ChakraLink>
                <ChakraLink as={Link} to='/companies'>
                    Companies
                </ChakraLink>
                <ChakraLink as={Link} to='/scrape'>
                    Scrapes
                </ChakraLink>
                <ChakraLink as={Link} to='/logs'>
                    Logs
                </ChakraLink>
            </HStack>
            <HStack w={40} justify="flex-end">
                <Tooltip label='Resume Matcher'>
                    <IconButton
                        icon={<Icon as={IoDocumentText} />}
                        as={Link}
                        to="/ats"
                    />
                </Tooltip>
                <Tooltip label='View Analysis'>
                    <IconButton
                        icon={<Icon as={FaChartSimple} />}
                        as={Link}
                        to="/analyze"
                    />
                </Tooltip>
                <Tooltip label='Bookmarked Jobs'>
                    <IconButton
                        icon={<Icon as={FaBookmark} />}
                        as={Link}
                        to={"/?filters=" + JSON.stringify({ isBookmarked: true })}
                    />
                </Tooltip>
                <Tooltip label='Applied Jobs'>
                    <IconButton
                        icon={<Icon as={FaSquareCheck} />}
                        as={Link}
                        to={"/?filters=" + JSON.stringify({ isApplied: true })}
                    />
                </Tooltip>

                <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />} />
            </HStack>
        </HStack>
    </Box>
}

export default AppBar