"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import EmptyTab from "./empty-tab";
import { Destination } from "@/models/destination";

interface IProps {
    tripId: number;
    destinations: Destination[];
}

const DestinationTab: FC<IProps> = ({
    tripId,
    destinations
}) => {
    const router = useRouter();
    console.log(destinations);
    
    if (destinations.length === 0) {
        return (
            <EmptyTab tripId={tripId} tabName="Add Destination" routeName="create-destination" />
        )
    }
    return (
        <div>
            
        </div>
    )
}

export default DestinationTab;