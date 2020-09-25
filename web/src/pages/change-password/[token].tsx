import { NextPage } from "next";
import React from "react";
import Wrapper from "../../components/Wrapper";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { Button } from "@chakra-ui/core";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { newPassword: "" } }
                onSubmit={ async (values, { setErrors }) => {
                    // const response = await login(values)
                    // if (response.data?.login.errors) {
                    //     setErrors(toErrorMap(response.data.login.errors))
                    // } else if (response.data?.login.user) {
                    //     // worked
                    //     await router.push("/")
                    // }
                } }
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            label="New Password"
                            placeholder="New Password"
                            type="password"
                        />
                        <Button
                            mt={ 4 }
                            isLoading={ isSubmitting }
                            variantColor="teal"
                            type="submit">change password</Button>
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string
    }
}

export default ChangePassword