import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
    {
        name: "Arjun Kumar",
        role: "Small Business Owner 🏪",
        review: "dcunovation built our website exactly how we needed 🙌 Clean design, fast loading, and very easy to work with.",
    },
    {
        name: "Priya Sharma",
        role: "Startup Founder 🚀",
        review: "Great experience overall 😊 Clear communication, modern design, and reliable hosting support. Highly recommended!",
    },
    {
        name: "Rahul Verma",
        role: "Freelancer 💻",
        review: "Professional work with great attention to detail ⭐ The website looks perfect and works smoothly on all devices.",
    },
];

export default function Testimonials() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % testimonials.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="bg-slate-50 py-20 lg:py-20">
            <div className="mx-auto max-w-3xl px-6 text-center">
                {/* Header */}
                <h2 className="text-3xl font-bold text-slate-900">
                    What Clients Say 💬
                </h2>
                <p className="mt-3 text-slate-600">
                    Real feedback from people we’ve worked with 🤝
                </p>

                {/* Testimonial Card */}
                <div className="relative mt-12 h-[220px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 flex items-center justify-center">
                            <div className="rounded-3xl bg-white p-8 shadow-lg">
                                <p className="text-lg text-slate-700 leading-relaxed">
                                    “{testimonials[index].review}”
                                </p>

                                <div className="mt-6">
                                    <p className="font-semibold text-slate-900">
                                        {testimonials[index].name}
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        {testimonials[index].role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}
