import React, { useEffect, useRef } from "react";

export const ScrollToBottom: React.FC<React.PropsWithChildren> = ({ children }) => {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [children])

  return (
    <div>
      {children}

      <div ref={endRef} />
    </div>
  )
}