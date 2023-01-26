import React, { useState }  from 'react';
import { Box, useMediaQuery } from "@mui/material"; // layout & styling
import { Outlet } from 'react-router-dom'; // redner the content of the routes
import { useSelector } from 'react-redux'; // access global state of app
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from 'state/api'; // created in the /state as an api to fetch user data


const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");  // boolean hook to check if screen is wider than 600px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // initializes var with value of true, and setter function that can be used to change value
  const userId = useSelector((state) => state.global.userId); // hook that retrieves userId through a call back function that gets passed the current state
  const { data } = useGetUserQuery(userId); // fetches the user data based on the userId
  
  return ( <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
    <Sidebar
      user= {data || {}} // passes the user data into the side bar or no data 
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      />
    <Box flexGrow={1}>
      <Navbar
          user={data || {}}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
       />
      <Outlet />
    </Box> 
  </Box>
  );
};

export default Layout;
