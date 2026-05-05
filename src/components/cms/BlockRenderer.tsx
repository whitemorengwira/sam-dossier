'use client'

import React from 'react'
import { BlockData } from '@/lib/store/useCmsStore'
import { EditableBlock } from './EditableBlock'
import {
  TextBlock,
  StatCard,
  TeamMemberCard,
  ImageBanner,
  TwoColumnLayout,
  CalloutBox,
  Divider,
  RichTable
} from './blocks'

interface BlockRendererProps {
  block: BlockData
}

export function BlockRenderer({ block }: BlockRendererProps) {
  let Content = null

  switch (block.type) {
    case 'TextBlock':
      Content = <TextBlock {...block.props} />
      break
    case 'StatCard':
      Content = <StatCard {...block.props} />
      break
    case 'TeamMemberCard':
      Content = <TeamMemberCard {...block.props} />
      break
    case 'ImageBanner':
      Content = <ImageBanner {...block.props} />
      break
    case 'TwoColumnLayout':
      Content = <TwoColumnLayout {...block.props} />
      break
    case 'CalloutBox':
      Content = <CalloutBox {...block.props} />
      break
    case 'Divider':
      Content = <Divider {...block.props} />
      break
    case 'RichTable':
      Content = <RichTable {...block.props} />
      break
    default:
      Content = <div className="p-4 border border-danger text-danger">Unknown block type: {block.type}</div>
  }

  return (
    <EditableBlock id={block.id}>
      {Content}
    </EditableBlock>
  )
}
