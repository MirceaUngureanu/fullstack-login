import React from "react";
import { Form, Formik } from "formik"
import { Box, Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"

interface registerProps {

}

const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { username: '', password: '' } }
                onSubmit={ (values) => {
                    console.log(values)
                } }
            >
                { ({isSubmitting}) => (
                    <Form>
                        <InputField
                            label="Username"
                            name="username"
                            placeholder="username"
                        />
                        <Box mt={4}>
                            <InputField
                                label="Password"
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                        </Box>
                        <Button mt={4} isLoading={isSubmitting} variantColor="teal" type="submit">register</Button>
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

export default Register