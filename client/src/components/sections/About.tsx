import {
    Code,
    Layers,
    ShieldCheck,
    Target,
    TrendingUp,
    Star,
    ArrowRight,
    Award,
} from "lucide-react";
export function About() {
    // 1. REPLACE THIS URL with your local image later
    const mainImageUrl = "/public/About.jpg";

    return (
        <section
            id="about"
            className="relative overflow-hidden bg-slate-50 py-20 lg:py-20">
            {/* Background Pattern - Soft & Modern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:64px_64px] opacity-[0.4]"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative mx-auto lg:mx-0 w-full max-w-md lg:max-w-full">
                        {/* Main Image Container */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl ">
                            <img
                                src={mainImageUrl}
                                alt="dcunovation Workspace"
                                className="h-[600px] w-full object-cover object-center"
                            />

                            {/* Gradient Overlay on Image for text readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
                        </div>

                        {/* FLOATING ELEMENT 1: Best Ratings (Top Left) */}
                        <div
                            className="absolute -left-8 top-10 z-20 animate-bounce"
                            style={{ animationDuration: "3s" }}>
                            <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                                    <Star className="h-5 w-5 fill-yellow-500" />
                                </div>
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">
                                        Best Ratings
                                    </p>
                                    <p className="text-sm font-bold text-slate-900">
                                        Excellent Service
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING ELEMENT 2: Stats / Score (Bottom Left) */}
                        <div className="absolute -bottom-6 left-10 z-20">
                            <div className="rounded-2xl border border-white/80 bg-white px-6 py-4 shadow-xl">
                                <div className="flex items-center justify-between gap-6">
                                    <div>
                                        <p className="text-3xl font-extrabold text-slate-900">
                                            98%
                                        </p>
                                        <p className="text-xs font-medium text-slate-500">
                                            Score
                                        </p>
                                    </div>
                                    <div className="h-10 w-[1px] bg-slate-200" />
                                    <div>
                                        <p className="text-3xl font-extrabold text-indigo-600">
                                            5+
                                        </p>
                                        <p className="text-xs font-medium text-slate-500">
                                            Years Exp.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FLOATING ELEMENT 3: Code Snippet (Bottom Right - overlapping image) */}
                        <div className="absolute -right-6 bottom-20 z-20 hidden md:block">
                            <div className="rounded-2xl border border-white/10 bg-[#0f172a] p-4 shadow-2xl">
                                <div className="flex gap-1.5 mb-3">
                                    <div className="h-2 w-2 rounded-full bg-red-500" />
                                    <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                    <div className="h-2 w-2 rounded-full bg-green-500" />
                                </div>
                                <div className="font-mono text-xs text-slate-300">
                                    <span className="text-purple-400">
                                        const
                                    </span>{" "}
                                    quality = {`{`}
                                    <br />
                                    <span className="pl-2 text-blue-400">
                                        secure
                                    </span>
                                    :{" "}
                                    <span className="text-green-400">true</span>
                                    ,<br />
                                    <span className="pl-2 text-blue-400">
                                        modern
                                    </span>
                                    :{" "}
                                    <span className="text-green-400">true</span>
                                    <br />
                                    {`}`};
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 max-w-2xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white px-4 py-1.5 shadow-sm">
                            <span className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                                About dcunovation
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                            Turning Ideas Into
                            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Digital Reality.
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="text-lg text-slate-600 leading-relaxed">
                            dcunovation is a developer-driven digital solutions
                            studio. We help startups and small businesses
                            establish a strong online presence with clean code
                            and thoughtful design.
                        </p>

                        {/* Mission & Vision - Inline Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                                <Target className="h-6 w-6 text-indigo-500 mb-3" />
                                <h3 className="font-bold text-slate-900 mb-1">
                                    Mission
                                </h3>
                                <p className="text-xs text-slate-500 leading-snug">
                                    Reliable, modern, and easy-to-manage digital
                                    solutions.
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                                <TrendingUp className="h-6 w-6 text-purple-500 mb-3" />
                                <h3 className="font-bold text-slate-900 mb-1">
                                    Vision
                                </h3>
                                <p className="text-xs text-slate-500 leading-snug">
                                    Trusted partner through honest work and
                                    quality.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-8 py-3 text-white font-medium transition-all hover:bg-slate-800 hover:scale-[1.02]">
                            Explore More
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
