import React, {useEffect, useState} from 'react';
import {
    BaseNode,
    CenteredContainer,
    IconText as IconTextType, Link,
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
import Arrow from "@/app/utils/parser/nodes/edges/Arrow";


const isShowComponentName = false;

const isStackNode = (node: BaseNode): node is Stack => node.nodeType === NodeType.STACK;
const isTextNode = (node: BaseNode): node is Text => node.nodeType === NodeType.TEXT;
const isIconText = (node: BaseNode): node is IconTextType => node.nodeType === NodeType.ICON_TEXT;
const isTitledContainer = (node: BaseNode): node is TitledContainer => node.nodeType === NodeType.TITLED_CONTAINER;
const isCenteredContainer = (node: BaseNode): node is CenteredContainer => node.nodeType === NodeType.CENTERED_CONTAINER;

export const RenderArrows = ({
                                 links,
                                 refs,
                             }: {
    links: Link[] | undefined;
    refs: { [key: string]: React.RefObject<HTMLDivElement | null> };
}) => {
    const [updateKey, setUpdateKey] = useState(0); // Состояние для ререндера стрелок

    const updateArrows = () => {
        setUpdateKey((prevKey) => prevKey + 1);
    };

    useEffect(() => {
        window.addEventListener("resize", updateArrows);
        return () => {
            window.removeEventListener("resize", updateArrows);
        };
    }, []);

    useEffect(() => {
        console.log("Rendering arrows after refs are initialized:", refs);
    }, [refs]);


    return (
        <>
            {links?.map((link) => {
                const fromRef = refs[link.fromId];
                const toRef = refs[link.toId];

                if (!fromRef.current || !toRef.current) {
                    console.log(`Missing refs for link: ${link.fromId} -> ${link.toId}`);
                    return null;
                }

                return fromRef.current && toRef.current ? (
                    <Arrow
                        key={`${link.fromId}-${link.toId}-${updateKey}`} // Уникальный ключ для ререндера
                        fromRef={fromRef}
                        toRef={toRef}
                    />

                ) : null;
            })}
        </>
    );
};

export const parser = (
    obj: BaseNode,
    refs: { [key: string]: React.RefObject<HTMLDivElement | null> } = {}
): React.ReactNode => {

    if (isStackNode(obj)) {
        const ref = React.createRef<HTMLDivElement>();
        refs[obj.id] = ref
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <div ref={ref}>
                    <StackNode obj={obj}>
                        {obj.children.map((childObj, index) => {
                            const childRef = React.createRef<HTMLDivElement>();
                            refs[childObj.id] = childRef
                            return (
                                <div key={index} ref={childRef}>
                                    {parser(childObj, refs)}
                                </div>
                            );
                        })}
                    </StackNode>
                </div>
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
        const ref = React.createRef<HTMLDivElement>();
        refs[obj.id] = ref
        return (
            <>
                {isShowComponentName && <div>{obj.nodeType}</div>}
                <div ref={ref}>
                    <CenteredContainerNode obj={obj}/>
                </div>
            </>
        )
    }

    return <div>Unknown Node Type</div>;
};

