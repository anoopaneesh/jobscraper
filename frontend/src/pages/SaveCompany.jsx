import { Alert, AlertIcon, Box, Button, Checkbox, Container, FormControl, FormErrorMessage, FormHelperText, FormLabel, HStack, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import { Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from 'yup';
import { getCompany, saveCompany } from "../services/CompanyService";
import FormLoading from "../components/SaveCompany/FormLoading";
import { EditIcon } from "@chakra-ui/icons";
import EditorDialog from "../components/SaveCompany/EditorDialog";
import SaveForm from "../components/SaveCompany/SaveForm";
const SaveCompany = () => {
    const navigate = useNavigate()
    const toast = useToast()
    const { id } = useParams()
    const [company, setCompany] = useState(null)
    const initalFormValues = {
        name: company?.name ?? "",
        image: company?.image ?? "",
        isApi: company?.isApi ?? false,
        link: company?.link ?? "",
        isActive: company?.isActive ?? true,
        linkedin: company?.linkedin ?? "",
        api: company?.extract.api ?? "",
        scrape: company?.extract.scrape ?? "",
        page: company?.extract.page ?? ""

    }
    const CompanySchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(50, 'Too Long!')
            .required('Name Required'),
        image: Yup.string(),
        isApi: Yup.bool().required('Required'),
        link: Yup.string().min(2, 'Too Short!').required('Link Required'),
        isActive: Yup.bool().required("Required"),
        linkedin: Yup.string().min(2, 'Too Short!').required('Link Required'),
        api: Yup.string().min(2, 'Too Short!'),
        scrape: Yup.string().min(2, 'Too Short!'),
        page: Yup.string().min(2, 'Too Short!'),

    });

    const handleFormSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            const company = {
                name: values.name,
                image: values.image,
                isApi: values.isApi,
                link: values.link,
                isActive: values.isActive,
                linkedin: values.linkedin,
                extract: {
                    api: values.api,
                    scrape: values.scrape,
                    page: values.page
                }
            }
            if (id) {
                company._id = id
            }
            saveCompany(company).then(res => {
                if (res.status === 'error') {
                    toast({
                        title: res.message,
                        status: "error",
                        isClosable: true,
                        duration: 1000,
                    })
                } else {
                    toast({
                        title: "Company saved",
                        status: "success",
                        isClosable: true,
                        duration: 1000,
                        onCloseComplete: () => {
                            navigate("/companies");
                        }
                    })
                }
                setSubmitting(false);
            })

        }, 400);
    }
    const handleCancel = () => {
        navigate("/companies");
    }
    useEffect(() => {
        if (id) {
            getCompany(id).then((res) => setCompany(res.result))
        }
    }, [])
    return <Container maxW={500} pt={5}>
        {(company || !id) ? <><Heading size="md" mb={5}>
            {id ? "Edit Company" : "Add Company"}
        </Heading>
            <Formik
                initialValues={initalFormValues}
                validationSchema={CompanySchema}
                onSubmit={handleFormSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                }) => (
                    <SaveForm
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleSubmit={handleSubmit}
                        isSubmitting={isSubmitting}
                        handleCancel={handleCancel}
                    />
                )}
            </Formik></>
            : <FormLoading />}</Container>
}

export default SaveCompany