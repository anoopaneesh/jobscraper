import { Box, Container, HStack } from '@chakra-ui/react';
import { BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, Bar } from 'recharts'
import Filter from '../components/Filter';
import { useEffect, useMemo, useState } from 'react';
import { getAllCompanies } from '../services/CompanyService';
import { useSearchParams } from 'react-router-dom';
import { analyzeCompanies } from '../services/AnalyzeService';
import { capitalize } from '../utils/utils';
const Analysis = () => {
    const [searchParams] = useSearchParams()
    const [analysis, setAnalysis] = useState(null)
    const data = useMemo(() => {
        if (!analysis) return {}
        const d = {}
        Object.entries(analysis).forEach(([key, value]) => {
            d[key] = Object.entries(value).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count)
        })

        return d
    }, [analysis])
    const [selectedCompanies, setSelectedCompanies] = useState([])
    const [companies, setCompanies] = useState([])
    const [selectedExtras, setSelectedExtras] = useState([])
    useEffect(() => {
        const companyQuery = searchParams.get('company')
        getAllCompanies({ skills: true }).then(data => {
            setCompanies(data.result?.result)
            setSelectedCompanies(companyQuery ? [companyQuery] : data.result?.result.map(item => item._id))
        })
    }, [])
    useEffect(() => {
        analyzeCompanies(selectedCompanies).then(({ result, error }) => {
            setAnalysis(result)
            setSelectedExtras([Object.keys(result)[0]])
        })
    }, [selectedCompanies])
    useEffect(() => {
        console.log(selectedExtras)
    },[selectedExtras])
    return <Container maxW={1000} pt={5}>
        <HStack>
            <Filter
                selectedFilters={selectedCompanies}
                setSelectedFilters={setSelectedCompanies}
                filters={companies}
                title="Companies"
            />
            <Filter
                selectedFilters={selectedExtras}
                setSelectedFilters={setSelectedExtras}
                filters={data ? Object.keys(data).map(item => ({ name: item, _id: item })) : []}
                title="Extra"
                multi={false}
            />
        </HStack>
        <Box h="80vh" overflowY="scroll" overflowX="hidden">
                <BarChart
                    layout="vertical"
                    compact={false}
                    data={data?.[selectedExtras?.[0]]}
                    width={800}
                    height={Math.max(data?.[selectedExtras?.[0]]?.length, 50) * 30}
                    margin={{
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 30
                    }}
                >
                    {/* <CartesianGrid stroke="#f5f5f5" /> */}
                    <XAxis type="number" />
                    <YAxis dataKey="name" type='category' />
                    <Tooltip />
                    <Bar dataKey="count" fill="#413ea0" />
                </BarChart> 
        </Box>
    </Container>
}

export default Analysis