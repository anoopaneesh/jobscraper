import { Button, Input, Text, HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react";
const Pagination = (props) => {
    const { total, rowsPerPage, handlePageChange, page } = props;
    const pages = Math.ceil((total || 1) / (rowsPerPage || 1))
    const handleChangeBtn = (id) => {
        handlePageChange(page + id)
    } 
    const handlePageInputChange = (event) => {
        const val = Number(event.target.value)

        if (val >= 1 && val <= pages)
            handlePageChange(Number(event.target.value))
    }
    return <HStack justify="center" align="center" spacing={4}>
        <Button onClick={() => handleChangeBtn(-1)} isDisabled={page === 1}>Prev</Button>
        <Input maxW={20} min="1" max={pages} type="text" value={page} onChange={handlePageInputChange} />
        <Text>{`/ ${pages}`}</Text>
        <Button onClick={() => handleChangeBtn(1)} isDisabled={page === pages}>Next</Button>
    </HStack>
}

export default Pagination