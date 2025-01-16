import React from 'react'
import { BaseNode, CenteredContainer } from '../types'
import { getStylesFromBaseNode } from '@/utils/modules/lib'
import { parser } from '@/utils/modules/parser'

interface Props {
  obj: CenteredContainer
}

const CenteredContainerNode = ({ obj }: Props) => {
  const style: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...getStylesFromBaseNode(obj),
  }

  return <div style={style}>{parser(obj.childNode)}</div>
}

export default CenteredContainerNode
