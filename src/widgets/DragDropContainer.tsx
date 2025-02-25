"use client";

import React, { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";

/**
 * 드래그 가능한 박스 컴포넌트
 */
const DraggableBox = ({ id }: { id: string }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-32 h-32 text-white flex items-center justify-center cursor-grab rounded-lg bg-blue-500"
    >
      {id}
    </div>
  );
};

/**
 * 드롭 가능한 영역
 */
const DropZone = ({ id, children }: { id: string; children: React.ReactNode }) => {
  const { setNodeRef } = useDroppable({ id });
  return (
    <motion.div
      ref={setNodeRef}
      layout
      className="w-36 h-36 border-2 border-gray-400 flex items-center justify-center"
    >
      {children}
    </motion.div>
  );
};

/**
 * 메인 컴포넌트
 */
export default function Page() {
  const [positions, setPositions] = useState(["box-1", "box-2"]);

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setPositions((prev) => [...prev].reverse());
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <motion.div layout className="flex gap-4 justify-center items-center h-screen">
        <AnimatePresence>
          {positions.map((id) => (
            <motion.div
              key={id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <DropZone id={id}>
                <DraggableBox id={id} />
              </DropZone>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </DndContext>
  );
}
