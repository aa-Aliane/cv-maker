import React from "react";

interface Props extends React.ComponentPropsWithoutRef<"div"> {}

const FormWizard: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={`w-full max-w-3xl mx-auto py-12 px-6 space-y-6 ${props.className || ""}`}
    >
      {/* Dynamic Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-2">
          <h2 className="text-2xl font-bold text-foreground">Editor</h2>
          <span className="text-sm font-semibold text-primary">
            65% Complete
          </span>
        </div>
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out"
            style={{ width: "65%" }}
          />
        </div>
      </div>

      {/* Render Current Section Step Form Component */}
      <div className="space-y-6">{children}</div>
    </div>
  );
};

export default FormWizard;
