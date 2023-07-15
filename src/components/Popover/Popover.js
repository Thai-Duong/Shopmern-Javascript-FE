import { arrow, FloatingPortal, useFloating } from "@floating-ui/react";
import { useRef, useState } from "react";

export default function Popover({ children, rederpopover }) {
  const arrowRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [
      arrow({
        element: arrowRef,
      }),
    ],
  });
  const showPopover = () => {
    setIsOpen(true);
  };
  const hidePopover = () => {
    setIsOpen(false);
  };
  return (
    <div
      ref={refs.setReference}
      onMouseEnter={showPopover}
      onMouseLeave={hidePopover}
      className="flex items-center py-1 mr-6 cursor-pointer hover:text-gray-500"
    >
      {children}
      <FloatingPortal>
        {isOpen && (
          <div
            ref={refs.setFloating}
            style={{
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
              width: "max-content",
            }}
          >
            <span
              ref={arrowRef}
              style={{
                left: middlewareData.arrow?.x,
                top: middlewareData.arrow?.y,
              }}
              className="bg-gray-500 absolute -translate-y-full border-[11px] border-x-transparent  border-t-transparent"
            />
            {rederpopover}
          </div>
        )}
      </FloatingPortal>
    </div>
  );
}
