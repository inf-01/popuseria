'use client';

import React from 'react';
import Image from 'next/image';
import logoImg from '../assets/pupusas_logo.png';

export default function Logo({ className = "w-32 h-32" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Base Neumórfica del Logo */}
            <div className="absolute inset-x-[-15%] inset-y-[-15%] rounded-[30px] neu-flat shadow-lg" />

            {/* Imagen del Logo */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-2">
                <Image
                    src={logoImg}
                    alt="Pupusería Logo"
                    className="object-contain w-full h-full"
                    priority
                />
            </div>
        </div>
    );
}
