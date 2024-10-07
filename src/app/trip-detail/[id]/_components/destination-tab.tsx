"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { FC } from "react";
import EmptyTab from "./empty-tab";

interface IProps {
    tripId: number;
    destinations: [];
}

const DestinationTab: FC<IProps> = ({
    tripId,
    destinations
}) => {
    const router = useRouter();
    if (destinations.length === 0) {
        return (
            <EmptyTab tripId={tripId} tabName="Add Destination" routeName="create-destination" />
        )
    }
    return (
        <div>
            {destinations.map((destination) => (
                <div>

                </div>
            ))}
        </div>
    )
}

export default DestinationTab;