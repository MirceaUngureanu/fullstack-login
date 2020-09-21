import React from "react";
import { Form, Formik } from "formik"
import { Box, Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../ultils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../ultils/createUrqlClient";

interface registerProps {

}


const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter()
    const [ {}, register ] = useRegisterMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { username: '', password: '' } }
                onSubmit={ async (values, {setErrors}) => {
                    const response = await register(values)
                    if (response.data?.register.errors) {
                        setErrors(toErrorMap(response.data.register.errors))
                    } else if (response.data?.register.user) {
                        // worked
                        await router.push("/")
                    }
                } }
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <InputField
                            label="Username"
                            name="username"
                            placeholder="username"
                        />
                        <Box mt={ 4 }>
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={ 4 }
                            isLoading={ isSubmitting }
                            variantColor="teal"
                            type="submit">register</Button>
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Register)