'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/pupusas_logo.png';

export default function Logo({ className = "w-full h-full" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className} p-2`}>
            <Image
                src={logoImg}
                alt="Pupusería Logo"
                className="object-contain w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                priority
            />
        </div>
    );
}
