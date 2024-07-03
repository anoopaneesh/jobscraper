import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItemOption, Text, MenuList, MenuOptionGroup, Button, Input, Box, HStack, Checkbox, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"



const ALL_COMPANIES = 'all'
const CompaniesFilter = (props) => {
    const { selectedCompanies, companies, setSelectedCompanies } = props
    const [search, setSearch] = useState("")
    const selectedCompaniesMap = useMemo(() => selectedCompanies.reduce((acc, item) => {
        acc[item] = true
        return acc
    }, {}), [selectedCompanies])
    const filteredCompanies = useMemo(() => companies.filter(item => item.name.toLowerCase().includes(search))
        , [search, companies])
    // const handleSelectAll = (value) => {
    //     if (value.includes(ALL_COMPANIES)) {
    //         setSelectedCompanies(companies.map(item => item._id))
    //     } else {
    //         setSelectedCompanies([])
    //     }
    // }
    // const handleMenuChange = (value) => {
    //     setSelectedCompanies(value)
    // }
    const handleCheckAll = (value) => {
        setSelectedCompanies(value ? companies.map(item => item._id) : [])
    }
    const handleChecked = (id, value) => {

        setSelectedCompanies(oldData => [...oldData.filter(i => i !== id), ...(value ? [id] : [])])

    }
    return <Menu closeOnSelect={false} isLazy>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon marginLeft={5} fontSize={20} />}>
            Companies
        </MenuButton>

        <MenuList>
            <Box>
                <Input type="text" placeholder="Search" variant='flushed' paddingLeft={4} value={search} onChange={(event) => setSearch(event.target.value)} />
                <VStack align="stretch" spacing={2} px={2} mt={2}>
                    <Checkbox isChecked={selectedCompanies.length === companies.length} onChange={(event) => handleCheckAll(event.target.checked)}>
                        Select All
                    </Checkbox>
                    <VStack maxH={400} align="stretch" spacing={2} px={2} mt={2} overflowY="scroll">
                        {filteredCompanies.map(company => <Checkbox key={company._id} isChecked={!!selectedCompaniesMap[company._id]} onChange={(event) => handleChecked(company._id, event.target.checked)}>
                            {company.name}
                        </Checkbox>)}
                    </VStack>
                </VStack>
                {/* <MenuOptionGroup
                    type='checkbox'
                    onChange={(value) => handleSelectAll(value)}
                    value={selectedCompanies.length === companies.length ? [ALL_COMPANIES] : []}
                >
                    <MenuItemOption value={ALL_COMPANIES}>Select All</MenuItemOption>
                </MenuOptionGroup>
                <MenuOptionGroup
                    type='checkbox'
                    onChange={(value) => handleMenuChange(value)}
                    value={selectedCompanies}
                >
                    {companieslist.map(company => <MenuItemOption key={company._id} value={company._id}>{company.name}</MenuItemOption>)}

                </MenuOptionGroup> */}

            </Box>

        </MenuList>

    </Menu>
}

export default CompaniesFilter