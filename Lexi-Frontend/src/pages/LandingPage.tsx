import React from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Features } from "../components/Features";

export const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
            <Header />
              <main className="container mx-auto px-6 py-16">
                <Hero />
                <Features />
              </main>
            <Footer />
        </div>
    )
}