'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, Send, Loader2 } from 'lucide-react';

const ContactForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            region: formData.get('region'),
            interest: formData.get('interest'),
            message: formData.get('message'),
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Failed to send inquiry');

            setSubmitted(true);
        } catch (err) {
            setError('Something went wrong. Please try again later.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="bg-surface-dark border border-border-dark rounded-xl p-10 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="size-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                    <Send size={32} />
                </div>
                <h3 className="text-white text-3xl font-bold mb-4">Request Received</h3>
                <p className="text-text-muted max-w-md">
                    Thank you for reaching out. A VERSPA specialist will review your request and contact you within 24 hours.
                </p>
                <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-primary hover:underline font-medium"
                >
                    Send another message
                </button>
            </div>
        );
    }

    return (
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6 md:p-8 lg:p-10 shadow-xl">
            <div className="mb-8">
                <h3 className="text-white text-2xl font-bold mb-2">Request a Quote</h3>
                <p className="text-text-muted text-sm">Please fill out the form below. We typically reply within 24 hours.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name & Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Full Name</span>
                        <input
                            name="name"
                            type="text"
                            required
                            placeholder="e.g. Jane Doe"
                            className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 px-4 outline-none transition-all placeholder:text-text-muted/30"
                        />
                    </label>
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Company / Salon Name</span>
                        <input
                            name="company"
                            type="text"
                            placeholder="e.g. Luxe Studio"
                            className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 px-4 outline-none transition-all placeholder:text-text-muted/30"
                        />
                    </label>
                </div>

                {/* Row 2: Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Business Email</span>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/50 size-5" />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="name@company.com"
                                className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 pl-10 pr-4 outline-none transition-all placeholder:text-text-muted/30"
                            />
                        </div>
                    </label>
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Phone Number</span>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted/50 size-5" />
                            <input
                                name="phone"
                                type="tel"
                                placeholder="+1 (555) 000-0000"
                                className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 pl-10 pr-4 outline-none transition-all placeholder:text-text-muted/30"
                            />
                        </div>
                    </label>
                </div>

                {/* Row 3: Country & Interest */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Country / Region</span>
                        <select name="region" className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 px-4 outline-none transition-all appearance-none cursor-pointer">
                            <option value="" disabled selected>Select Region</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="EU">Europe</option>
                            <option value="ASIA">Asia Pacific</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </label>
                    <label className="flex flex-col flex-1">
                        <span className="text-white text-sm font-medium pb-2">Product Interest</span>
                        <select name="interest" className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary h-12 px-4 outline-none transition-all appearance-none cursor-pointer">
                            <option value="" disabled selected>Select Interest</option>
                            <option value="X1">Model X1 - Luxury Chair</option>
                            <option value="S2">Model S2 - Compact Chair</option>
                            <option value="BULK">Bulk Order for Chain</option>
                            <option value="DIST">Distribution Partnership</option>
                        </select>
                    </label>
                </div>

                {/* Row 4: Message */}
                <label className="flex flex-col flex-1">
                    <span className="text-white text-sm font-medium pb-2">Message / Specific Requirements</span>
                    <textarea
                        name="message"
                        placeholder="Tell us about your salon capacity, estimated timeline..."
                        className="flex w-full rounded-lg text-white border border-input-border bg-input-bg focus:ring-1 focus:ring-primary focus:border-primary min-h-[140px] p-4 outline-none transition-all placeholder:text-text-muted/30 resize-none"
                    ></textarea>
                </label>

                {/* Submit Area */}
                <div className="pt-4 flex flex-col md:flex-row gap-6 items-center justify-between">
                    <p className="text-xs text-text-muted/60 max-w-xs text-center md:text-left">
                        By submitting this form, you agree to our <Link href="#privacy" className="underline hover:text-white">Privacy Policy</Link> and <Link href="#terms" className="underline hover:text-white">Terms of Service</Link>.
                    </p>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full md:w-auto flex min-w-[160px] cursor-pointer items-center justify-center rounded-lg h-12 px-8 bg-primary hover:bg-primary/90 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all text-background-dark text-base font-bold tracking-wide shadow-lg shadow-primary/20"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Submit Request'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
