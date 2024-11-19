import { Button } from "@/components/ui/button";
import { forwardRef, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onClick?: () => void;
}

const FloatActionButton = forwardRef<HTMLButtonElement, IProps>(
  ({ onClick, children }, ref) => {
    return (
      <Button
        ref={ref}
        className="fixed bottom-6 right-6 text-3xl rounded-full size-16 shadow-md"
        onClick={onClick}>
        {children}
      </Button>
    );
  }
);

FloatActionButton.displayName = "FloatActionButton";

export default FloatActionButton;