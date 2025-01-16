import { IconText as IconTextType } from '@/utils/modules/types'
import React, { FC } from 'react'
import { getStylesFromBaseNode } from '@/utils/modules/lib'
import { parser } from '@/utils/modules/parser'
import { Flex } from 'antd'

interface Props {
  obj: IconTextType
}

export const IconText: FC<Props> = ({ obj }: Props) => {
  const style: React.CSSProperties = {
    ...getStylesFromBaseNode(obj),
  }

  return (
    <Flex style={style} vertical={false} gap={4}>
      <>{obj.icon}</>
      {parser(obj.text)}
    </Flex>
  )
}
