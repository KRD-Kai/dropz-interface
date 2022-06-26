import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import SidebarHeader from "./SidebarHeader";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <Flex direction="column" minH="100vh">
            <header>
                <SidebarHeader>{children}</SidebarHeader>
            </header>
        </Flex>
    );
};

export default Layout;
