"use client";
import { Menu, Code, Cpu, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

const colors = {
  primary: "#4F46E5",
  secondary: "#10B981",
  background: "#F9FAFB",
  text: "#1F2937",
  textLight: "#6B7280",
  white: "#FFFFFF",
};

export default function SoftwareLanding({ chatbotId }: { chatbotId: string }) {
  const chatFrameRef: any = useRef(null);

  useEffect(() => {
    // Define the event listener callback
    const handleMessage = (event: any) => {
      if (event.data.action === "expandChat") {
        if (chatFrameRef.current) {
          console.log("object");
          // Change the iframe dimensions to expand the chat
          chatFrameRef.current.style.width = "450px";
          chatFrameRef.current.style.height = "550px";
        }
      } else if (event.data.action === "collapseChat") {
        if (chatFrameRef.current) {
          // Change the iframe dimensions to collapse the chat
          chatFrameRef.current.style.width = "100px";
          chatFrameRef.current.style.height = "100px";
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("message", handleMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: colors.background, color: colors.text }}
    >
      <iframe
        src={`/embeded/${chatbotId}`}
        ref={chatFrameRef}
        id="chatFrame"
        allowFullScreen
        style={{
          width: "100px",
          height: "100px",
          border: "none",
          position: "fixed",
          bottom: 0,
          right: 0,
          zIndex: 50,
          pointerEvents: "auto", // Only iframe itself should capture events
        }}
      ></iframe>

      <header
        className="py-4 px-6 md:px-12 flex justify-between items-center"
        style={{ backgroundColor: colors.white }}
      >
        <div className="flex items-center">
          <Code size={32} style={{ color: colors.primary }} />
          <span className="ml-2 text-xl font-bold">CodeCraft</span>
        </div>
        <nav className="hidden md:flex space-x-8">
          {["Features", "Pricing", "About", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="hover:underline"
              style={{ color: colors.text }}
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="md:hidden">
          <button>
            <Menu size={24} />
          </button>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-6 md:px-12 text-center">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: colors.primary }}
          >
            Build Better Software, Faster
          </h1>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: colors.textLight }}
          >
            CodeCraft provides cutting-edge tools and services to streamline
            your software development process.
          </p>
          <button
            className="px-8 py-3 rounded-full text-lg font-semibold transition-transform transform hover:scale-105"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Get Started
          </button>
        </section>

        <section
          className="py-16 px-6 md:px-12"
          style={{ backgroundColor: colors.white }}
        >
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose CodeCraft?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={48} />,
                title: "Clean Code",
                description:
                  "Write beautiful, maintainable code with our advanced IDE.",
              },
              {
                icon: <Cpu size={48} />,
                title: "Powerful CI/CD",
                description:
                  "Automate your workflow with our robust CI/CD pipeline.",
              },
              {
                icon: <Zap size={48} />,
                title: "Lightning Fast",
                description:
                  "Experience unparalleled speed in development and deployment.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg transition-transform transform hover:scale-105"
                style={{ backgroundColor: colors.background }}
              >
                <div
                  className="mb-4 inline-block p-3 rounded-full"
                  style={{
                    backgroundColor: colors.secondary,
                    color: colors.white,
                  }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p style={{ color: colors.textLight }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Development Process?
          </h2>
          <p
            className="text-xl mb-8 max-w-2xl mx-auto"
            style={{ color: colors.textLight }}
          >
            Join thousands of developers who are building the future with
            CodeCraft.
          </p>
          <button
            className="px-8 py-3 rounded-full text-lg font-semibold mr-4 transition-transform transform hover:scale-105"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Start Free Trial
          </button>
          <button
            className="px-8 py-3 rounded-full text-lg font-semibold transition-transform transform hover:scale-105"
            style={{
              backgroundColor: "transparent",
              color: colors.primary,
              border: `2px solid ${colors.primary}`,
            }}
          >
            Learn More
          </button>
        </section>
      </main>

      <footer
        className="py-8 px-6 md:px-12 text-center"
        style={{ backgroundColor: colors.white, color: colors.textLight }}
      >
        <p>&copy; 2025 CodeCraft. All rights reserved.</p>
      </footer>
    </div>
  );
}
