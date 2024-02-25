import { Outlet} from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center p-0 md:px-24 py-32 gap-4 bg-primary">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
