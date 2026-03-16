import { useState, useMemo } from "react";
import { HelpCircle, MessageCircle, Phone, Mail, Search as SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover";
import { ScrollArea } from "./ui/scroll-area";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "./ui/accordion";
import { Input } from "./ui/input";
import { toast } from "sonner";

const faqs = [
    {
        question: "How do I book a session?",
        answer: "Find a tutor, visit their profile, and click 'Book Session'. Choose a time slot and confirm."
    },
    {
        question: "How do I cancel a booking?",
        answer: "Go to your Dashboard, find the session under 'Upcoming', and click the cancel option."
    },
    {
        question: "Are the sessions online?",
        answer: "Yes, most sessions are conducted via our integrated video platform."
    },
    {
        question: "What is the refund policy?",
        answer: "Full refunds are available for cancellations made 24 hours before the session."
    }
];

export function HelpSection() {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = useMemo(() => {
        return faqs.filter(faq =>
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    const handleSupportAction = (action: string) => {
        toast.success(`Starting ${action}...`, {
            description: "Our team will be with you shortly.",
        });
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        size="lg"
                        className="h-14 w-14 rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 hover:scale-110 transition-all duration-300 p-0 overflow-hidden group"
                    >
                        <HelpCircle className="w-8 h-8 text-white group-hover:rotate-12 transition-transform" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 mr-4 mb-4 border-none shadow-2xl rounded-2xl overflow-hidden animate-in slide-in-from-bottom-5">
                    <div className="bg-blue-600 p-6 text-white text-center relative">
                        <h3 className="text-xl font-bold mb-1">How can we help?</h3>
                        <p className="text-blue-100 text-sm">We're here to support your journey</p>
                    </div>

                    <div className="p-4 bg-gray-50 border-b">
                        <div className="relative">
                            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <Input
                                placeholder="Search help..."
                                className="pl-9 h-9 bg-white border-gray-200"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <ScrollArea className="max-h-[350px]">
                        <div className="p-4 space-y-6 bg-white">
                            {/* FAQ Section */}
                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                                    {searchQuery ? "Search Results" : "Popular Questions"}
                                </h4>

                                {filteredFaqs.length > 0 ? (
                                    <Accordion type="single" collapsible className="w-full">
                                        {filteredFaqs.map((faq, i) => (
                                            <AccordionItem key={i} value={`item-${i}`} className="border-gray-100">
                                                <AccordionTrigger className="text-sm font-semibold hover:no-underline hover:text-blue-600 text-left py-3">
                                                    {faq.question}
                                                </AccordionTrigger>
                                                <AccordionContent className="text-xs text-gray-500 leading-relaxed">
                                                    {faq.answer}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <p className="text-sm text-gray-500 py-4 text-center">No results found for "{searchQuery}"</p>
                                )}
                            </section>

                            <hr className="border-gray-100" />

                            {/* Contact Section */}
                            <section>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Contact Support</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Live Chat")}
                                    >
                                        <MessageCircle className="w-4 h-4 text-blue-600" />
                                        Live Chat
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Email Support")}
                                    >
                                        <Mail className="w-4 h-4 text-blue-600" />
                                        Email Support
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="justify-start gap-2 h-10 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-all"
                                        onClick={() => handleSupportAction("Phone Support")}
                                    >
                                        <Phone className="w-4 h-4 text-blue-600" />
                                        Call Us
                                    </Button>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>
                </PopoverContent>
            </Popover>
        </div>
    );
}
