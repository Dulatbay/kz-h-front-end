'use client'

import { Button, Menu, ConfigProvider, Input, MenuProps } from "antd"
import DesktopSVG from "@/components/icons/DesktopSVG";
import MobileSVG from "@/components/icons/MobileSVG";
import { useState } from "react";

const sessions = [
    {
      category: "Web Sessions",
      devices: [
        { name: "Windows 11", current: true, deviceType: "desktop" },
        { name: "IOS 19", lastAccess: "Jan 28, 2025", deviceType: "mobile" },
      ],
    },
    {
      category: "Mobile Sessions",
      devices: [
        { name: "iPhone 13", lastAccess: "Jan 28, 2025", deviceType: "mobile" },
      ],
    },
  ];


export default function Settings(){
    const [openedTab, setOpenedTab] = useState('profile');

    return (
        <ConfigProvider theme={{
            token: {
                colorBgContainer: "#161616",
                colorText: "#ffffff",
                colorBorder: "#444",
                colorPrimary: "#4CAF50",
                },
                components: {
                Button: {
                    colorPrimary: "#4CAF50",
                    colorPrimaryHover: "#3e8e41",
                    dangerShadow: 'transparent',
                    primaryShadow: 'transparent',
                    defaultHoverBorderColor: 'white',
                    defaultHoverColor: 'none',
                    defaultActiveColor: 'none',
                    defaultActiveBorderColor: 'none'  
                },
                Menu: {
                    darkItemBg: '#1A1A1A',
                    groupTitleFontSize: 12,
                    darkItemSelectedBg: '#282828',
                    darkGroupTitleColor: '#7D7D7D',
                },
                Input: {
                    colorBgContainer: "#1E1E1E",
                    colorText: "#ffffff",
                    borderRadius: 8,
                    colorTextPlaceholder: '#4f4f4f',
                    hoverBorderColor: 'white',
                    activeBorderColor: 'none'
                    },
                },
        }}>

            <div className="w-full p-3 max-w-[800px] flex mx-auto mt-3 flex-wrap">
                <Sidebar setOpenedTab={(value: string) => {setOpenedTab(value)}}/>
                <Controller openedTab={openedTab}/>  
            </div>

        </ConfigProvider>
    )
}

function Controller({openedTab}: {openedTab: string}){
    switch(openedTab){
        case 'sessions':
            return ( <SessionsSettings/>);
        default: 
            return (<ProfileSettings/>);
    }
}

const Sidebar = ({setOpenedTab} : {setOpenedTab: any}) => {
    type MenuItem = Required<MenuProps>['items'][number];
    const items: MenuItem[] = [
        {
          type: 'group',
          label: 'Settings',
          children: [
            {
              key: 'profile',
              label: 'Profile',
            },
            {
              key: 'preferences',
              label: 'Preferences',
            },
            {
              key: 'sessions',
              label: 'Sessions',
            },
          ],
        },
        {
          type: 'group',
          label: 'Support',
          children: [
            {
              key: 'help-center',
              label: 'Help Center',
            },
            {
              key: 'about',
              label: 'About us',
            },
          ],
        },
        {
          key: 'logout',
          label: 'LOGOUT',
          danger: true,
          className: 'mt-auto border border-red-500 text-center',
        },
      ]
  
    return (
      <Menu
        onClick={(item) => setOpenedTab(item.key)}
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={["profile"]}
        className="lg:max-w-60 rounded-lg text-white !border-[#282828] !border-r-[#282828] !border-r-2 border-2 !p-2 h-fit flex-grow"
        items={items}
      />
    );
  };

const ProfileSettings = () => {
    return (
        <div className="min-h-screen flex flex-col items-center p-6 flex-grow">
          {/* Avatar Section */}
          <div className="flex flex-col items-center">
            <img className="w-32 h-32 bg-gray-600 rounded-full"/>
            <Button className="mt-3" type="default">
              Edit avatar
            </Button>
          </div>
  
          {/* Input Fields */}
          <div className="w-full max-w-md mt-6 flex flex-col gap-2 *:mt-4">
            <label className="text-white">Username</label>
            <Input placeholder="Enter your username" />
  
            <label className="text-white">First Name</label>
            <Input placeholder="Enter your first name" />
  
            <label className="text-white">Last Name</label>
            <Input placeholder="Enter your last name" />
  
            <label className="text-white">Email</label>
            <Input placeholder="Enter your email" />
            <p className="text-sm text-gray-400 !mt-0">
              Email not verified.{" "}
              <a href="#" className="text-blue-400">
                Verify now
              </a>
            </p>
  
            <Button type="primary" block>
              SAVE CHANGES
            </Button>
          </div>
  
          {/* Divider */}
          <div className="w-full my-4 h-[1px] bg-neutral-500" />
  
          {/* Password Section */}
          <div className="w-full flex justify-between items-center max-w-md">
            <label className="text-white">Password</label>
            <Button className="mt-2 !bg-neutral-700 text-white">
              Change password
            </Button>
          </div>

          <div className="w-full my-4 h-[1px] bg-neutral-500" />
  
          {/* Delete Account */}
          <div className="w-full max-w-md flex items-center justify-between">
            <label className="text-white">Delete my account</label>
            <Button danger className="!px-10">
              DELETE
            </Button>
          </div>
        </div>
    );
};

function SessionsSettings() {
    return (
        <div className="min-h-screen flex flex-col flex-grow items-center p-6">
          <div className="w-full max-w-lg">
            {sessions.map((section, index) => (
              <div key={index} className="flex flex-col">
                <h2 className="text-white text-lg font-semibold mb-3">{section.category}</h2>
                {section.devices.map((device, i) => (
                  <div key={i} className="bg-[#1E1E1E] flex items-center justify-between text-white mb-3 border border-white px-4 py-3 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <span className="text-xl">{<DeviceIcon device={device.deviceType} />}</span>
                      <div>
                        <p className="font-medium">{device.name}</p>
                        {device.current ? (
                          <p className="text-blue-400 text-sm">Your current session</p>
                        ) : (
                          <p className="text-gray-400 text-sm">Last accessed on {device.lastAccess}</p>
                        )}
                      </div>
                    </div>
                    <a className="text-gray-400 text-sm hover:text-white">View more</a>
                  </div>
                ))}
              </div>
            ))}
          </div>
  
          {/* Terminate All Button */}
          <Button
            type="default"
            danger
            className="border-red-500 text-red-500 w-full max-w-lg mt-6 py-2 text-lg"
          >
            TERMINATE ALL
          </Button>
        </div>
    );
};

function DeviceIcon({device}: {device: string}){
    if(device === "mobile") return <MobileSVG/>;
    else return <DesktopSVG/>;
}