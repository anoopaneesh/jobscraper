import { ChakraProvider, Container } from '@chakra-ui/react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import AppBar from './components/AppBar'
import AllJobsPage from './pages/AllJobsPage'

import { Suspense, lazy } from 'react'
import CompanyListLoading from './components/AllCompanies/CompanyListLoading'
import ScrapeListLoading from './components/AllScrapes/ScrapeListLoading'
import SocketProvider from './contexts/SocketContext'
import theme from './utils/theme'
const AllCompanies = lazy(() => import('./pages/AllCompanies'))
const SaveCompany = lazy(() => import('./pages/SaveCompany'))
const AllScrapes = lazy(() => import('./pages/AllScrapes'))
const AllLogs = lazy(() => import('./pages/AllLogs'))
const Analysis = lazy(() => import('./pages/Analysis'))
const ResumeMatcher = lazy(() => import('./pages/ResumeMatcher'))

const AppLayout = () => {
    return <>
        <AppBar />
        <Outlet />
    </>
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <AllJobsPage />
            },
            {
                path: "companies",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <CompanyListLoading />
                </Container>}>
                    <AllCompanies />
                </Suspense>,
            },
            {
                path: "scrape",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <ScrapeListLoading />
                </Container>}>
                    <AllScrapes />
                </Suspense>
            },
            {
                path: "logs",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <ScrapeListLoading />
                </Container>}>
                    <AllLogs />
                </Suspense>
            },
            {
                path: "analyze",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <ScrapeListLoading />
                </Container>}>
                    <Analysis />
                </Suspense>
            },
            {
                path: "ats",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <ScrapeListLoading />
                </Container>}>
                    <ResumeMatcher />
                </Suspense>
            },
            {
                path: "companies/add",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <CompanyListLoading />
                </Container>}>
                    <SaveCompany />
                </Suspense>
            },
            {
                path: "companies/edit/:id",
                element: <Suspense fallback={<Container maxW="6xl" py={10}>
                    <CompanyListLoading />
                </Container>}>
                    <SaveCompany />
                </Suspense>
            }
        ]
    },

])



const App = () => {

    return <ChakraProvider theme={theme}>
        <SocketProvider>
            <RouterProvider router={router} />
        </SocketProvider>
    </ChakraProvider>
}

export default App


