import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CreateTrip: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="w-full flex flex-col flex-[2] justify-center items-center">
                <p className="text-2xl">
                    <span className="font-bold text-primary">Plan</span> your trips
                </p>
                <p className="text-2xl">
                    <span className="font-bold text-primary">Split</span> your bills
                </p>
                <p className="text-2xl">easier now!</p>
            </div>
            <div className="w-full flex flex-col flex-[4] p-8 gap-8 items-center bg-gradient-to-b from-primary-foreground to-background rounded-t-2xl">
                <div className="w-full p-4">
                    <p className="text-2xl font-semibold text-center">Let's start with the</p>
                    <p className="text-2xl font-bold text-primary text-center">trip details! 🎉</p>
                </div>
                <form action="" className="w-full flex flex-col gap-4">
                    <Input
                        className="py-6 bg-background"
                        type="text"
                        placeholder="Trip name"
                    />
                    <Input
                        className="py-6 bg-background"
                        type="text"
                        placeholder="Description"
                    />
                    <Input
                        type="text"
                        className="py-6 bg-background"
                        placeholder="Number of travelers"
                    />
                    <Button className="w-full py-6 rounded-3xl text-background font-bold">
                        Continue
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default CreateTrip;