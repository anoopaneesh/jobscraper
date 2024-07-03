import { useEffect, useState } from 'react'
import SearchBox from './SearchBox'
import { Container, VStack } from '@chakra-ui/react'
import ListBox from './ListBox'
const SearchList = (props) => {
    const { actionItem, fetchData, listData, placeholder, listItem, loadingItem, searchTextDataRef, triggerReload, disableSearch, header } = props
    const [searchTextData, setSearchTextData] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const handlePageChange = (page) => {
        setPage(page)
    }
    useEffect(() => {
        setLoading(true)
        const timeout = setTimeout(() => {
            fetchData(page, searchTextData).then(res => setLoading(false)).catch(error => {
                console.log(error)
                setLoading(false)
            })
        }, 500)
        return () => {
            clearTimeout(timeout)
        }
    }, [searchTextData, ...(triggerReload || []), page])
        ||
        useEffect(() => {
            if (searchTextDataRef) {
                searchTextDataRef.current = searchTextData
            }
            setPage(1)
        }, [searchTextData])

    return <Container maxW="6xl" py={10}>
        <VStack spacing={6} align="stretch">
            {header ?? <></>}
            {!disableSearch && <SearchBox
                searchTextData={searchTextData}
                placeholder={placeholder}
                setSearchTextData={setSearchTextData}
                action={actionItem}
            />}
            <ListBox
                loading={loading}
                listData={listData}
                handlePageChange={handlePageChange}
                page={page}
                listItem={listItem}
                loadingItem={loadingItem}
            />
        </VStack>
    </Container>
}

export default SearchList