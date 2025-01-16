import {IconText as IconTextType} from "@/app/utils/parser/types";
import React, {forwardRef} from "react";
import {getStylesFromBaseNode} from "@/app/utils/parser/lib";
import {parser} from "@/app/utils/parser/parser";
import {Flex} from "antd";

interface Props {
    obj: IconTextType;
}

export const IconText = forwardRef<HTMLDivElement, Props>(({obj}, ref) => {
    const style: React.CSSProperties = {
        ...(getStylesFromBaseNode(obj)),
    };

    return (
        <Flex ref={ref} style={style} vertical={false} gap={4}>
            {obj.icon}
            {parser(obj.text)}
        </Flex>
    );
});

IconText.displayName = "IconText";
