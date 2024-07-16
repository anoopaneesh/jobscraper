import { createContext, useContext, useState, useEffect } from 'react'
import { socket } from '../services/Socket';
import { Events } from '../common/constant';
import { useToast } from '@chakra-ui/react';

const SocketContext = createContext({
    isConnected: false,
    scraping: false,
    logEntries: []
})


const SocketProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [logEntries, setLogEntries] = useState([])
    const [scraping, setScraping] = useState(false)
    const toast = useToast()
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function scrapestarted() {
            setScraping(true)
        }
        function scrapeEnded(data) {
            console.log(data)
            if (data.error) {
                toast({
                    title: data.error,
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                })
            } else {
                toast({
                    title: `${data.count} Jobs Scraped`,
                    status: "success",
                    isClosable: true,
                    duration: 2000,
                })
            }
            setScraping(false)
        }
        function scrapeextraEnded(data) {
            if (data.error) {
                toast({
                    title: data.error,
                    status: "error",
                    isClosable: true,
                    duration: 2000,
                })
            } else {
                toast({
                    title: `Job Extra Scraped`,
                    status: "success",
                    isClosable: true,
                    duration: 2000,
                })
            }
            setScraping(false)
        }
        function addLogEntry(message) {
            setLogEntries(oldData => [message, ...oldData])
        }

        socket.connect()
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on(Events.SCRAPE_START, scrapestarted)
        socket.on(Events.SCRAPE_END, scrapeEnded)
        socket.on(Events.LOG_ENTRY, addLogEntry)
        socket.on(Events.SCRAPE_EXTRA_START, scrapestarted)
        socket.on(Events.SCRAPE_EXTRA_END, scrapeextraEnded)

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off(Events.SCRAPE_START, scrapestarted)
            socket.off(Events.SCRAPE_END, scrapeEnded)
            socket.off(Events.LOG_ENTRY, addLogEntry)
            socket.off(Events.SCRAPE_EXTRA_START, scrapestarted)
            socket.off(Events.SCRAPE_EXTRA_END, scrapeextraEnded)
            socket.disconnect()
        };
    }, []);
    return <SocketContext.Provider value={{ isConnected, scraping, logEntries }}>
        {children}
    </SocketContext.Provider>
}

export default SocketProvider

export const useSocketData = () => useContext(SocketContext)