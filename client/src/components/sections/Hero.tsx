import React, { useState, useEffect, useRef } from "react";
import heroGroup from "@assets/Group_Students.jpg";
import { ArrowRight, Sparkles, Users, Heart, Star, Zap } from "lucide-react";

export function Hero() {
    const [scrollY, setScrollY] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);

    // Track scroll position for parallax effects
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Track mouse position for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (heroRef.current) {
                const rect = heroRef.current.getBoundingClientRect();
                setMousePosition({
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove, {
            passive: true,
        });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <section
            ref={heroRef}
            className="relative bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Gradient orbs that follow mouse movement */}
                <div
                    className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-br from-indigo-200/30 to-purple-200/30 blur-3xl"
                    style={{
                        left: `${mousePosition.x * 0.05}px`,
                        top: `${mousePosition.y * 0.05}px`,
                        transition: "left 0.3s ease-out, top 0.3s ease-out",
                    }}
                />
                <div
                    className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-200/30 to-blue-200/30 blur-3xl right-0 bottom-0"
                    style={{
                        right: `${-mousePosition.x * 0.03}px`,
                        bottom: `${-mousePosition.y * 0.03}px`,
                        transition: "right 0.3s ease-out, bottom 0.3s ease-out",
                    }}
                />

                {/* Floating particles */}
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${
                                10 + Math.random() * 10
                            }s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`,
                        }}
                    />
                ))}
            </div>

            {/* Hero Content */}
            <div className="z-10 relative flex flex-col items-center mt-24 mb-10 px-4 w-full max-w-4xl mx-auto">
                {/* Animated badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 mb-6 shadow-sm animate-slide-down">
                    <Sparkles className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-medium text-indigo-700">
                        Join 10,000+ Students
                    </span>
                </div>

                {/* Main heading with staggered animation */}
                <h1 className="font-bold text-3xl md:text-5xl lg:text-6xl text-gray-900 text-center mb-4 animate-slide-up">
                    Find Your Tribe,
                    <br />
                    <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Build Your Network.
                    </span>
                </h1>

                {/* Description with animation */}
                <p className="text-base md:text-lg text-gray-600 text-center mb-8 max-w-2xl animate-slide-up delay-200">
                    Connect with like-minded students for fun, friendships, and
                    future opportunities.
                </p>

                {/* Stats with animation */}
                <div className="flex flex-wrap justify-center gap-8 mb-8 animate-slide-up delay-300">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-indigo-600" />
                        <span className="text-gray-700 font-medium">
                            10,000+ Students
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-gray-700 font-medium">
                            500+ Communities
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-700 font-medium">
                            4.8 Rating
                        </span>
                    </div>
                </div>

                {/* CTA Buttons with enhanced animation */}
                <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-400">
                    <button className="group px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center">
                        Join for Free
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-6 py-3 rounded-full border border-indigo-300 text-indigo-700 font-semibold bg-white/80 backdrop-blur hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center">
                        <Zap className="mr-2 w-4 h-4" />
                        Explore Communities
                    </button>
                </div>
            </div>

            {/* Full-width Hero Image with parallax effect */}
            <div className="relative w-full mt-8">
                <div
                    className="relative w-full h-[400px] md:h-[500px] overflow-hidden"
                    style={{
                        transform: `translateY(${scrollY * 0.3}px)`,
                    }}>
                    <img
                        src={heroGroup}
                        alt="Group of happy students celebrating"
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 via-transparent to-transparent"></div>

                    {/* Floating decorative elements */}
                    <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full opacity-70 animate-float"></div>
                    <div className="absolute bottom-20 right-20 w-12 h-12 bg-gradient-to-br from-pink-400 to-red-400 rounded-full opacity-70 animate-float delay-1000"></div>
                    <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-70 animate-float delay-500"></div>

                    {/* Abstract shapes */}
                    <svg
                        className="absolute bottom-10 left-10 w-24 h-16 text-indigo-300 opacity-60 animate-pulse"
                        viewBox="0 0 100 60">
                        <path
                            d="M10,30 Q30,10 50,30 Q70,50 90,30"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                        />
                    </svg>

                    <svg
                        className="absolute top-20 right-10 w-20 h-20 text-purple-300 opacity-60 animate-pulse delay-700"
                        viewBox="0 0 80 80">
                        <circle
                            cx="40"
                            cy="40"
                            r="30"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
                        <circle
                            cx="40"
                            cy="40"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                        />
                    </svg>

                    {/* Interactive dots */}
                    <div className="absolute left-1/4 top-1/3 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="absolute right-1/3 bottom-1/4 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></div>
                    <div className="absolute left-1/2 top-1/4 w-3 h-3 bg-yellow-400 rounded-full animate-pulse delay-600"></div>
                </div>

                {/* Wave shape at the bottom */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg
                        viewBox="0 0 1440 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
                            fill="url(#gradient)"
                        />
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%">
                                <stop offset="0%" stopColor="#E0E7FF" />
                                <stop offset="100%" stopColor="#F3E8FF" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>
            </div>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes slide-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slide-down {
                    from {
                        opacity: 0;
                        transform: translateY(-20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0) rotate(0deg);
                    }
                    50% {
                        transform: translateY(-20px) rotate(5deg);
                    }
                }

                .animate-slide-up {
                    animation: slide-up 0.8s ease forwards;
                }

                .animate-slide-down {
                    animation: slide-down 0.8s ease forwards;
                }

                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }

                .delay-200 {
                    animation-delay: 0.2s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }

                .delay-300 {
                    animation-delay: 0.3s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }

                .delay-400 {
                    animation-delay: 0.4s;
                    opacity: 0;
                    animation-fill-mode: forwards;
                }

                .delay-500 {
                    animation-delay: 0.5s;
                }

                .delay-600 {
                    animation-delay: 0.6s;
                }

                .delay-700 {
                    animation-delay: 0.7s;
                }

                .delay-1000 {
                    animation-delay: 1s;
                }
            `}</style>
        </section>
    );
}
