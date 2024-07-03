import { Box, Button, HStack, Input, Tag, TagCloseButton, TagLabel, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react"



const SearchBox = (props) => {
    const { setSearchTextData, searchTextData, action, placeholder } = props
    const toast = useToast()
    const [searchText, setSearchText] = useState("")
    const handleSearch = () => {
        if (!searchText?.trim() || searchText?.trim()?.length < 3 || searchTextData.includes(searchText)) {
            toast({
                title: searchTextData.includes(searchText) ? `${searchText} already added` : "Enter atleast 3 characters",
                status: "error",
                isClosable: true,
                duration: 1000
            })
            return
        }
        setSearchText("")
        setSearchTextData(oldState => [searchText, ...oldState])
    }
    const handleTagClose = (text) => {
        setSearchTextData(oldData => oldData.filter(item => item != text))
    }
    return <VStack spacing={4} align="stretch">
        <HStack>
            <Input
                placeholder={placeholder}
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
            />
            <Button
                onClick={handleSearch}
            >Search</Button>
            {action ? action : <></>}
        </HStack>
        <HStack
            wrap="wrap"
        >
            {searchTextData.map(text =>
                <Tag
                    key={text}
                    size="lg"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                >
                    <TagLabel>{text}</TagLabel>
                    <TagCloseButton onClick={() => handleTagClose(text)} />
                </Tag>)}
        </HStack>
    </VStack>
}

export default SearchBox