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
    <div className="w-full h-full flex justify-center items-center">
      <Button
        onClick={() => router.push(`/trip-detail/${tripId}/${routeName}`)}
        className="rounded-full font-bold py-6 px-8">
        + {tabName}
      </Button>
    </div>
  );
};

export default EmptyTab;
