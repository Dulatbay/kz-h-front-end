import React, {ReactNode} from 'react';
import {Stack} from "@/app/utils/parser/types";
import {getAlignItemsValue, getEnumValue, getStylesFromBaseNode} from "@/app/utils/parser/lib";

interface Props {
    obj: Stack;
    children: ReactNode[];
}

const StackNode = ({obj, children}: Props) => {


    const style: React.CSSProperties = {
        display: 'flex',
        flexDirection: obj.vertical ? 'column' : 'row',
        ...(getStylesFromBaseNode(obj)),
        ...(obj.flexWrap && {flexWrap: obj.flexWrap}),
        ...(obj.justifyContent && { justifyContent: getEnumValue(obj.justifyContent) }),
        ...(obj.alignItems && { alignItems: getAlignItemsValue(obj.alignItems) }),
        ...(obj.alignItems && {alignItems: obj.alignItems}),
        ...(obj.gap && {gap: `${obj.gap}px`}),
    };

    return (
        <div style={style}>
            {children}
        </div>
    );
};

export default StackNode;
