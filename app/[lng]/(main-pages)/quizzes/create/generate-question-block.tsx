import {Button, Dropdown, MenuProps, Space} from "antd";

export default function GenerateQuestionBlock() {
    const items: MenuProps["items"] = [
        {
            label: <a href="#">1st menu item</a>,
            key: "0",
        },
        {
            label: <a href="#">2nd menu item</a>,
            key: "1",
        },
        {
            label: "3rd menu item",
            key: "3",
        },
    ];

    return (
        <>
            <h1 className="text-[#91898C] mx-auto">Question generating</h1>
            <div className="flex">
                <Dropdown className="h-auto rounded-r-none" menu={{ items }} trigger={["click"]}>
                    <Button>
                        <Space>
                            Topics
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
                <Button className="py-2 px-3 rounded-l-none flex-1 text-start text-sm">
                    Generate question
                </Button>
            </div>
        </>
    );
}

function DownOutlined() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M480-360 280-560h400L480-360Z" />
        </svg>
    );
}