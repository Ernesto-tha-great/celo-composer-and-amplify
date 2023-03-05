import { FC, ReactNode, useState } from "react";
import { Auth } from "aws-amplify";
import Footer from "./Footer";
import Header from "./HeaderRK";
import { Signup } from "../pages/signup";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<any>();
  return (
    <>
      <div className="bg-gypsum overflow-hidden flex flex-col min-h-screen">
        <Header />
        <>
          <div className="py-16 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
