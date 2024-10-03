import { Button } from "@/components/ui/button";
import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
  onClick: () => void;
}

const FloatActionButton: FC<IProps> = ({ onClick, children }) => {
  return (
    <Button
      className="fixed bottom-6 right-6 text-3xl rounded-full size-16 shadow-md"
      onClick={onClick}>
      {children}
    </Button>
  );
};

export default FloatActionButton;
