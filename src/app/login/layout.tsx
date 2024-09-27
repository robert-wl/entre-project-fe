interface Props {
  children: React.ReactNode;
}

const LoginLayout: React.FC<Props> = ({ children }) => {
  return <div className="w-screen h-screen p-8 gap-8 flex flex-col justify-center items-center">{children}</div>;
};

export default LoginLayout;
