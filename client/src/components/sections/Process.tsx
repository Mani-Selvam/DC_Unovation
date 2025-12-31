import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Pen, Code, CheckCheck, Rocket } from "lucide-react";

export function Process() {
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        {
            icon: Search,
            title: "Discovery",
            shortDesc: "Strategy & Analysis",
            fullDesc:
                "We analyze your business goals, audience, and competitors to build a solid foundation for your project.",
            color: "bg-blue-500",
        },
        {
            icon: Pen,
            title: "Design",
            shortDesc: "UI/UX Creation",
            fullDesc:
                "We create clean, user-centered designs that align with your brand and focus on usability.",
            color: "bg-purple-500",
        },
        {
            icon: Code,
            title: "Build",
            shortDesc: "Development",
            fullDesc:
                "We build scalable, reliable solutions using clean code and modern technologies.",
            color: "bg-emerald-500",
        },
        {
            icon: CheckCheck,
            title: "Test",
            shortDesc: "Quality Assurance",
            fullDesc:
                "We test across devices and browsers to ensure stability, performance, and security.",
            color: "bg-orange-500",
        },
        {
            icon: Rocket,
            title: "Launch",
            shortDesc: "Go Live",
            fullDesc:
                "We deploy your project and provide ongoing support to ensure long-term success.",
            color: "bg-indigo-500",
        },
    ];

    // ✅ AUTOPLAY LOGIC
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % steps.length);
        }, 4000); // Changes every 4 seconds

        return () => clearInterval(interval);
    }, []);

    // ✅ FIX: safely resolve active icon
    const ActiveIcon = steps[activeStep].icon;

    return (
        <section
            id="process"
            className="relative overflow-hidden bg-white py-20 lg:py-32">
            {/* Background Grid */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-40" />

            <div className="mx-auto max-w-6xl px-6 lg:px-8">
                {/* Header */}
                <div className="mb-12 text-center">
                    <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-500">
                        Our Workflow
                    </span>
                    <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        The Development Cycle
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:h-[500px] lg:items-center">
                    {/* LEFT PANEL - Read Only Indicators */}
                    <div className="space-y-3 lg:col-span-5">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                // ❌ REMOVED onClick and tap interaction
                                // Added cursor-default to indicate it's not clickable
                                className={`w-full rounded-2xl border p-4 text-left transition-all cursor-default ${
                                    activeStep === index
                                        ? "border-slate-900 bg-slate-900 text-white shadow-lg scale-105"
                                        : "border-slate-900 bg-white text-slate-900 opacity-60"
                                }`}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className={`rounded-lg p-2 ${
                                                activeStep === index
                                                    ? "bg-white/20 text-white"
                                                    : "bg-slate-100 text-slate-900"
                                            }`}>
                                            <step.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold">
                                                {step.title}
                                            </h3>
                                            <p className="text-xs opacity-70">
                                                {step.shortDesc}
                                            </p>
                                        </div>
                                    </div>
                                    {activeStep === index && (
                                        <div
                                            className={`h-8 w-1 ${step.color}`}
                                        />
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* RIGHT PANEL - Animated Display */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4 }}
                                    className="flex h-full flex-col justify-between">
                                    <div>
                                        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-900">
                                            <ActiveIcon className="h-8 w-8" />
                                        </div>

                                        <h3 className="mb-4 text-3xl font-bold text-slate-900">
                                            {steps[activeStep].title}
                                        </h3>

                                        <p className="text-lg text-slate-600">
                                            {steps[activeStep].fullDesc}
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-8">
                                        <div className="mb-2 flex justify-between text-sm font-semibold text-slate-400">
                                            <span>
                                                STEP {activeStep + 1} OF 5
                                            </span>
                                            <span>
                                                {Math.round(
                                                    ((activeStep + 1) / 5) * 100
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-slate-100">
                                            <motion.div
                                                className={`h-full rounded-full ${steps[activeStep].color}`}
                                                initial={{ width: 0 }}
                                                animate={{
                                                    width: `${
                                                        ((activeStep + 1) / 5) *
                                                        100
                                                    }%`,
                                                }}
                                                transition={{ duration: 0.4 }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
