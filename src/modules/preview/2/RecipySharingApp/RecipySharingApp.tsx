"use client";
import React, { useEffect, useRef } from "react";
import { Book, ChefHat, Heart, Share2, Users, Utensils } from "lucide-react";

const colors = {
  primary: "#E8604C",
  primaryHover: "#D45142",
  secondary: "#2C3639",
  accent: "#FFA41B",
  background: "#FFF9F5",
  text: "#2C3639",
  textLight: "#666666",
  white: "#FFFFFF",
};

function RecipySharingApp({ chatbotId }: { chatbotId: string }) {
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
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&q=80")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative z-10 px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h1
              className="text-4xl font-bold tracking-tight sm:text-6xl"
              style={{ color: colors.text }}
            >
              Share Your Culinary
              <span style={{ color: colors.primary }}> Masterpieces</span>
            </h1>
            <p
              className="max-w-2xl mx-auto mt-6 text-lg"
              style={{ color: colors.textLight }}
            >
              Join our community of passionate home chefs and food enthusiasts.
              Discover, share, and celebrate the joy of cooking together.
            </p>
            <div className="flex justify-center gap-4 mt-10">
              <button
                style={{ backgroundColor: colors.primary }}
                className="px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all"
              >
                Start Cooking
              </button>
              <button
                style={{
                  backgroundColor: colors.white,
                  color: colors.primary,
                  border: `1px solid ${colors.primary}`,
                }}
                className="px-6 py-3 rounded-lg hover:opacity-90 transition-all"
              >
                Browse Recipes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div
        className="py-24 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.white }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
              Cook, Share, and Connect
            </h2>
            <p className="mt-4 text-lg" style={{ color: colors.textLight }}>
              Everything you need to share your culinary journey
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: <Book size={24} />, title: "Recipe Collections" },
              { icon: <ChefHat size={24} />, title: "Expert Tips" },
              { icon: <Users size={24} />, title: "Cooking Community" },
              { icon: <Heart size={24} />, title: "Save Favorites" },
              { icon: <Utensils size={24} />, title: "Meal Planning" },
              { icon: <Share2 size={24} />, title: "Easy Sharing" },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-xl transition-all hover:transform hover:-translate-y-1"
                style={{
                  backgroundColor: colors.white,
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                  border: `1px solid ${colors.background}`,
                }}
              >
                <div
                  className="p-3 rounded-lg"
                  style={{
                    backgroundColor: colors.background,
                    color: colors.primary,
                  }}
                >
                  {feature.icon}
                </div>
                <h3
                  className="mt-4 text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-center"
                  style={{ color: colors.textLight }}
                >
                  {index === 0 &&
                    "Organize and discover recipes from around the world."}
                  {index === 1 &&
                    "Learn from experienced chefs and cooking enthusiasts."}
                  {index === 2 &&
                    "Connect with fellow food lovers and share experiences."}
                  {index === 3 &&
                    "Build your personal collection of beloved recipes."}
                  {index === 4 && "Plan your weekly meals with smart tools."}
                  {index === 5 && "Share your recipes across social platforms."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: colors.secondary }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Share Your Recipes with the World?
          </h2>
          <p className="mt-4 text-lg" style={{ color: colors.textLight }}>
            Join thousands of food enthusiasts who are already sharing their
            culinary creations.
          </p>
          <button
            className="mt-8 px-8 py-4 rounded-lg text-lg font-medium transition-all hover:opacity-90"
            style={{ backgroundColor: colors.primary, color: colors.white }}
          >
            Join Our Community
          </button>
        </div>
      </div>
    </div>
  );
}

export default RecipySharingApp;
