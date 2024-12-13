import React from 'react';
import {BaseNode, NodeType, Stack, Text} from "@/app/utils/parser/types";
import StackNode from "@/app/utils/parser/nodes/StackNode";
import {TextNode} from "@/app/utils/parser/nodes/TextNode";


const isShowComponentName = false;

const isStackNode = (node: BaseNode): node is Stack => node.nodeType === NodeType.STACK;
const isTextNode = (node: BaseNode): node is Text => node.nodeType === NodeType.TEXT;



export const parser = (obj: BaseNode): React.ReactNode => {
    if (isStackNode(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <StackNode obj={obj}>
                    {obj.children.map((childObj, index) => (
                        <div key={index} className={'w-full'}>{parser(childObj)}</div>
                    ))}
                </StackNode>
            </>
        );
    }

    if (isTextNode(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <TextNode obj={obj} />
            </>
        );
    }

    return <div>Unknown Node Type</div>;
};

