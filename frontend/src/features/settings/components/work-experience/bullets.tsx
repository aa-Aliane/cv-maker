import React from "react";
import { cn } from "@/lib/utils";

interface Props extends React.ComponentPropsWithoutRef<"ul"> {
  bullets?: string[];
}

const Bullets: React.FC<Props> = ({ bullets, className, ...props }) => {
  if (!bullets?.length) return null;

  return (
    <ul className={cn("space-y-1.5 mt-2", className)} {...props}>
      {bullets.map((bullet, index) => (
        <li
          key={index}
          className="flex items-start gap-2 text-sm text-muted-foreground"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 shrink-0" />
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  );
};

export default Bullets;
