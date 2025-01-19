import React, { forwardRef } from 'react';
import { CenteredContainer } from '../types';
import { getStylesFromBaseNode } from "@/utills/parser/lib";
import { parser } from "@/utills/parser/parser";

interface Props {
    obj: CenteredContainer;
}

const CenteredContainerNode = forwardRef<HTMLDivElement, Props>(({ obj }, ref) => {
    const style: React.CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...(getStylesFromBaseNode(obj)),
    };

    return (
        <div ref={ref} style={style}>
            {parser(obj.childNode)}
        </div>
    );
});

CenteredContainerNode.displayName = "CenteredContainerNode";

export default CenteredContainerNode;
