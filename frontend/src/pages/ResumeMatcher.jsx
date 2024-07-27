
import { Button, Container, FormControl, HStack, Input, VStack, FormLabel, Textarea } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { analyzeResume } from "../services/AnalyzeService"


const ResumeMatcher = () => {
    const fileRef = useRef(null)
    const [jobdesc, setJobDesc] = useState("")
    const handleFileChange = (event) => {
        fileRef.current = event.target.files?.[0]
    }
    const handleAnalyzeResume = () => {
        analyzeResume(fileRef.current, jobdesc).then(res => {
            console.log(res)
        })
    }
    return <Container maxW={1000} pt={5}>
        <VStack spacing={4}>
            <HStack>
                <input id="resume" type="file" placeholder="Enter Google Api Key" onChange={handleFileChange} />
            </HStack>
            <Textarea height={200} value={jobdesc} onChange={(event) => setJobDesc(event.target.value)} placeholder="Enter job description"></Textarea>
            <Button onClick={handleAnalyzeResume}>Submit</Button>
        </VStack>
    </Container>
}

export default ResumeMatcher