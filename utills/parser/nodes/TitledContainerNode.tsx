import { TitledContainer } from "@/utills/parser/types";
import React, { forwardRef } from "react";
import { Flex } from "antd";
import { parser } from "@/utills/parser/parser";
import { getStylesFromBaseNode } from "@/utills/parser/lib";

interface Props {
    obj: TitledContainer;
}

export const TitledContainerNode = forwardRef<HTMLDivElement, Props>(({ obj }, ref) => {
    const containerStyles = {
        ...(getStylesFromBaseNode(obj)),
    };

    return (
        <Flex ref={ref} vertical={true} gap={8} style={containerStyles}>
            {parser(obj.titleText)}
            {parser(obj.content)}
        </Flex>
    );
});

TitledContainerNode.displayName = "TitledContainerNode";

export default TitledContainerNode;
