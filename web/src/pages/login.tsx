import React from "react";
import { Form, Formik } from "formik"
import { Box, Button } from "@chakra-ui/core";
import Wrapper from "../components/Wrapper"
import { InputField } from "../components/InputField"
import { useLoginMutation} from "../generated/graphql";
import { toErrorMap } from "../ultils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../ultils/createUrqlClient";

const Login: React.FC<{}> = ({}) => {
    const router = useRouter()
    const [ {}, login ] = useLoginMutation()

    return (
        <Wrapper variant="small">
            <Formik
                initialValues={ { usernameOrEmail: '', password: '' } }
                onSubmit={ async (values, {setErrors}) => {
                    const response = await login(values)
                    if (response.data?.login.errors) {
                        setErrors(toErrorMap(response.data.login.errors))
                    } else if (response.data?.login.user) {
                        // worked
                        await router.push("/")
                    }
                } }
            >
                { ({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            label="Username or Email"
                            placeholder="Username or Email"
                        />
                        <Box mt={ 4 }>
                            <InputField
                                name="password"
                                label="Password"
                                placeholder="password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={ 4 }
                            isLoading={ isSubmitting }
                            variantColor="teal"
                            type="submit">login</Button>
                    </Form>
                ) }
            </Formik>
        </Wrapper>
    )
}

export default withUrqlClient(createUrqlClient)(Login)
