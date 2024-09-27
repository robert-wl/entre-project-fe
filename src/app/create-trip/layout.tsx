import Navbar from "../components/Navbar";

interface Props {
    children: React.ReactNode;
}

const CreateTripLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center bg-gradient-to-b from-45% from-background to-primary">
            <Navbar />
            {children}
        </div>
    )
};

export default CreateTripLayout;