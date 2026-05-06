'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  Pencil,
  Star,
  ShareNetwork,
  DownloadSimple,
  Trash,
  ArrowSquareOut,
  Info,
} from '@phosphor-icons/react'

interface ContextMenuProps {
  children: React.ReactNode
  onRename: () => void
  onStar: () => void
  onShare: () => void
  onDelete: () => void
  onDownload?: () => void
  onOpenNewTab: () => void
  onViewDetails: () => void
  isStarred: boolean
}

export default function ContextMenu({
  children,
  onRename,
  onStar,
  onShare,
  onDelete,
  onDownload,
  onOpenNewTab,
  onViewDetails,
  isStarred,
}: ContextMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="context-menu-content"
          sideOffset={5}
          align="end"
        >
          <DropdownMenu.Item className="context-menu-item" onSelect={onOpenNewTab}>
            <ArrowSquareOut size={14} weight="duotone" />
            Open in new tab
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="context-menu-separator" />

          <DropdownMenu.Item className="context-menu-item" onSelect={onRename}>
            <Pencil size={14} weight="duotone" />
            Rename
          </DropdownMenu.Item>

          <DropdownMenu.Item className="context-menu-item" onSelect={onStar}>
            <Star size={14} weight={isStarred ? 'fill' : 'duotone'} />
            {isStarred ? 'Remove from starred' : 'Add to starred'}
          </DropdownMenu.Item>

          {onDownload && (
            <DropdownMenu.Item className="context-menu-item" onSelect={onDownload}>
              <DownloadSimple size={14} weight="duotone" />
              Download
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="context-menu-separator" />

          <DropdownMenu.Item className="context-menu-item" onSelect={onShare}>
            <ShareNetwork size={14} weight="duotone" />
            Share
          </DropdownMenu.Item>

          <DropdownMenu.Item className="context-menu-item" onSelect={onViewDetails}>
            <Info size={14} weight="duotone" />
            View details
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="context-menu-separator" />

          <DropdownMenu.Item className="context-menu-item context-menu-item-danger" onSelect={onDelete}>
            <Trash size={14} weight="duotone" />
            Remove
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
