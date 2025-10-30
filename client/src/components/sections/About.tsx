import { useEffect, useState } from "react";
import { Target, Users, Award, TrendingUp } from "lucide-react";

function Counter({ end, duration = 2000 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}</span>;
}

export function About() {
    const stats = [
        { icon: Users, label: "Happy Clients", value: 150, suffix: "+" },
        { icon: Award, label: "Projects Completed", value: 300, suffix: "+" },
        { icon: Target, label: "Countries Served", value: 25, suffix: "+" },
        {
            icon: TrendingUp,
            label: "Client Satisfaction",
            value: 98,
            suffix: "%",
        },
    ];

    return (
        <section
            id="about"
            className="py-20 lg:py-32 bg-background"
            data-testid="section-about">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <div className="space-y-6">
                        <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                            <span className="text-sm font-semibold text-primary">
                                About Us
                            </span>
                        </div>

                        <h2 className="font-heading font-bold text-3xl lg:text-5xl tracking-tight">
                            Turning Dreams Into
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                {" "}
                                Digital Reality
                            </span>
                        </h2>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            At DC Unovation, we're passionate about creating
                            exceptional digital experiences. Our team of expert
                            developers, designers, and strategists work together
                            to bring your vision to life with innovative
                            solutions that drive results.
                        </p>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            From startups to enterprises, we've helped
                            businesses across the globe transform their digital
                            presence and achieve their goals through
                            cutting-edge technology and thoughtful design.
                        </p>

                        <div className="pt-6 space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Our Mission
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Empower businesses with innovative
                                        digital solutions that drive growth and
                                        success.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-1 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                                    <div className="w-2 h-2 rounded-full bg-secondary" />
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">
                                        Our Vision
                                    </h3>
                                    <p className="text-muted-foreground">
                                        Be the leading force in digital
                                        transformation, making technology
                                        accessible to all.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="relative group"
                                data-testid={`stat-${stat.label
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                                <div className="relative bg-card border border-card-border rounded-xl p-6 shadow-lg hover-elevate active-elevate-2">
                                    <stat.icon className="w-8 h-8 text-primary mb-4" />
                                    <div className="space-y-2">
                                        <div className="font-heading font-bold text-3xl lg:text-4xl">
                                            <Counter end={stat.value} />
                                            {stat.suffix}
                                        </div>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
