import { useEffect, useState, useRef, useCallback, memo } from "react";
import {
    Target,
    Users,
    Award,
    TrendingUp,
    Sparkles,
    Zap,
    Shield,
    Globe,
    ArrowRight,
    CheckCircle,
    Lightbulb,
    Rocket,
    Eye,
    Heart,
} from "lucide-react";

// Optimized Counter component with performance improvements
const Counter = memo(function Counter({
    end,
    duration = 2000,
    suffix = "",
}: {
    end: number;
    duration?: number;
    suffix?: string;
}) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const counterRef = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);
    const startTimeRef = useRef<number>();
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated.current) {
                    setIsVisible(true);
                    hasAnimated.current = true;
                }
            },
            { threshold: 0.2 }
        );

        if (counterRef.current) {
            observer.observe(counterRef.current);
        }

        return () => {
            if (counterRef.current) {
                observer.unobserve(counterRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const animate = (currentTime: number) => {
            if (!startTimeRef.current) startTimeRef.current = currentTime;
            const progress = Math.min(
                (currentTime - startTimeRef.current) / duration,
                1
            );

            // Use easeOutExpo for smoother animation
            const easeOutExpo =
                progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(Math.floor(easeOutExpo * end));

            if (progress < 1) {
                animationFrameRef.current = requestAnimationFrame(animate);
            } else {
                // Clean up when animation is complete
                startTimeRef.current = undefined;
            }
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [end, duration, isVisible]);

    return (
        <span ref={counterRef} className="tabular-nums">
            {count}
            {suffix}
        </span>
    );
});

// Reveal animation component for scroll-triggered animations
const Reveal = memo(function Reveal({
    children,
    delay = 0,
    direction = "up",
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    direction?: "up" | "left" | "right";
    className?: string;
}) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    const getTransform = useCallback(() => {
        if (isVisible) return "translate3d(0, 0, 0)";

        switch (direction) {
            case "left":
                return "translate3d(-30px, 0, 0)";
            case "right":
                return "translate3d(30px, 0, 0)";
            default:
                return "translate3d(0, 30px, 0)";
        }
    }, [isVisible, direction]);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${className}`}
            style={{
                transform: getTransform(),
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}ms`,
                willChange: isVisible ? "auto" : "transform, opacity",
            }}>
            {children}
        </div>
    );
});

export function About() {
    const [activeStat, setActiveStat] = useState<number | null>(null);
    const [activeFeature, setActiveFeature] = useState<number | null>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Track mouse position for interactive effects
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const stats = [
        {
            icon: Users,
            label: "Happy Clients",
            value: 150,
            suffix: "+",
            color: "from-blue-500 to-cyan-500",
            bgPattern: "bg-blue-500/5",
        },
        {
            icon: Award,
            label: "Projects Completed",
            value: 300,
            suffix: "+",
            color: "from-purple-500 to-pink-500",
            bgPattern: "bg-purple-500/5",
        },
        {
            icon: Target,
            label: "Countries Served",
            value: 25,
            suffix: "+",
            color: "from-amber-500 to-orange-500",
            bgPattern: "bg-amber-500/5",
        },
        {
            icon: TrendingUp,
            label: "Client Satisfaction",
            value: 98,
            suffix: "%",
            color: "from-green-500 to-emerald-500",
            bgPattern: "bg-green-500/5",
        },
    ];

    const features = [
        {
            icon: Sparkles,
            title: "Innovation",
            description: "Cutting-edge solutions that push boundaries",
            color: "from-violet-500 to-purple-500",
        },
        {
            icon: Zap,
            title: "Speed",
            description: "Rapid development without compromising quality",
            color: "from-yellow-500 to-orange-500",
        },
        {
            icon: Shield,
            title: "Reliability",
            description: "Robust solutions you can count on",
            color: "from-blue-500 to-cyan-500",
        },
        {
            icon: Globe,
            title: "Global Reach",
            description: "Serving clients across continents",
            color: "from-green-500 to-emerald-500",
        },
    ];

    const values = [
        {
            icon: Lightbulb,
            title: "Excellence",
            description:
                "We strive for excellence in everything we do, from code quality to customer service.",
        },
        {
            icon: Rocket,
            title: "Innovation",
            description:
                "We embrace new technologies and creative approaches to solve complex challenges.",
        },
        {
            icon: Heart,
            title: "Collaboration",
            description:
                "We believe in the power of teamwork and close partnerships with our clients.",
        },
    ];

    return (
        <section
            id="about"
            className="py-20 lg:py-32 relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900"
            data-testid="section-about">
            {/* Animated background elements with mouse interaction */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl"
                    style={{
                        transform: `translate(${mousePosition.x * 0.02}px, ${
                            mousePosition.y * 0.02
                        }px)`,
                        transition: "transform 0.3s ease-out",
                    }}></div>
                <div
                    className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-secondary/20 to-primary/20 blur-3xl"
                    style={{
                        transform: `translate(${-mousePosition.x * 0.02}px, ${
                            -mousePosition.y * 0.02
                        }px)`,
                        transition: "transform 0.3s ease-out",
                    }}></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />

                {/* Floating elements with improved animations */}
                <div
                    className="absolute top-1/4 left-1/4 w-6 h-6 rounded-full bg-primary/30 blur-sm"
                    style={{
                        animation: "float 8s ease-in-out infinite",
                        animationDelay: "0s",
                    }}></div>
                <div
                    className="absolute top-3/4 right-1/3 w-4 h-4 rounded-full bg-secondary/30 blur-sm"
                    style={{
                        animation: "float 10s ease-in-out infinite",
                        animationDelay: "1s",
                    }}></div>
                <div
                    className="absolute bottom-1/4 left-1/3 w-5 h-5 rounded-full bg-primary/20 blur-sm"
                    style={{
                        animation: "float 12s ease-in-out infinite",
                        animationDelay: "0.5s",
                    }}></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                {/* Header */}
                <Reveal>
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 backdrop-blur-sm mb-6 group">
                            <Sparkles className="w-4 h-4 text-primary group-hover:rotate-12 transition-transform" />
                            <span className="text-sm font-semibold text-primary">
                                About Us
                            </span>
                        </div>

                        <h2 className="font-heading font-bold text-4xl lg:text-6xl tracking-tight mb-6">
                            Turning Dreams Into
                            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                Digital Reality
                            </span>
                        </h2>

                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            At DC Unovation, we're passionate about creating
                            exceptional digital experiences that transform
                            businesses and delight users.
                        </p>
                    </div>
                </Reveal>

                {/* Main content with improved layout */}
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
                    <div className="space-y-6">
                        <Reveal delay={100}>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Our team of expert developers, designers, and
                                strategists work together to bring your vision
                                to life with innovative solutions that drive
                                results. We combine creativity with technical
                                expertise to deliver digital products that stand
                                out in today's competitive landscape.
                            </p>
                        </Reveal>

                        <Reveal delay={200}>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                From startups to enterprises, we've helped
                                businesses across the globe transform their
                                digital presence and achieve their goals through
                                cutting-edge technology and thoughtful design.
                            </p>
                        </Reveal>

                        <div className="pt-6 grid sm:grid-cols-2 gap-6">
                            <Reveal delay={300} direction="left">
                                <div
                                    className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 cursor-pointer"
                                    onMouseEnter={() => setActiveStat(0)}
                                    onMouseLeave={() => setActiveStat(null)}>
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl group-hover:scale-150 transition-transform"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Target className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-bold text-lg">
                                                Our Mission
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            Empower businesses with innovative
                                            digital solutions that drive growth
                                            and success.
                                        </p>
                                        <div
                                            className={`mt-4 h-1 bg-gradient-to-r from-primary to-secondary rounded-full transform origin-left transition-transform ${
                                                activeStat === 0
                                                    ? "scale-x-100"
                                                    : "scale-x-0"
                                            }`}></div>
                                    </div>
                                </div>
                            </Reveal>

                            <Reveal delay={400} direction="right">
                                <div
                                    className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-secondary/5 to-secondary/10 dark:from-secondary/10 dark:to-secondary/20 border border-secondary/20 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1 cursor-pointer"
                                    onMouseEnter={() => setActiveStat(1)}
                                    onMouseLeave={() => setActiveStat(null)}>
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 rounded-full bg-gradient-to-br from-secondary/20 to-primary/20 blur-xl group-hover:scale-150 transition-transform"></div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary to-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                                                <Eye className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-bold text-lg">
                                                Our Vision
                                            </h3>
                                        </div>
                                        <p className="text-muted-foreground">
                                            Be the leading force in digital
                                            transformation, making technology
                                            accessible to all.
                                        </p>
                                        <div
                                            className={`mt-4 h-1 bg-gradient-to-r from-secondary to-primary rounded-full transform origin-left transition-transform ${
                                                activeStat === 1
                                                    ? "scale-x-100"
                                                    : "scale-x-0"
                                            }`}></div>
                                    </div>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal delay={500} direction="right">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl blur-xl"></div>
                            <div className="relative bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                                <div className="grid grid-cols-2 gap-6">
                                    {stats.map((stat, index) => (
                                        <div
                                            key={index}
                                            className="group relative"
                                            data-testid={`stat-${stat.label
                                                .toLowerCase()
                                                .replace(/\s+/g, "-")}`}
                                            onMouseEnter={() =>
                                                setActiveStat(index + 2)
                                            }
                                            onMouseLeave={() =>
                                                setActiveStat(null)
                                            }>
                                            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-white/10 dark:from-slate-700/50 dark:to-slate-800/10 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                                            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                                <div
                                                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                                    <stat.icon className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="font-heading font-bold text-3xl lg:text-4xl bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                                                        <Counter
                                                            end={stat.value}
                                                            suffix={stat.suffix}
                                                        />
                                                    </div>
                                                    <p className="text-sm text-muted-foreground font-medium">
                                                        {stat.label}
                                                    </p>
                                                </div>
                                                <div
                                                    className={`mt-3 h-0.5 ${
                                                        stat.bgPattern
                                                    } rounded-full transform origin-left transition-transform ${
                                                        activeStat === index + 2
                                                            ? "scale-x-100"
                                                            : "scale-x-0"
                                                    }`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Features section with enhanced design */}
                <div className="mb-20">
                    <Reveal delay={600}>
                        <h3 className="text-3xl font-bold text-center mb-12">
                            What Sets Us Apart
                        </h3>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <Reveal key={index} delay={700 + index * 100}>
                                <div
                                    className="group relative h-full"
                                    onMouseEnter={() => setActiveFeature(index)}
                                    onMouseLeave={() => setActiveFeature(null)}>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 rounded-xl blur-md group-hover:blur-lg transition-all"></div>
                                    <div className="relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 shadow-md border border-white/50 dark:border-slate-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                                        <div
                                            className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                            <feature.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <h3 className="font-bold text-lg mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm flex-grow">
                                            {feature.description}
                                        </p>
                                        <div
                                            className={`mt-4 flex items-center text-primary font-medium text-sm transition-opacity ${
                                                activeFeature === index
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            }`}>
                                            Learn more{" "}
                                            <ArrowRight className="w-4 h-4 ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>

                {/* Values section with improved design */}
                <div>
                    <Reveal delay={1100}>
                        <h3 className="text-3xl font-bold text-center mb-12">
                            Our Core Values
                        </h3>
                    </Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {values.map((value, index) => (
                            <Reveal
                                key={index}
                                delay={1200 + index * 100}
                                direction="up">
                                <div className="flex gap-4 group">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <value.icon className="w-6 h-6 text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg mb-2">
                                            {value.title}
                                        </h4>
                                        <p className="text-muted-foreground">
                                            {value.description}
                                        </p>
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom styles for animations */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translateY(0px) translateX(0px);
                    }
                    33% {
                        transform: translateY(-20px) translateX(10px);
                    }
                    66% {
                        transform: translateY(10px) translateX(-10px);
                    }
                    100% {
                        transform: translateY(0px) translateX(0px);
                    }
                }
            `}</style>
        </section>
    );
}
