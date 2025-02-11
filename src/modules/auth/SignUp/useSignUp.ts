import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const useSignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session, status } = useSession();

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

    if (!email || !username || !password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Error creating account");
        setIsLoading(false);
        return;
      }

      router.push("/auth/signin");
    } catch (err) {
      console.error("Error signing up", err);
      setError("Error creating account");
      setIsLoading(false);
    }
  };
  return {
    status,
    handleSubmit,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
  };
};

export default useSignUp;
