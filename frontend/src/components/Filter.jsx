import { ChevronDownIcon } from "@chakra-ui/icons"
import { Menu, MenuButton, MenuItemOption, Text, MenuList, MenuOptionGroup, Button, Input, Box, HStack, Checkbox, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { capitalize } from "../utils/utils"



const ALL_FILTERS = 'all'
const Filter = (props) => {
    const { selectedFilters, filters, setSelectedFilters, title, multi , defaultValue } = props
    const [search, setSearch] = useState("")
    const selectedFiltersMap = useMemo(() => selectedFilters.reduce((acc, item) => {
        acc[item] = true
        return acc
    }, {}), [selectedFilters])
    const filteredFilters = useMemo(() => filters.filter(item => item.name.toLowerCase().includes(search))
        , [search, filters])
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
        setSelectedFilters(value ? filters.map(item => item._id) : [])
    }
    const handleChecked = (id, value) => {
        if (multi !== false) setSelectedFilters(oldData => [...oldData.filter(i => i !== id), ...(value ? [id] : [])])
        else setSelectedFilters(value ? [id] : [])

    }
    return <Menu closeOnSelect={false} isLazy>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon marginLeft={5} fontSize={20} />}>
            {title}
        </MenuButton>

        <MenuList>
            <Box>
                <Input type="text" placeholder="Search" variant='flushed' paddingLeft={4} value={search} onChange={(event) => setSearch(event.target.value)} />
                <VStack align="stretch" spacing={2} px={2} mt={2}>
                    {multi !== false && <Checkbox isChecked={selectedFilters.length === filters.length} onChange={(event) => handleCheckAll(event.target.checked)}>
                        Select All
                    </Checkbox>}
                    <VStack maxH={400} align="stretch" spacing={2} px={2} mt={2} overflowY="scroll">
                        {filteredFilters.map(filter => <Checkbox key={filter._id} isChecked={!!selectedFiltersMap[filter._id]} onChange={(event) => handleChecked(filter._id, event.target.checked)}>
                            {capitalize(filter.name)}
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

export default Filter