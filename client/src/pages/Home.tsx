import { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import { GetQuoteModal } from "@/components/modals/GetQuoteModal";
import { useToast } from "@/hooks/use-toast";
import {
    submitServiceInquiry,
    submitContact,
    submitNewsletterFooter,
    submitQuote,
} from "@/lib/api";

export default function Home() {
    const { toast } = useToast();
    const [bookDemoOpen, setBookDemoOpen] = useState(false);
    const [quoteOpen, setQuoteOpen] = useState(false);

    const handleBookDemo = async (data: {
        name: string;
        email: string;
        service: string;
        message: string;
    }) => {
        try {
            await submitServiceInquiry({
                ...data,
                page: "home",
            });
            toast({
                title: "Demo Request Received!",
                description:
                    "We'll be in touch soon to schedule your personalized demo.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit your request. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleQuoteSubmit = async (data: {
        name: string;
        email: string;
        projectType: string;
        budget: string;
        message: string;
    }) => {
        try {
            await submitQuote({
                ...data,
                page: "home",
            });
            toast({
                title: "Quote Request Received!",
                description: "We'll review your details and get back to you with a tailored quote.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit quote request. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleGetQuote = async () => {
        setQuoteOpen(true);
    };

    const handleContactSubmit = async (data: {
        name: string;
        email: string;
        phone?: string;
        message: string;
    }) => {
        try {
            await submitContact({
                ...data,
                page: "home",
            });
            toast({
                title: "Message Sent!",
                description:
                    "We've received your message and will respond as soon as possible.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send your message. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleNewsletterSubmit = async (email: string) => {
        try {
            await submitNewsletterFooter(email);
            toast({
                title: "Subscribed!",
                description: "You're now subscribed to our newsletter.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to subscribe. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="min-h-screen">
            <Navbar onCTAClick={() => setBookDemoOpen(true)} />

            <Hero
                onBookDemo={() => setBookDemoOpen(true)}
                onGetQuote={handleGetQuote}
            />
            <Services />
            <Process />
            <About />
            <Pricing onGetStarted={() => setBookDemoOpen(true)} onGetQuote={handleGetQuote} />
            <Contact onSubmit={handleContactSubmit} />
            <Testimonials />
            <Footer onNewsletterSubmit={handleNewsletterSubmit} />

            <BookDemoModal
                open={bookDemoOpen}
                onOpenChange={setBookDemoOpen}
                onSubmit={handleBookDemo}
            />

            <GetQuoteModal
                open={quoteOpen}
                onOpenChange={setQuoteOpen}
                onSubmit={handleQuoteSubmit}
            />
        </div>
    );
}
