import React from "react";
import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../ultils/createUrqlClient";

const Index = () => (
  <>
      <NavBar />
      <div>Hello there</div>
  </>
)

export default withUrqlClient(createUrqlClient)(Index)
