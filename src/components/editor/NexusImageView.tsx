import React, { useRef, useState, useEffect } from 'react';
import { NodeViewWrapper, NodeViewProps } from '@tiptap/react';
import { ImageLayout } from '@/lib/editor/extensions/NexusImage';

export const NexusImageView: React.FC<NodeViewProps> = (props) => {
  const { node, updateAttributes, selected, editor } = props;
  const {
    src,
    alt,
    title,
    layout,
    width,
    height,
    posX,
    posY,
    borderColor,
    borderWidth,
    borderStyle,
    borderRadius,
    opacity,
  } = node.attrs;

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Resize handler
  const handleResizeStart = (e: React.MouseEvent, corner: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = width || wrapperRef.current?.offsetWidth || 300;
    const startHeight = height || wrapperRef.current?.offsetHeight || 200;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      // Simple uniform scaling for bottom-right
      if (corner === 'br') {
        const newWidth = Math.max(50, startWidth + dx);
        // Maintain aspect ratio roughly if height was auto, or just set explicitly
        updateAttributes({ width: newWidth });
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Drag handler for absolute positioning
  const handleDragStart = (e: React.MouseEvent) => {
    if (layout !== 'behind-text' && layout !== 'in-front-text') return;
    
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startPosX = posX || 0;
    const startPosY = posY || 0;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      updateAttributes({ posX: startPosX + dx, posY: startPosY + dy });
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Determine CSS based on layout
  let containerStyle: React.CSSProperties = {};
  
  if (layout === 'wrap-left') {
    containerStyle = { float: 'left', margin: '0 1rem 1rem 0' };
  } else if (layout === 'wrap-right') {
    containerStyle = { float: 'right', margin: '0 0 1rem 1rem' };
  } else if (layout === 'top-bottom') {
    containerStyle = { display: 'block', margin: '1rem auto', clear: 'both' };
  } else if (layout === 'behind-text') {
    containerStyle = {
      position: 'absolute',
      zIndex: -1,
      left: `${posX}px`,
      top: `${posY}px`,
      cursor: 'move',
    };
  } else if (layout === 'in-front-text') {
    containerStyle = {
      position: 'absolute',
      zIndex: 10,
      left: `${posX}px`,
      top: `${posY}px`,
      cursor: 'move',
    };
  } else {
    // inline
    containerStyle = { display: 'inline-block', verticalAlign: 'bottom', margin: '0.2rem' };
  }

  // Image styles
  const imageStyle: React.CSSProperties = {
    width: width ? `${width}px` : 'auto',
    height: height ? `${height}px` : 'auto',
    opacity: opacity !== undefined ? opacity / 100 : 1,
    border: borderWidth ? `${borderWidth}px ${borderStyle} ${borderColor}` : 'none',
    borderRadius: borderRadius ? `${borderRadius}px` : '0',
    display: 'block',
    maxWidth: '100%',
  };

  return (
    <NodeViewWrapper
      ref={wrapperRef}
      className={`nexus-image-wrapper relative ${selected ? 'ring-2 ring-blue-500' : ''} ${isDragging ? 'opacity-70' : ''}`}
      style={containerStyle}
      onMouseDown={handleDragStart}
    >
      <img
        src={src}
        alt={alt}
        title={title}
        style={imageStyle}
        className="max-w-full"
      />
      
      {/* Resize Handles (only visible when selected) */}
      {selected && !readOnly(editor) && (
        <>
          <div
            className="absolute bottom-[-5px] right-[-5px] w-3 h-3 bg-blue-500 border border-white rounded-full cursor-se-resize z-20"
            onMouseDown={(e) => handleResizeStart(e, 'br')}
          />
        </>
      )}
    </NodeViewWrapper>
  );
};

// Helper to check if editor is readonly
function readOnly(editor: any) {
  return !editor.isEditable;
}
