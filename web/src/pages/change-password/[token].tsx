import { NextPage } from "next";
import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Form, Formik } from "formik";
import { InputField } from "../../components/InputField";
import { Box, Button, Link } from "@chakra-ui/core";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../ultils/toErrorMap";
import { useRouter } from "next/router";
import { createUrqlClient } from "../../ultils/createUrqlClient";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link"

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter()
    const [, changePassword] = useChangePasswordMutation()
    const [tokenError, setTokenError] = useState("")
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { newPassword: "" } }
                onSubmit={ async (values, { setErrors }) => {
                    const response = await changePassword({ newPassword: values.newPassword, token })

                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(response.data.changePassword.errors)
                        if ("token" in errorMap) {
                            setTokenError(errorMap.token)
                        }
                        setErrors(errorMap)
                    } else if (response.data?.changePassword.user) {
                        // worked
                        await router.push("/")
                    }
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
                        {tokenError ? (
                            <Box>
                                <Box color="Red">{tokenError}</Box>
                                <NextLink href="/forgot-password">
                                    <Link>
                                        Click here to get a new one
                                    </Link>
                                </NextLink>
                            </Box>

                            ) : null}
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

export default withUrqlClient(createUrqlClient, {ssr: false})(ChangePassword)