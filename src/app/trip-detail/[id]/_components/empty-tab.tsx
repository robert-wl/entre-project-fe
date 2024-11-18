import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface IProps {
  tripId: number;
  tabName: string;
  routeName: string;
}

const EmptyTab: FC<IProps> = ({ tripId, tabName, routeName }) => {
  const router = useRouter();

  return (
    <div className="w-full h-fit min-h-64 flex justify-center items-center">
      <Button
        onClick={() => router.push(`/trip-detail/${tripId}/${routeName}`)}
        className="flex gap-2 rounded-full font-bold text-base p-6 min-w-48">
        <span>+</span>
        <span>{tabName}</span>
      </Button>
    </div>
  );
};

export default EmptyTab;
