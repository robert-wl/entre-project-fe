import TripService from "@/services/trip-service";
import { FC } from "react";
import EmptyHome from "./_components/empty-home";
import ListHome from "./_components/list-home";

const Home: FC = async () => {
  const [response, _] = await TripService.getMyTrips();

  if (response && response?.result.length === 0) {
    return <EmptyHome />;
  }

  return <ListHome tripList={response!.result} />;
};

export default Home;
