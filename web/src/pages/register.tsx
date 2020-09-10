import React from "react";
import { Form, Formik } from "formik"
import { Box} from "@chakra-ui/core";
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
                { ({ values, handleChange }) => (
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
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

export default Register