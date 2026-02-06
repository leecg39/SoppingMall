"use client";

import React from 'react';
import { FileText, Download, Ruler } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface DownloadButtonProps {
    label: string;
    href: string;
    type?: 'brochure' | 'guide' | 'default';
    showIcon?: boolean;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
    label,
    href,
    type = 'default',
    showIcon = true
}) => {
    const handleDownload = () => {
        trackEvent('pdf_download', { label, type, href });
    };

    const getIcon = () => {
        switch (type) {
            case 'brochure': return <FileText size={18} className="text-gray-500 group-hover:text-primary transition-colors" />;
            case 'guide': return <Ruler size={18} className="text-gray-500 group-hover:text-primary transition-colors" />;
            default: return <FileText size={18} className="text-gray-500 group-hover:text-primary transition-colors" />;
        }
    };

    return (
        <a
            href={href}
            download
            onClick={handleDownload}
            className="flex items-center justify-between p-4 rounded-xl bg-background-dark border border-surface-dark hover:border-primary/30 transition-all group w-full"
        >
            <div className="flex items-center gap-3">
                {showIcon && getIcon()}
                <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                    {label}
                </span>
            </div>
            <Download size={16} className="text-white/20 group-hover:text-primary transition-colors" />
        </a>
    );
};

export default DownloadButton;
