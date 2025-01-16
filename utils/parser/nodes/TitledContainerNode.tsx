import { TitledContainer } from '@/utils/parser/types'
import React from 'react'
import { Flex } from 'antd'
import { parser } from '@/utils/parser/parser'
import { getStylesFromBaseNode } from '@/utils/parser/lib'

interface Props {
  obj: TitledContainer
}

export const TitledContainerNode: React.FC<Props> = ({ obj }) => {
  return (
    <Flex vertical={true} gap={8}>
      {parser(obj.titleText)}
      {parser(obj.content)}
    </Flex>
  )
}
