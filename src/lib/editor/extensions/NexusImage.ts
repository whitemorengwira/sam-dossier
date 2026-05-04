// src/lib/editor/extensions/NexusImage.ts
import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
// import { NexusImageView } from '@/components/editor/NexusImageView'; // We will create this

export type ImageLayout =
  | 'inline'
  | 'wrap-left'
  | 'wrap-right'
  | 'break-text'
  | 'behind-text'
  | 'in-front-text'
  | 'top-bottom';

export interface NexusImageAttrs {
  src: string;
  alt?: string;
  title?: string;
  caption?: string;
  layout: ImageLayout;
  width?: number;
  height?: number;
  cropX?: number;
  cropY?: number;
  cropWidth?: number;
  cropHeight?: number;
  rotation?: number;
  flipH?: boolean;
  flipV?: boolean;
  opacity?: number;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: string;
  borderRadius?: number;
  shadow?: boolean;
  shadowX?: number;
  shadowY?: number;
  shadowBlur?: number;
  shadowColor?: string;
  linkHref?: string;
  documentId?: string;
  storageKey?: string;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    nexusImage: {
      insertNexusImage: (attrs: Partial<NexusImageAttrs>) => ReturnType;
      updateImageLayout: (layout: ImageLayout) => ReturnType;
    }
  }
}

export const NexusImage = Node.create({
  name: 'nexusImage',
  group: 'block inline',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: { default: null },
      alt: { default: '' },
      title: { default: '' },
      caption: { default: '' },
      layout: { default: 'inline' },
      width: { default: null },
      height: { default: null },
      cropX: { default: 0 },
      cropY: { default: 0 },
      cropWidth: { default: 100 },
      cropHeight: { default: 100 },
      rotation: { default: 0 },
      flipH: { default: false },
      flipV: { default: false },
      opacity: { default: 100 },
      borderColor: { default: 'transparent' },
      borderWidth: { default: 0 },
      borderStyle: { default: 'solid' },
      borderRadius: { default: 0 },
      shadow: { default: false },
      shadowX: { default: 4 },
      shadowY: { default: 4 },
      shadowBlur: { default: 16 },
      shadowColor: { default: 'rgba(0,0,0,0.3)' },
      linkHref: { default: null },
      storageKey: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'nexus-image' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['nexus-image', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      insertNexusImage: (attrs) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: { layout: 'inline', ...attrs },
        });
      },
      updateImageLayout: (layout) => ({ commands }) => {
        return commands.updateAttributes(this.name, { layout });
      },
    };
  },
});
