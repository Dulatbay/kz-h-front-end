import { TitledContainer } from '@/utils/modules/types'
import React from 'react'
import { Flex } from 'antd'
import { parser } from '@/utils/modules/parser'
import { getStylesFromBaseNode } from '@/utils/modules/lib'

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
