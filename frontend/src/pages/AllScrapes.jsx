import { useEffect, useRef, useState } from "react"
import SearchList from "../components/SearchList"
import { getLastScrape, getScrapes, startScrape } from "../services/ScrapeService"
import ScrapeListItem from "../components/AllScrapes/ScrapeListItem"
import ScrapeListLoading from "../components/AllScrapes/ScrapeListLoading"
import { Box, Button, HStack, useToast } from "@chakra-ui/react"
import { ScrapeStatus } from "../common/constant"
import { useSocketData } from "../contexts/SocketContext"


const AllScrapes = () => {
    const [scrapes, setScrapes] = useState(null)
    const { scraping } = useSocketData()
    const fetchScrapes = async (page) => {
        const data = await getScrapes((page - 1) * 10, 10)
        setScrapes(data?.result)
    }

    const initiateScrape = () => {
        startScrape()
    }

    useEffect(() => {
        fetchScrapes()
    }, [scraping])

    return <SearchList
        header={
            <HStack justify="flex-end">
                <Box w={200}>
                    <Button isLoading={scraping} onClick={() => initiateScrape()} >Scrape</Button>
                </Box>
            </HStack>
        }
        disableSearch={true}
        fetchData={fetchScrapes}
        listData={scrapes}
        listItem={(item) => <ScrapeListItem key={item._id} {...item} />}
        loadingItem={<ScrapeListLoading />}
    />
}


export default AllScrapes