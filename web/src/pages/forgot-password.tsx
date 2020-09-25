import React, { useState } from 'react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../ultils/createUrqlClient";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import { Box, Button, } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

const ForgotPassword: React.FC<{}> = ({}) => {
    const [complete, setComplete] = useState(false)
    const [, forgotPassword] = useForgotPasswordMutation()
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { email: '' } }
                onSubmit={ async (values) => {
                    await forgotPassword(values)
                    setComplete(true )
                } }
            >
                { ({ isSubmitting }) => complete ?
                    <Box>If an account with that email exists, we sent you an email</Box> :
                    (
                    <Form>
                        <InputField
                            name="email"
                            label="Email"
                            placeholder="email"
                            type="email"
                        />
                        <Button
                            mt={ 4 }
                            isLoading={ isSubmitting }
                            variantColor="teal"
                            type="submit">
                            Forgot password
                        </Button>
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
