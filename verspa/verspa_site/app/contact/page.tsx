import { Mail, Phone, MapPin, Globe, Sparkles } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background-dark">
            {/* Header / Hero */}
            <section className="w-full pt-32 pb-16 px-6 lg:px-40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col gap-6 max-w-3xl">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                            <Globe size={16} className="text-primary" />
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Global Support</span>
                        </div>
                        <h1 className="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
                            Let's Create Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">Signature Experience</span>
                        </h1>
                        <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                            Ready to elevate your salon? Our global sales and support teams are here to help you choose the perfect equipment for your space.
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content: Info + Form */}
            <section className="w-full pb-32 px-6 lg:px-40">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">

                    {/* Left Column: Info & Media */}
                    <div className="lg:col-span-5 flex flex-col gap-12">
                        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5 group">
                            <img
                                alt="Luxury salon interior"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9xZp3UH-AwXfNWcqsNJwZG5Spxe4_ODq_xwwXpWZ-I3y5xMuH6-bfTOdf4kESET_L2kfOpUY079wrMdbmrvXajCDQO5s6tjkPq_mpbYC2ZJhJ2GWsh4T3PiPHPmJrB_dRqI_k4qw9yXjGiTib02zqSeINU7wBqeyZEaOfSdU7DK3TBXGDSdTAXQLDvnf5aJovW5sOU_5hSrzeeudXd9osxN4qgCiLs1KWoOGPyP7rfqjksKf7QHtMN0wr75APd9lk9HG-dCwyvUo"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent opacity-60"></div>
                            <div className="absolute bottom-8 left-8 right-8 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles size={16} className="text-primary" />
                                    <p className="font-bold text-lg uppercase tracking-widest">Global Showroom</p>
                                </div>
                                <p className="text-white/60 text-sm">Experience VERSPA in person at our flagship locations across Asia, Europe, and North America.</p>
                            </div>
                        </div>

                        {/* Contact Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 pt-8 border-t border-white/5">
                            <div className="flex items-start gap-5">
                                <div className="size-12 rounded-2xl bg-surface-dark flex items-center justify-center text-primary shrink-0 border border-white/5 group-hover:bg-primary group-hover:text-background-dark transition-all">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Email Sales</p>
                                    <a className="text-white/40 hover:text-primary transition-colors text-sm font-medium" href="mailto:sales@verspa-international.com">sales@verspa-international.com</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="size-12 rounded-2xl bg-surface-dark flex items-center justify-center text-primary shrink-0 border border-white/5">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Global Support</p>
                                    <p className="text-white/40 text-sm font-medium">+82 (0) 2 1234 5678</p>
                                    <p className="text-white/20 text-xs mt-1 uppercase tracking-widest">Mon - Fri, 9am - 6pm KST</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-5">
                                <div className="size-12 rounded-2xl bg-surface-dark flex items-center justify-center text-primary shrink-0 border border-white/5">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-white font-bold mb-1">Headquarters</p>
                                    <p className="text-white/40 text-sm font-medium leading-relaxed">
                                        67, Namdong-daero 215beon-gil, Namdong-gu, <br />
                                        Incheon, Republic of Korea
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: The Form */}
                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Map or Global Presence Mini-Section */}
            <section className="w-full py-20 bg-surface-dark/30 border-t border-white/5 text-center">
                <div className="container mx-auto px-6">
                    <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Export Network</p>
                    <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale items-center">
                        {['Seoul', 'Tokyo', 'London', 'New York', 'Dubai', 'Sydney'].map(city => (
                            <span key={city} className="text-2xl font-black text-white tracking-tighter">{city}</span>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
