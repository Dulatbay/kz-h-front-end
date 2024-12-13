import React, {ReactNode} from 'react';
import {Flex} from "antd";
import {Stack} from "@/app/utils/parser/types";
import {getStylesFromBaseNode} from "@/app/utils/parser/lib";

interface Props {
    obj: Stack;
    children: ReactNode[];
}

const StackNode = ({obj, children}: Props) => {
    const style: React.CSSProperties = {
        ...(getStylesFromBaseNode(obj))
    };

    return (
        <Flex
            gap={obj.gap}
            vertical={obj.vertical}
            style={style}>
            {children}
        </Flex>
    );
};

export default StackNode;


