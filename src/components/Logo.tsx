'use client';

import React from 'react';

export default function Logo({ className = "w-32 h-32" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            {/* Base Neumórfica del Logo */}
            <div className="absolute inset-0 rounded-full neu-flat shadow-lg" />

            {/* Icono SVG */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="relative z-10 w-3/4 h-3/4"
            >
                {/* Cuerpo de la Pupusa */}
                <circle
                    cx="50"
                    cy="50"
                    r="35"
                    stroke="#8A9A86"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />

                {/* Relleno Mixto (3 puntos de ingredientes / carga) */}
                <circle cx="50" cy="35" r="5" fill="#e06c4c" className="animate-pulse" />
                <circle cx="40" cy="55" r="5" fill="#f6993f" />
                <circle cx="60" cy="55" r="5" fill="#2C3E50" />

                {/* Línea de vapor / Letra P sutil */}
                <path
                    d="M50 20C55 15 65 15 65 25C65 35 50 30 50 40"
                    stroke="#e06c4c"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="opacity-60"
                />
            </svg>
        </div>
    );
}
