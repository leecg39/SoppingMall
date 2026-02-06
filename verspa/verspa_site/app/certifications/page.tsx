import { ShieldCheck, Download, Award, FileText, CheckCircle2 } from 'lucide-react';
import certificationsData from '@/data/certifications.json';
import { Certification } from '@/types';

export default function CertificationsPage() {
    const certifications = certificationsData.certifications as Certification[];
    const mainCerts = certifications.filter(c => c.type === 'certification');
    const patents = certifications.filter(c => c.type === 'patent');

    return (
        <div className="flex flex-col min-h-screen bg-background-dark">
            {/* Hero Section */}
            <section className="relative w-full py-32 px-6 lg:px-40 flex justify-center border-b border-white/5 bg-gradient-to-b from-background-dark to-surface-dark/20">
                <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-16">
                    <div className="flex-1 flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 w-fit">
                            <ShieldCheck size={16} className="text-primary" />
                            <span className="text-primary text-xs font-bold uppercase tracking-widest">Official Standards</span>
                        </div>
                        <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-tight">
                            Global Quality <br />Standards
                        </h1>
                        <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed max-w-xl">
                            Engineered for safety. Certified for the world. VERSPA meets rigorous international safety and quality benchmarks.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <button className="flex items-center justify-center rounded-xl h-14 px-8 bg-primary text-background-dark text-base font-bold hover:bg-white transition-all shadow-lg shadow-primary/20">
                                View Documentation
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-surface-dark border border-white/5 relative group">
                            <img
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZuaoPtJAWXOYtkB8J9MY56EG97gCYv3JWIYzDARkmxmJ-_UPSnosTP2oA2hNyVWRh10-eHdUkCDkHVL8M_ZSu2DeHJn6WJWrNRjqIjnT7uW5DdV6jXG-XCyLVj80d8BMm49nHZpze9xcv6Gv7ojrA6RnUTOr5XpQkDqv_MDDAvHuvibXvLXGaSmYgJnHAvKWgna6DMQgewlipXhs9dnC5J7ScfQf02mZ9gePyIiS7rvBV6lx8ra02FZe-3Uz7qDJgQ2Nkxx50dzU"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                                alt="Quality Assurance"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/20 rounded-full text-primary">
                                        <Award size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold">Premium Assurance</p>
                                        <p className="text-white/40 text-xs">Verified by top global agencies</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Grid */}
            <section className="w-full py-24 px-6 lg:px-40 flex justify-center">
                <div className="max-w-5xl w-full flex flex-col gap-12">
                    <div className="flex items-center justify-between border-b border-white/5 pb-8">
                        <h2 className="text-white text-3xl font-bold tracking-tight">Official Certifications</h2>
                        <button className="text-primary text-sm font-bold hover:text-white transition-all flex items-center gap-2">
                            Download All <Download size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {mainCerts.map((cert) => (
                            <div key={cert.id} className="group bg-surface-dark/30 border border-white/5 rounded-3xl p-10 hover:border-primary/50 transition-all relative overflow-hidden flex flex-col">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                                    <ShieldCheck size={120} />
                                </div>
                                <div className="flex items-start justify-between mb-8">
                                    <div className="size-14 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 text-white font-black text-2xl">
                                        {cert.name.split(' ')[0]}
                                    </div>
                                    <span className="px-4 py-1.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest border border-green-500/20">Active</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{cert.name}</h3>
                                <p className="text-white/40 leading-relaxed italic mb-8">
                                    Verified by {cert.issuedBy}. Full compliance with international safety and quality control standards since {cert.year}.
                                </p>
                                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Release Year</span>
                                        <span className="text-xs text-white/60 font-medium">{cert.year}</span>
                                    </div>
                                    <a href={cert.pdfPath} className="flex items-center gap-2 text-primary hover:text-white text-sm font-bold transition-all">
                                        <FileText size={18} />
                                        View Certificate
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IP & Patents Section */}
            <section className="w-full py-24 px-6 lg:px-40 flex justify-center bg-surface-dark relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#f59e0b 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-5xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
                    <div className="flex-1">
                        <h2 className="text-4xl font-black tracking-tight text-white mb-6">Innovation <br /><span className="text-primary">Protected</span></h2>
                        <p className="text-white/60 text-lg mb-10 max-w-md leading-relaxed">
                            Our commitment to research and development is backed by a robust intellectual property portfolio.
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            <div className="bg-background-dark/50 p-6 rounded-2xl border border-white/5">
                                <p className="text-3xl font-black text-primary mb-1">12+</p>
                                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Active Patents</p>
                            </div>
                            <div className="bg-background-dark/50 p-6 rounded-2xl border border-white/5">
                                <p className="text-3xl font-black text-primary mb-1">24+</p>
                                <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Design Rights</p>
                            </div>
                        </div>
                        <button className="px-10 py-4 bg-white/5 text-white border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all">
                            Download Patent Portfolio
                        </button>
                    </div>

                    <div className="flex-1 space-y-4">
                        {patents.map(patent => (
                            <div key={patent.id} className="flex items-center justify-between p-6 rounded-2xl bg-background-dark/80 border border-white/5 hover:border-primary/20 transition-all group">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-background-dark transition-all">
                                        <FileText size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm tracking-tight">{patent.name}</h4>
                                        <p className="text-white/30 text-xs">Registry: {patent.year}</p>
                                    </div>
                                </div>
                                <button className="text-white/20 group-hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Quote */}
            <section className="py-24 px-6 lg:px-40 text-center">
                <div className="max-w-2xl mx-auto">
                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8">
                        <ShieldCheck size={28} />
                    </div>
                    <h2 className="text-white text-3xl font-bold mb-6">Uncompromising Quality Control</h2>
                    <p className="text-white/40 text-lg italic leading-relaxed">
                        "Quality is not just a standard at VERSPA; it is our foundation. From the first sketch to the final assembly, every component undergoes rigorous stress tests to ensure a lifetime of service."
                    </p>
                </div>
            </section>
        </div>
    );
}
