import Navbar from "../components/Navbar";

interface Props {
    children: React.ReactNode;
}

const SplashLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="w-screen h-screen flex flex-col items-center gap-12 bg-gradient-to-b from-45% from-background to-primary">
            <Navbar />
            {children}
        </div>
    )
};

export default SplashLayout;