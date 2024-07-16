import { useEffect, useRef, useState } from "react"
import Filter from "../components/Filter"
import SearchList from "../components/SearchList"
import { getAllCompanies } from "../services/CompanyService"
import { getJobs, updateJob } from "../services/JobService"
import JobListItem from "../components/AllJobsPage/JobListItem"
import JobListLoading from "../components/AllJobsPage/JobListLoading"
import { useSearchParams } from "react-router-dom"
import { Heading, useToast } from "@chakra-ui/react"

const AllJobsPage = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    const [selectedCompanies, setSelectedCompanies] = useState([])
    const [companies, setCompanies] = useState([])
    const [jobsData, setJobsData] = useState(null)
    const toast = useToast()
    const searchTextDataRef = useRef([])
    const pageRef = useRef(1)
    const filtersParams = searchParams.get('filters')
    const filters = filtersParams ? JSON.parse(filtersParams) : { isBookmarked: false, isApplied: false }
    const fetchJobsData = async (page, searchTextData) => {
        pageRef.current = page
        searchTextDataRef.current = searchTextData
        const data = await getJobs(filters, searchTextData, selectedCompanies, (page - 1) * 10, 10)
        setJobsData(data?.result)
    }
    const companiesMap = companies.reduce((acc, item) => {
        acc[item._id] = item;
        return acc;
    }, {})
    const bookmarkJob = (id, oldValue) => {
        updateJob(id, { isBookmarked: !oldValue }).then(res => {
            if (res.error) {
                toast({
                    title: res.error,
                    status: "error",
                    isClosable: true,
                    duration: 1000,
                })
            } else {
                fetchJobsData(pageRef.current, searchTextDataRef.current)
                toast({
                    title: !oldValue ? "Job bookmarked" : "Bookmark removed",
                    status: "success",
                    isClosable: true,
                    duration: 1000,
                })
            }
        })
    }
    const handleApplied = (id, oldValue) => {
        updateJob(id, { isApplied: !oldValue }).then(res => {
            if (res.error) {
                toast({
                    title: res.error,
                    status: "error",
                    isClosable: true,
                    duration: 1000,
                })
            } else {
                fetchJobsData(pageRef.current, searchTextDataRef.current)
                toast({
                    title: !oldValue ? "Job Applied" : "Applied Removed",
                    status: "success",
                    isClosable: true,
                    duration: 1000,
                })
            }
        })
    }
    const makeHeader = ({ isBookmarked, isApplied }) => {
        if (isBookmarked) return <Heading size="lg">Bookmarked Jobs</Heading>
        else if (isApplied) return <Heading size='lg'>Applied Jobs</Heading>
        return <></>
    }
    useEffect(() => {
        const companyQuery = searchParams.get('company')
        getAllCompanies().then(data => {
            setCompanies(data.result?.result)
            setSelectedCompanies(companyQuery ? [companyQuery] : data.result?.result.map(item => item._id))
        })
    }, [searchParams])
    return <SearchList
        header={makeHeader(filters)}
        fetchData={fetchJobsData}
        triggerReload={[selectedCompanies]}
        listData={jobsData}
        placeholder="Frontend , Backend etc."
        listItem={(item) => <JobListItem key={item._id} {...item} company={companiesMap[item.company]} handleApplied={handleApplied} handleBookmark={bookmarkJob} />}
        loadingItem={<JobListLoading />}
        actionItem={<Filter
            selectedFilters={selectedCompanies}
            setSelectedFilters={setSelectedCompanies}
            filters={companies}
            title="Companies"
        />}
    />
}

export default AllJobsPage