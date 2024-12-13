import React from 'react';
import {Text} from '../types';
import {getColor, getFontSize, getFontWeight, getStylesFromBaseNode} from "@/app/utils/parser/lib";

interface Props {
    obj: Text;
}

export const TextNode = ({obj}: Props) => {
        const style: React.CSSProperties = {
            ...(obj.fontColor && {color: getColor(obj.fontColor)}),
            ...(obj.fontWeight && {fontWeight: getFontWeight(obj.fontWeight)}),
            ...(obj.fontSize && {fontSize: getFontSize(obj.fontSize)}),
            ...(obj.textAlign && {textAlign: obj.textAlign }),
            ...(getStylesFromBaseNode(obj))
        };

        return <p style={style} dangerouslySetInnerHTML={{__html: obj.htmltext}}></p>;
    }
;

export default TextNode;
