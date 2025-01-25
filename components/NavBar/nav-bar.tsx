'use client'

import React, {ReactNode, useState} from "react";
import {Drawer, Button} from "antd";
import {MenuOutlined} from "@ant-design/icons";
import "./NavBar.css";
import LogoSVG from "@/components/icons/LogoSVG";

const NavBar = ({menu}: { menu: ReactNode }) => {
    const [visible, setVisible] = useState(false);
    return (
        <nav className="navbar">
            <Button
                className="menu"
                type="primary"
                icon={<MenuOutlined/>}
                onClick={() => setVisible(true)}
            />
            <Drawer
                title="Topics"
                placement="left"
                onClick={() => setVisible(false)}
                onClose={() => setVisible(false)}
                visible={visible}
            >
                {menu}
            </Drawer>
            <a href="/"><LogoSVG/></a>
        </nav>
    );
};
export default NavBar;