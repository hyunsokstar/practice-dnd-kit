"use client";

import React, { useEffect, useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

/**
 * 드래그 가능한 컴포넌트
 */
const Draggable = () => {
  // `useDraggable` 훅을 사용하여 드래그 기능을 추가
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable", // 요소를 식별하기 위한 고유 ID
  });

  const [hydrated, setHydrated] = useState(false);

  // 클라이언트 사이드에서만 렌더링되도록 설정 (서버 사이드 렌더링 방지)
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // 서버에서 렌더링 방지

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)` // 드래그된 위치 적용
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}  // 해당 요소를 드래그 가능하도록 지정
      style={style}     // 드래그 중인 요소의 위치를 업데이트
      {...listeners}    // 마우스 또는 터치 이벤트 핸들러 추가 (드래그 가능하도록)
      {...attributes}   // 웹 접근성(ARIA) 속성 자동 추가
      className="w-32 h-32 bg-blue-500 text-white flex items-center justify-center cursor-grab"
    >
      Drag me
    </div>
  );
};

/**
 * DndContext로 감싸서 드래그 앤 드롭 기능을 활성화하는 페이지 컴포넌트
 */
export default function Page() {
  return (
    <DndContext>
      <div className="flex items-center justify-center h-screen">
        <Draggable />
      </div>
    </DndContext>
  );
}
