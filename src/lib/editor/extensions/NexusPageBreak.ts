import { Node, mergeAttributes } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    pageBreak: {
      insertPageBreak: () => ReturnType;
    }
  }
}

export const NexusPageBreak = Node.create({
  name: 'pageBreak',
  group: 'block',
  
  parseHTML() {
    return [{ tag: 'div[data-type="page-break"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'page-break', style: 'page-break-after: always;' })];
  },

  addCommands() {
    return {
      insertPageBreak: () => ({ commands }: { commands: Record<string, Function> }) => {
        return commands.insertContent({ type: this.name });
      },
    };
  },
});
