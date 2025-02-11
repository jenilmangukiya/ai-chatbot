import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (session) {
      router.push("/chatbots");
    }
  }, [session, status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setIsLoading(false);
    if (res?.error) {
      if (res?.error === "CredentialsSignin")
        setError("Please enter valid email and password");
      else setError("Something went wrong please try again");
    } else if (res?.ok) {
      router.push("/chatbots");
    }
  };

  return {
    status,
    handleSubmit,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
  };
};

export default useSignIn;
