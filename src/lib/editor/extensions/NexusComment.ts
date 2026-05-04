import { Mark, mergeAttributes } from '@tiptap/core';

export const NexusComment = Mark.create({
  name: 'comment',
  
  addAttributes() {
    return {
      commentId: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: 'span[data-comment-id]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, { class: 'nexus-comment-mark' }), 0];
  },
});
