import { Bot } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <div className="flex flex-row justify-between mb-6">
      <Link href={"/chatbots"}>
        <div
          className={`transition-all duration-1000 ease-out ${"opacity-100 translate-y-0"} flex justify-center items-center gap-2`}
        >
          <Bot className="w-12 h-12 mx-auto text-black" />
          <div className="flex flex-col ">
            <h1 className="text-2xl font-extrabold ">SmartSage.</h1>
            <span className="font-bold text-[12px]">
              Your Website’s AI Knowledge Expert.
            </span>
          </div>
        </div>
      </Link>

      <Button
        variant="outline"
        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </div>
  );
};

export default Header;
