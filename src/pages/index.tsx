import React from "react";
import CustomTabs from "./tabs";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box>
      <div className="App">
        <CustomTabs />
      </div>
      <div>
        <a href="/crud">CRUD Page</a>
      </div>
    </Box>
  );
};

export default Home;
