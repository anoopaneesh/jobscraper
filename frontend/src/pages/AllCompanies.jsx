import { useRef, useState } from "react"
import SearchList from "../components/SearchList"
import { deleteCompany, getCompanies, saveCompany } from "../services/CompanyService"
import CompanyListItem from "../components/AllCompanies/CompanyListItem"
import { Link } from "react-router-dom"
import { Button, useToast } from "@chakra-ui/react"
import CompanyListLoading from "../components/AllCompanies/CompanyListLoading"
import { startScrapeCompany, startScrapeExtraCompany } from "../services/ScrapeService"
import { useSocketData } from "../contexts/SocketContext"

const AllCompanies = () => {
    const [companies, setCompanies] = useState(null)
    const searchTextDataRef = useRef([])
    const { scraping } = useSocketData()
    const toast = useToast()
    const fetchCompaniesData = async (page, searchTextData) => {
        const data = await getCompanies(searchTextData, (page - 1) * 10, 10)
        setCompanies(data?.result)
    }
    const handleDelete = (id) => {
        deleteCompany(id).then(res => {
            if (res.status === 'error') {
                toast({
                    title: res.message,
                    status: "error",
                    isClosable: true,
                })
            } else {
                toast({
                    title: res.result.message,
                    status: "success",
                    isClosable: true,
                })
                setCompanies(oldData => {
                    return {
                        ...oldData,
                        result: oldData?.result?.filter(company => company._id !== id)
                    }
                })
            }
        })
    }
    const handleScrapeClick = (id) => {
        startScrapeCompany(id).then(res => {
            toast({
                title: `Started Scrape at ${res?.timestamp || "NA"}`,
                status: "success",
                isClosable: true,
                duration: 500,
            })
        })
    }
    const handleScrapeExtraClick = (id) => {
        startScrapeExtraCompany([id]).then(res => {
            toast({
                title: `Started Extra Scrape at ${res?.timestamp || "NA"}`,
                status: "success",
                isClosable: true,
                duration: 500,
            })
        })
    }
    const handleActiveToggle = (value, id) => {
        const company = companies?.result?.find(item => item._id === id)
        if (company == null) return;
        saveCompany({
            ...company,
            isActive: value
        }).then(res => {
            if (res.status === 'error') {
                toast({
                    title: res.message,
                    status: "error",
                    isClosable: true,
                })
            } else {
                toast({
                    title: "Company saved",
                    status: "success",
                    isClosable: true,
                    duration: 1000,
                })
                setCompanies(oldData => {
                    const cmpys = [...oldData.result]
                    cmpys.find(item => item._id === id).isActive = value;
                    return {
                        ...oldData,
                        result: cmpys
                    }
                })
            }
        })
    }
    return <SearchList
        fetchData={fetchCompaniesData}
        searchTextDataRef={searchTextDataRef}
        listData={companies}
        placeholder="Search companies"
        listItem={(item) => <CompanyListItem
            key={item._id}
            {...item}
            handleDelete={handleDelete}
            handleActiveToggle={handleActiveToggle}
            handleScrapeClick={handleScrapeClick}
            handleScrapeExtraClick={handleScrapeExtraClick}
            scraping={scraping}
        />}
        loadingItem={<CompanyListLoading />}
        actionItem={<Button as={Link} px={4} to="add">Add Company</Button>}
    />
}

export default AllCompanies