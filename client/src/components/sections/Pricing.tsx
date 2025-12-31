import React from "react";
import { motion } from "framer-motion";
import {
    Check,
    ArrowRight,
    Star,
    Monitor,
    Layout,
    Zap,
    Shield,
    Headphones,
    Globe,
    Database,
} from "lucide-react";

interface PricingProps {
    onGetStarted: () => void;
    onGetQuote: () => void;
}

export function Pricing({ onGetStarted, onGetQuote }: PricingProps) {
    const plans = [
        {
            name: "Basic Website",
            description: "Best for: Personal sites & small businesses",
            price: "7,000+",
            period: "one-time",
            features: [
                { icon: Globe, text: "4–5 pages" },
                { icon: Database, text: "Responsive design" },
                { icon: Shield, text: "Basic SEO" },
                { icon: Layout, text: "Contact form" },
            ],
            color: "text-blue-600",
            badge: null,
            cta: "Get Started",
        },
        {
            name: "Business Website",
            description: "Best for: Startups & companies",
            price: "15,000+",
            period: "one-time",
            popular: true,
            features: [
                { icon: Globe, text: "8–12 pages" },
                { icon: Database, text: "Custom design" },
                { icon: Shield, text: "SEO friendly" },
                { icon: Layout, text: "WhatsApp & email integration" },
            ],
            color: "text-indigo-600",
            badge: "Most Popular",
            cta: "Get Started",
        },
        {
            name: "Advanced",
            description: "Best for: Custom requirements",
            price: "30,000+",
            period: "/ year",
            features: [
                { icon: Globe, text: "Web apps" },
                { icon: Database, text: "Dashboards" },
                { icon: Shield, text: "APIs" },
                { icon: Layout, text: "Authentication" },
            ],
            color: "text-emerald-600",
            badge: null,
            cta: "Get Started",
        },
    ];

    return (
        <section
            id="pricing"
            className="relative overflow-hidden bg-slate-50 py-1 lg:py-1">
            {/* Subtle Background Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.4]"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-20 max-w-2xl text-center">
                    <span className="inline-block rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6">
                        Pricing
                    </span>
                    <h2 className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Website Development Pricing
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Final pricing depends on features and complexity.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <div className="grid gap-8 lg:grid-cols-3 lg:gap-6">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className={`relative rounded-3xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                                plan.popular
                                    ? "border-2 border-indigo-600 ring-4 ring-indigo-50"
                                    : "border border-slate-200"
                            }`}>
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1 rounded-full bg-indigo-600 px-4 py-1 text-xs font-bold text-white shadow-lg">
                                        <Star className="h-3 w-3 fill-white" />
                                        {plan.badge}
                                    </div>
                                </div>
                            )}

                            <div className="mb-6">
                                <h3
                                    className={`text-xl font-bold ${
                                        plan.popular
                                            ? "text-indigo-600"
                                            : "text-slate-900"
                                    }`}>
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-slate-500">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-8 flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-slate-900">
                                    ₹{plan.price}
                                </span>
                                <span className="text-slate-500">
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="mb-8 space-y-4">
                                {plan.features.map((feature, idx) => (
                                    <li
                                        key={idx}
                                        className="flex items-center gap-3">
                                        <div
                                            className={`rounded-lg p-1 ${
                                                plan.popular
                                                    ? "bg-indigo-50 text-indigo-600"
                                                    : "bg-slate-50 text-slate-400"
                                            }`}>
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">
                                            {feature.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={onGetStarted}
                                className={`w-full rounded-xl py-3 font-bold transition-all hover:scale-[1.02] ${
                                    plan.popular
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700"
                                        : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                                }`}>
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Custom Development Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-16">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-12">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            {/* Left: Info */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Monitor className="h-6 w-6 text-indigo-600" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-indigo-600">
                                        Hosting
                                    </span>
                                </div>
                                <h3 className="font-heading text-2xl font-bold text-slate-900 mb-6">
                                    Hosting is optional. Clients can use their
                                    own hosting if preferred.
                                </h3>
                                <div className="mb-8 space-y-3 text-slate-600">
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Business Hosting</span>
                                        <span className="font-bold text-slate-900">
                                            ₹2999 / year
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-100 pb-2">
                                        <span>Pro Hosting</span>
                                        <span className="font-bold text-slate-900">
                                            ₹4999 / year
                                        </span>
                                    </div>
                                    <div className="flex justify-between pb-2">
                                        <span>Maintenance (Monthly)</span>
                                        <span className="font-bold text-slate-900">
                                            ₹1,000 / month
                                        </span>
                                    </div>
                                </div>
                                <button 
                                    onClick={onGetQuote}
                                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 hover:gap-3">
                                    Get a Quote
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            {/* Right: Visual/Decoration */}
                            <div className="relative h-full min-h-[300px] rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-8 flex items-center justify-center">
                                {/* Decorative Elements */}
                                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-indigo-200 blur-xl" />
                                <div className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-purple-200 blur-xl" />

                                {/* Central Icon/Graphic */}
                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="rounded-full bg-white p-6 shadow-lg">
                                        <Layout className="h-10 w-10 text-indigo-600" />
                                    </div>
                                    <p className="mt-4 text-sm font-medium text-indigo-900">
                                        Tailored Solutions
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
