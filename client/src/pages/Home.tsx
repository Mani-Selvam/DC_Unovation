import { useState, useEffect } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
// import { Portfolio } from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
// import { Metrics } from "@/components/sections/Metrics";
// import { Blog } from "@/components/sections/Blog";
import { Careers } from "@/components/sections/Careers";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { BookDemoModal } from "@/components/modals/BookDemoModal";
import { ProjectInterestModal } from "@/components/modals/ProjectInterestModal";
import { JobApplicationModal } from "@/components/modals/JobApplicationModal";
import { GoogleLoginButton } from "@/components/GoogleLoginButton";
import { useToast } from "@/hooks/use-toast";
import { getStoredUser, type GoogleUser } from "@/lib/googleAuth";
import {
    submitServiceInquiry,
    submitProjectInterest,
    submitJobApplication,
    submitContact,
    submitNewsletterFooter,
} from "@/lib/api";
import type { PortfolioProject } from "@/data/portfolio";

export default function Home() {
    const { toast } = useToast();
    const [bookDemoOpen, setBookDemoOpen] = useState(false);
    const [projectInterestOpen, setProjectInterestOpen] = useState(false);
    const [selectedProject, setSelectedProject] =
        useState<PortfolioProject | null>(null);
    const [jobApplicationOpen, setJobApplicationOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<GoogleUser | null>(null);

    useEffect(() => {
        setCurrentUser(getStoredUser());
    }, []);

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

    const handleGetQuote = async () => {
        setBookDemoOpen(true);
    };

    const handleProjectInterest = (project: PortfolioProject) => {
        setSelectedProject(project);
        setProjectInterestOpen(true);
    };

    const handleProjectInterestSubmit = async (data: {
        project: string;
        name: string;
        email: string;
        message?: string;
    }) => {
        try {
            await submitProjectInterest({
                ...data,
                page: "home",
            });
            toast({
                title: "Inquiry Submitted!",
                description:
                    "We'll reach out to discuss your project requirements shortly.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to submit your inquiry. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleJobApplication = async (data: {
        name: string;
        email: string;
        phone: string;
        role: string;
        message: string;
    }) => {
        try {
            await submitJobApplication(data);
            toast({
                title: "Application Received!",
                description:
                    "Thank you for your interest. We'll review your application and be in touch.",
            });
        } catch (error) {
            toast({
                title: "Error",
                description:
                    "Failed to submit your application. Please try again.",
                variant: "destructive",
            });
        }
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

            {currentUser && (
                <div className="fixed top-20 right-6 z-40">
                    <GoogleLoginButton onUserChange={setCurrentUser} />
                </div>
            )}

            <Hero
                onBookDemo={() => setBookDemoOpen(true)}
                onGetQuote={handleGetQuote}
            />
            <Services />
            <Process />
            {/* <Portfolio onProjectInterest={handleProjectInterest} /> */}
            <About />
            <Pricing />
            {/* <Metrics /> */}
            {/* <Blog /> */}
            {/* <Careers onApplyClick={() => setJobApplicationOpen(true)} /> */}
            <Contact onSubmit={handleContactSubmit} />
            <Testimonials />
            <Footer onNewsletterSubmit={handleNewsletterSubmit} />

            {!currentUser && (
                <div className="fixed bottom-6 right-6 z-40 max-w-xs">
                    <div className="bg-card border border-card-border rounded-xl shadow-xl p-4">
                        <p className="text-sm text-muted-foreground mb-3">
                            Sign in to autofill forms with your info
                        </p>
                        <GoogleLoginButton onUserChange={setCurrentUser} />
                    </div>
                </div>
            )}

            <BookDemoModal
                open={bookDemoOpen}
                onOpenChange={setBookDemoOpen}
                onSubmit={handleBookDemo}
            />

            <ProjectInterestModal
                open={projectInterestOpen}
                onOpenChange={setProjectInterestOpen}
                projectTitle={selectedProject?.title || ""}
                onSubmit={handleProjectInterestSubmit}
            />

            <JobApplicationModal
                open={jobApplicationOpen}
                onOpenChange={setJobApplicationOpen}
                onSubmit={handleJobApplication}
            />
        </div>
    );
}
