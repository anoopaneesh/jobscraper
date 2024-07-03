import { Button, Checkbox, FormControl, FormErrorMessage, FormLabel, HStack, Input, Textarea, VStack } from "@chakra-ui/react"
import EditorDialog from "./EditorDialog"
import { EditIcon } from "@chakra-ui/icons"
import { useFormikContext } from "formik"
import { extractApiTemplate, extractWebTemplate, getPageTemplate } from "../../common/constant"

const SaveForm = (props) => {
    const {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        handleCancel
    } = props
    const { setFieldValue } = useFormikContext()
    return <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
            <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    placeholder="Enter name"
                />
                {errors.name && <FormErrorMessage>Email is required.</FormErrorMessage>}
            </FormControl>
            {/* <FormControl isInvalid={errors.image}>
                <FormLabel>Image Url</FormLabel>
                <Input
                    type="text"
                    name="image"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    placeholder="Enter image url"
                />
                {errors.image && <FormErrorMessage>Image url is required.</FormErrorMessage>}
            </FormControl> */}
            <FormControl>
                <Checkbox name="isApi" onChange={handleChange} checked={values.isApi} defaultChecked={values.isApi}>Is Api ?</Checkbox>
            </FormControl>
            <FormControl isInvalid={errors.link}>
                <FormLabel>Job Portal Url</FormLabel>
                <Input
                    type="text"
                    name="link"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.link}
                    placeholder="Enter link"
                />
                {errors.link && <FormErrorMessage>Job Portal url is required.</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.linkedin}>
                <FormLabel>Linkedin Url</FormLabel>
                <Input
                    type="text"
                    name="linkedin"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.linkedin}
                    placeholder="Enter link"
                />
                {errors.linkedin && <FormErrorMessage>linkedin url is required.</FormErrorMessage>}
            </FormControl>
            <FormControl>
                <Checkbox name="isActive" onChange={handleChange} checked={values.isActive} defaultChecked={values.isActive}>Is Active ?</Checkbox>
            </FormControl>
            <FormControl isInvalid={errors.api} mt={4}>
                <HStack justify="space-between" mb={4}>
                    <FormLabel>API Extract Function</FormLabel>
                    <EditorDialog
                        title="API Extract Function"
                        buttonTitle="Open Editor"
                        onSubmit={(value) => setFieldValue('api', value)}
                        defaultValue={values.api}
                        comments={extractApiTemplate}
                    />
                </HStack>
                <Textarea
                    name="api"
                    value={values.api}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter function to extract api'
                    size='md'
                />
                {errors.api && <FormErrorMessage>{errors.api}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.scrape} mt={4}>
                <HStack justify="space-between" mb={4}>
                    <FormLabel>Web Scrape Function</FormLabel>
                    <EditorDialog
                        title="Web Scrape Function"
                        buttonTitle="Open Editor"
                        onSubmit={(value) => setFieldValue('scrape', value)}
                        defaultValue={values.scrape}
                        comments={extractWebTemplate}
                    />
                </HStack>
                <Textarea
                    name="scrape"
                    value={values.scrape}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter function to scrape page'
                    size='md'
                />
                {errors.scrape && <FormErrorMessage>{errors.scrape}</FormErrorMessage>}
            </FormControl>
            <FormControl isInvalid={errors.page} mt={4}>
                <HStack justify="space-between" mb={4}>
                    <FormLabel>Page Retrieve Function</FormLabel>
                    <EditorDialog
                        title="Page Retrieve Function"
                        buttonTitle="Open Editor"
                        onSubmit={(value) => setFieldValue('page', value)}
                        defaultValue={values.page}
                        comments={getPageTemplate}
                    />
                </HStack>
                <Textarea
                    name="page"
                    value={values.page}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder='Enter function to get options for retrieving page'
                    size='md'
                />
                {errors.page && <FormErrorMessage>{errors.page}</FormErrorMessage>}
            </FormControl>
            <HStack>
                <Button type="submit" disabled={isSubmitting}>
                    Save
                </Button>
                <Button type="button" onClick={() => handleCancel()}>
                    Cancel
                </Button>
            </HStack>
        </VStack>
    </form>
}

export default SaveForm