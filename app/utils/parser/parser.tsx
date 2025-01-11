import React from 'react';
import {
    BaseNode,
    CenteredContainer,
    IconText as IconTextType,
    NodeType,
    Stack,
    Text,
    TitledContainer
} from "@/app/utils/parser/types";
import StackNode from "@/app/utils/parser/nodes/StackNode";
import {TextNode} from "@/app/utils/parser/nodes/TextNode";
import {IconText} from "@/app/utils/parser/nodes/IconText";
import {TitledContainerNode} from "@/app/utils/parser/nodes/TitledContainerNode";
import CenteredContainerNode from "@/app/utils/parser/nodes/CenteredContainerNode";


const isShowComponentName = false;

const isStackNode = (node: BaseNode): node is Stack => node.nodeType === NodeType.STACK;
const isTextNode = (node: BaseNode): node is Text => node.nodeType === NodeType.TEXT;
const isIconText = (node: BaseNode): node is IconTextType => node.nodeType === NodeType.ICON_TEXT;
const isTitledContainer = (node: BaseNode): node is TitledContainer => node.nodeType === NodeType.TITLED_CONTAINER;
const isCenteredContainer = (node: BaseNode): node is CenteredContainer => node.nodeType === NodeType.CENTERED_CONTAINER;

export const parser = (obj: BaseNode): React.ReactNode => {
    if (isStackNode(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <StackNode obj={obj}>
                    {obj.children.map((childObj, index) => (
                        <div key={index}>{parser(childObj)}</div>
                    ))}
                </StackNode>
            </>
        );
    }

    if (isTextNode(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <TextNode obj={obj}/>
            </>
        );
    }

    if (isIconText(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <IconText obj={obj}/>
            </>
        )
    }

    if (isTitledContainer(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <TitledContainerNode obj={obj}/>
            </>
        )
    }

    if (isCenteredContainer(obj)) {
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <CenteredContainerNode obj={obj}/>
            </>
        )
    }

    return <div>Unknown Node Type</div>;
};

