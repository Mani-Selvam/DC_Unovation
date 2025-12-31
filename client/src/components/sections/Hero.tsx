import { Button } from "@/components/ui/button";
import {
    ArrowRight,
    Sparkles,
    Quote,
    Layers,
    Zap,
    BarChart,
    Code2,
} from "lucide-react";

interface HeroProps {
    onBookDemo: () => void;
    onGetQuote: () => void;
}

export function Hero({ onBookDemo, onGetQuote }: HeroProps) {
    return (
        <section
            id="hero"
            className="relative overflow-hidden bg-slate-50 pt-20 pb-32 lg:pt-32"
            data-testid="section-hero">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    {/* LEFT CONTENT */}
                    <div className="space-y-8 text-center lg:text-left">
                        {/* Badge - High Contrast */}
                        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm font-bold text-indigo-700 shadow-sm">
                            <Sparkles className="h-4 w-4 fill-indigo-600 text-indigo-600" />
                            <span>Transforming Digital Experiences</span>
                        </div>

                        {/* Heading - Dark Slate for Visibility */}
                        <h1 className="font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                            Dream. Create.
                            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                                Innovate.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-600 lg:mx-0 lg:text-xl">
                            We transform ambitious ideas into high-performance
                            digital products. Robust engineering meets stunning
                            design.
                        </p>

                        {/* CTA Buttons - Bold Colors */}
                        <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                            <Button
                                size="lg"
                                onClick={onBookDemo}
                                className="h-12 px-8 text-base bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200"
                                data-testid="button-book-demo-hero">
                                Book a Demo
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                onClick={onGetQuote}
                                className="h-12 px-8 text-base border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                data-testid="button-get-quote-hero">
                                <Quote className="mr-2 h-4 w-4 text-slate-500" />
                                Get a Quote
                            </Button>
                        </div>

                        {/* Social Proof - Darker Text */}
                        <div className="pt-8">
                            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                                Designed for modern businesses
                            </p>
                            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-lg font-bold text-slate-300 lg:justify-start">
                                <span className="text-slate-500">Simple</span>
                                <span className="text-slate-500">secure</span>
                                <span className="text-slate-500">
                                    scalable web
                                </span>
                                <span className="text-slate-500">
                                    cloud solutions
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT VISUAL - Solid High Contrast Cards */}
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-full">
                        {/* Decorative Glows behind the grid */}
                        <div className="absolute -top-10 -right-10 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-indigo-400/20 blur-3xl" />

                        <div className="relative grid auto-rows-[180px] grid-cols-2 gap-4">
                            {/* Card 1: Large Feature Card */}
                            <div className="group col-span-2 overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 transition-transform hover:-translate-y-1">
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                                    <Layers className="h-6 w-6" />
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-slate-900">
                                    Scalable Architecture
                                </h3>
                                <p className="text-sm text-slate-500">
                                    Build on a foundation designed for millions
                                    of users.
                                </p>

                                {/* Visual element inside card */}
                                <div className="mt-6 flex gap-2">
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                        <div className="h-6 w-6 rounded bg-blue-500/20" />
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                        <div className="h-6 w-6 rounded bg-indigo-500/20" />
                                    </div>
                                    <div className="h-12 w-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                        <div className="h-6 w-6 rounded bg-violet-500/20" />
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: Performance Score */}
                            <div className="col-span-1 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <span className="text-3xl font-extrabold text-slate-900">
                                        98%
                                    </span>
                                </div>
                                <div className="text-sm font-semibold text-slate-500 mb-2">
                                    Performance
                                </div>
                                <div className="h-2 w-full rounded-full bg-slate-100">
                                    <div className="h-full w-[98%] rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>

                            {/* Card 3: Analytics Graph */}
                            <div className="col-span-1 overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/50">
                                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                    <BarChart className="h-5 w-5" />
                                </div>
                                <div className="text-sm font-semibold text-slate-500 mb-4">
                                    Growth
                                </div>
                                <div className="flex items-end gap-1 space-x-1 h-16">
                                    <div className="w-3 rounded-t bg-slate-100 h-[30%]" />
                                    <div className="w-3 rounded-t bg-blue-200 h-[50%]" />
                                    <div className="w-3 rounded-t bg-blue-400 h-[70%]" />
                                    <div className="w-3 rounded-t bg-blue-600 h-[100%]" />
                                </div>
                            </div>

                            {/* Card 4: Dark Code Block */}
                            <div className="col-span-2 min-h-[270px] overflow-hidden rounded-3xl border border-slate-200 bg-[#0f172a] p-5 shadow-2xl">
                                <div className="flex items-center gap-1.5 mb-4">
                                    <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                                    <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                    <span className="ml-2 text-xs text-slate-500">
                                        core.config.ts
                                    </span>
                                </div>
                                <div className="space-y-2 font-mono text-sm leading-relaxed text-slate-300">
                                    <p>
                                        <span className="text-purple-400">
                                            import
                                        </span>{" "}
                                        {`{ Engine }`}{" "}
                                        <span className="text-purple-400">
                                            from
                                        </span>{" "}
                                        <span className="text-green-400">
                                            '@core/engine'
                                        </span>
                                        ;
                                    </p>
                                    <p className="text-slate-500">
                                        // Initialize scalable system
                                    </p>
                                    <p>
                                        <span className="text-blue-400">
                                            const
                                        </span>{" "}
                                        app = {`{`}
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-orange-300">
                                            Brand
                                        </span>
                                        :{" "}
                                        <span className="text-yellow-300">
                                            "DCUnovation"
                                        </span>
                                        ,
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-orange-300">
                                            Vision
                                        </span>
                                        :{" "}
                                        <span className="text-yellow-300">
                                            "Innovation"
                                        </span>
                                    </p>
                                    <p className="pl-4">
                                        <span className="text-orange-300">
                                            Performance
                                        </span>
                                        :{" "}
                                        <span className="text-yellow-300">
                                            "Ultra-high"
                                        </span>
                                    </p>
                                    <p>{`};`}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
