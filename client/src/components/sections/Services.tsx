import { motion } from "framer-motion";
import { Code, Server, LifeBuoy, CheckCircle2, ArrowRight } from "lucide-react";

export function Services() {
    const services = [
        {
            id: "01",
            icon: Code,
            title: "Web Development",
            description:
                "Crafting modern, responsive, and high-performance websites tailored to your business needs.",
            color: "text-blue-600",
            border: "bg-blue-600",
            features: [
                "Business websites",
                "Custom web apps",
                "Responsive design",
            ],
        },
        {
            id: "02",
            icon: Server,
            title: "Cloud Hosting",
            description:
                "Reliable, secure, and fast cloud infrastructure to keep your business running 24/7.",
            color: "text-emerald-600",
            border: "bg-emerald-600",
            features: [
                "cPanel hosting",
                "Fast & secure servers",
                "Free SSL included",
            ],
        },
        {
            id: "03",
            icon: LifeBuoy,
            title: "Maintenance & Support",
            description:
                "Ongoing technical assistance to ensure your digital products remain updated and secure.",
            color: "text-purple-600",
            border: "bg-purple-600",
            features: [
                "Updates & backups",
                "Security monitoring",
                "Technical support",
            ],
        },
    ];

    return (
        <section
            id="services"
            className="relative overflow-hidden bg-slate-50 py-8 lg:py-20">
            {/* Background Texture */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-16 max-w-3xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-block">
                        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-600 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-indigo-500"></span>
                            Our Services
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="font-heading text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                        Digital Solutions for Your Business
                    </motion.h2>
                </div>

                {/* Grid Layout */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: 0.2 + index * 0.1,
                            }}
                            className="group relative">
                            {/* Card Container */}
                            <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                                {/* Left Accent Border */}
                                <div
                                    className={`absolute top-0 left-0 h-full w-1.5 ${service.border} transition-all duration-300 group-hover:w-2`}
                                />

                                {/* Card Content */}
                                <div className="p-8">
                                    {/* Top Section: Icon & Title */}
                                    <div className="mb-6">
                                        <div
                                            className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 ${service.color} transition-colors group-hover:bg-white`}>
                                            <service.icon className="h-7 w-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-slate-100 mb-6" />

                                    {/* Checklist Features */}
                                    <ul className="space-y-3 mb-8">
                                        {service.features.map(
                                            (feature, idx) => (
                                                <li
                                                    key={idx}
                                                    className="flex items-start gap-3 text-sm font-medium text-slate-700">
                                                    <CheckCircle2
                                                        className={`h-5 w-5 shrink-0 ${service.color} opacity-70`}
                                                    />
                                                    <span>{feature}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>

                                    {/* CTA Link */}
                                    <a
                                        href="#contact"
                                        className={`inline-flex items-center gap-2 text-sm font-bold ${service.color} transition-colors group-hover:gap-3`}>
                                        Learn more{" "}
                                        <ArrowRight className="h-4 w-4" />
                                    </a>
                                </div>

                                {/* Hover Background Glow Effect */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
