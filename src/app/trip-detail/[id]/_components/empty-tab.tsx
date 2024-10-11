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
    <div className="w-full flex-1 flex justify-center items-center">
      <Button
        onClick={() => router.push(`/trip-detail/${tripId}/${routeName}`)}
        className="rounded-full font-bold p-6">
        + {tabName}
      </Button>
    </div>
  );
};

export default EmptyTab;
