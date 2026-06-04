"use client";

import React, { useState, useEffect, useRef } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { useCvStore } from "@/features/cv-builder/store/cv-builder-store";
import AuroraTemplate from "../templates/aurora";

interface Props extends React.ComponentPropsWithoutRef<"section"> {}

const CvRenderEngine: React.FC<Props> = ({ className, ...props }) => {
  const cvData = useCvStore((state) => state.cvData);
  const [scale, setScale] = useState(0.5);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-calculate scale to fit the width on mount/resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 48; // padding
        const targetWidth = 794; // A4 at 96dpi
        setScale(containerWidth / targetWidth);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section
      ref={containerRef}
      className={`w-[480px] bg-muted/30 border-l border-border sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-6 scrollbar-thin flex flex-col ${className || ""}`}
      {...props}
    >
      <div className="w-full flex justify-between items-center mb-6 flex-shrink-0">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
          Live Preview
        </span>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setScale(s => Math.max(0.1, s - 0.1))}
            className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
            className="p-1.5 bg-card border border-border rounded text-muted-foreground hover:bg-accent transition-colors shadow-sm"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="w-full flex justify-center items-start flex-1 overflow-visible">
        <div 
          style={{ 
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            width: "794px", // Fixed A4 width
            flexShrink: 0
          }}
          className="transition-transform duration-200"
        >
          <AuroraTemplate data={cvData} />
        </div>
      </div>
    </section>
  );
};

export default CvRenderEngine;
