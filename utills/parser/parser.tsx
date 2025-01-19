import React, {useEffect, useState} from 'react';
import {
    BaseNode,
    CenteredContainer,
    IconText as IconTextType, Link,
    NodeType,
    Stack,
    Text,
    TitledContainer
} from "@/utills/parser/types";
import StackNode from "@/utills/parser/nodes/StackNode";
import {TextNode} from "@/utills/parser/nodes/TextNode";
import {IconText} from "@/utills/parser/nodes/IconText";
import {TitledContainerNode} from "@/utills/parser/nodes/TitledContainerNode";
import CenteredContainerNode from "@/utills/parser/nodes/CenteredContainerNode";
import {ArcherElement} from "react-archer";


const isShowComponentName = false;

const isStackNode = (node: BaseNode): node is Stack => node.nodeType === NodeType.STACK;
const isTextNode = (node: BaseNode): node is Text => node.nodeType === NodeType.TEXT;
const isIconText = (node: BaseNode): node is IconTextType => node.nodeType === NodeType.ICON_TEXT;
const isTitledContainer = (node: BaseNode): node is TitledContainer => node.nodeType === NodeType.TITLED_CONTAINER;
const isCenteredContainer = (node: BaseNode): node is CenteredContainer => node.nodeType === NodeType.CENTERED_CONTAINER;


/**
 * Renders the given BaseNode tree dynamically and connects elements using react-archer.
 */
export const parser = (obj: BaseNode): React.ReactNode => {
    const renderChildren = (children: BaseNode[] | undefined) => {
        return children?.map((child) => parser(child));
    };

    if (isStackNode(obj)) {
        return (
            <ArcherElement
                key={obj.id}
                id={obj.id}
                relations={
                    obj.links?.filter((l) => {
                        return l.fromId == obj.id;
                    }).map((link: Link) => {
                        return {
                            targetId: link.toId,
                            sourceAnchor: "bottom",
                            targetAnchor: "top",
                        }
                    }) || []
                }
            >
                <StackNode obj={obj}>{renderChildren(obj.children)}</StackNode>
            </ArcherElement>
        );
    }

    if (isTextNode(obj)) {
        return (
            <ArcherElement
                key={obj.id}
                id={obj.id}
            >
                <TextNode obj={obj}/>
            </ArcherElement>
        );
    }

    if (isIconText(obj)) {
        return (
            <ArcherElement
                key={obj.id}
                id={obj.id}
            >
                <IconText obj={obj}/>
            </ArcherElement>
        );
    }

    if (isTitledContainer(obj)) {
        return (
            <ArcherElement
                key={obj.id}
                id={obj.id}
                relations={
                    obj.links?.filter((l) => {
                        return l.fromId == obj.id;
                    }).map((link: Link) => {
                        return {
                            targetId: link.toId,
                            sourceAnchor: "bottom",
                            targetAnchor: "top",
                        }
                    }) || []
                }
            >
                <TitledContainerNode obj={obj}/>
            </ArcherElement>
        );
    }

    if (isCenteredContainer(obj)) {
        return (
            <ArcherElement
                key={obj.id}
                id={obj.id}
                relations={
                    obj.links?.filter((l) => {
                        return l.fromId == obj.id;
                    }).map((link: Link) => {
                        return {
                            targetId: link.toId,
                            sourceAnchor: "bottom",
                            targetAnchor: "top",
                        }
                    }) || []
                }
            >
                <CenteredContainerNode obj={obj}/>
            </ArcherElement>
        );
    }

    return <div key={obj.id}>Unknown Node Type</div>;
};
