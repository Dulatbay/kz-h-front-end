import {TitledContainer} from "@/app/utils/parser/types";
import React from "react";
import {Flex} from "antd";
import {parser} from "@/app/utils/parser/parser";
import {getStylesFromBaseNode} from "@/app/utils/parser/lib";

interface Props {
    obj: TitledContainer;
}

export const TitledContainerNode: React.FC<Props> = ({obj}) => {
    return (
        <Flex vertical={true} gap={8}>
            {parser(obj.titleText)}
            {parser(obj.content)}
        </Flex>
    )
}
