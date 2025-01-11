import {IconText as IconTextType} from "@/app/utils/parser/types";
import React, {FC} from "react";
import {getStylesFromBaseNode} from "@/app/utils/parser/lib";
import {parser} from "@/app/utils/parser/parser";
import {Flex} from "antd";

interface Props {
    obj: IconTextType;
}

export const IconText: FC<Props> = ({obj}: Props) => {
    const style: React.CSSProperties = {
        ...(getStylesFromBaseNode(obj))
    };

    return <Flex style={style} vertical={false} gap={4}>
        <>{obj.icon}</>
        {parser(obj.text)}
    </Flex>;
}

