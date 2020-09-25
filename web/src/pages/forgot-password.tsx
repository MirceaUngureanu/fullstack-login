import React from 'react';
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../ultils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
    return (
        <div>Forgot password page</div>
    )
}

export default withUrqlClient(createUrqlClient)(ForgotPassword)
