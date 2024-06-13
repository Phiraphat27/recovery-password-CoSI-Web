// components/Sidebar.tsx
import React from "react";
import { Drawer, List, ListItem } from "@material-tailwind/react";

interface SidebarProps {
    isOpen: boolean;
    toggleDrawer: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleDrawer }) => {
    return (
        <Drawer open={isOpen} onClose={toggleDrawer} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <List placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Dashboard</ListItem>
                <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Settings</ListItem>
                <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Profile</ListItem>
                <ListItem placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Logout</ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
