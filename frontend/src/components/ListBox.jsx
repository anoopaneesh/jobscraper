import { Text, VStack, SkeletonText } from "@chakra-ui/react"
import Pagination from "./Pagination"

const ListBox = ({ listData, handlePageChange, page, listItem, loading, loadingItem }) => {

    return <VStack align="stretch" spacing={5}>
        {(listData && !loading) ?
            <>
                <Text>{`${listData?.total} results found`}</Text>
                {listData?.result.map(item => listItem(item))}
                {listData?.total > listData?.limit && <Pagination total={listData?.total} rowsPerPage={listData?.limit} handlePageChange={handlePageChange} page={page} />}
            </> :
            <>
                <SkeletonText noOfLines={1} skeletonHeight={2} width="150px" />
                {loadingItem}
            </>
        }
    </VStack>
}

export default ListBox