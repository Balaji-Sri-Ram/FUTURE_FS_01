import React from 'react';

// --- Volumetric Wrapper Component ---
// Significantly increased layers for "solid block" feel
const VolumetricIcon = ({ children, layers = 24, spacing = 1, brightness = 1, scale = 1 }) => {
    return (
        <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d', transform: `scale(${scale})` }}>
            {/* Extrusion Layers */}
            {[...Array(layers)].map((_, i) => (
                <div
                    key={i}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        transform: `translateZ(${- (i + 1) * spacing}px)`,
                        filter: `brightness(${brightness * 0.6}) grayscale(0.2) contrast(1.2)`,
                        opacity: 1,
                    }}
                >
                    {children}
                </div>
            ))}
            {/* Front Face */}
            <div className="relative z-10 drop-shadow-2xl" style={{ transform: 'translateZ(1px)' }}>
                {children}
            </div>
        </div>
    );
};

// Gradients and Filters Definition
const Defs = () => (
    <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feOffset in="blur" dx="2" dy="4" result="offsetBlur" />
            <feFlood floodColor="black" floodOpacity="0.3" result="offsetColor" />
            <feComposite in="offsetColor" in2="offsetBlur" operator="in" result="offsetBlur" />
            <feBlend in="SourceGraphic" in2="offsetBlur" mode="normal" />
        </filter>

        <linearGradient id="metal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="50%" stopColor="#9e9e9e" />
            <stop offset="100%" stopColor="#616161" />
        </linearGradient>

        {/* Luminance Mask Construction for Shoe */}
        <mask id="shoe-mask" maskContentUnits="objectBoundingBox">
            <rect width="1" height="1" fill="white" />
            {/* Invert the image logic: We want Black BG to be Transparent (Mask Black) and Colored Shoe to be Opaque (Mask White).
           Normally luminance masks use White=Opaque.
           The shoe is bright/colored. The BG is black.
           So simply using the image as mask should work to hide black areas.
       */}
            <image href="/assets/sneaker.png" width="1" height="1" preserveAspectRatio="none" />
        </mask>
    </defs>
);

// --- Icons ---

// SNEAKER: Uses the SVG Mask to remove background + Volumetric stack
// We render the image INSIDE an SVG to apply the mask properly
export const SneakerIcon = () => {
    return (
        <VolumetricIcon layers={32} spacing={1.5} brightness={0.8} scale={0.9}>
            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
                <defs>
                    <mask id="mask-shoe">
                        {/* Light pixels = opaque, Dark pixels = transparent */}
                        <image href="/assets/sneaker.png" width="500" height="500" />
                    </mask>
                </defs>
                <image
                    href="/assets/sneaker.png"
                    width="500"
                    height="500"
                    mask="url(#mask-shoe)"
                />
            </svg>
        </VolumetricIcon>
    );
}


export const HeadsetIcon = ({ color }) => (
    <VolumetricIcon layers={24} spacing={1.5}>
        <svg viewBox="0 0 200 200" className="w-full h-full transform-gpu">
            <Defs />
            <g transform="translate(10, 10)">
                <path d="M40,100 A60,60 0 1,1 160,100" fill="none" stroke="#111" strokeWidth="22" strokeLinecap="round" />
                <path d="M40,100 A60,60 0 1,1 160,100" fill="none" stroke={color} strokeWidth="18" strokeLinecap="round" />
                <path d="M40,100 A60,60 0 1,1 160,100" fill="none" stroke="url(#metal-grad)" strokeWidth="6" strokeLinecap="round" opacity="0.3" />

                <rect x="15" y="85" width="45" height="80" rx="15" fill="#222" stroke="#111" strokeWidth="2" />
                <rect x="140" y="85" width="45" height="80" rx="15" fill="#222" stroke="#111" strokeWidth="2" />

                <path d="M25,90 L25,160" stroke={color} strokeWidth="4" opacity="0.8" />
                <path d="M175,90 L175,160" stroke={color} strokeWidth="4" opacity="0.8" />
            </g>
        </svg>
    </VolumetricIcon>
);

export const WatchIcon = ({ color }) => (
    <VolumetricIcon layers={20} spacing={1.2}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <Defs />
            <g transform="translate(10, 10)">
                {/* Strap Block */}
                <path d="M75,20 L125,20 L130,180 L70,180 Z" fill="#1a1a1a" />

                {/* Case Block */}
                <circle cx="100" cy="100" r="52" fill="#222" />
                <circle cx="100" cy="100" r="48" fill="url(#metal-grad)" />
                <circle cx="100" cy="100" r="44" fill="#000" />

                {/* Elements */}
                <circle cx="100" cy="100" r="40" fill="none" stroke={color} strokeWidth="4" />
                <rect x="96" y="60" width="8" height="40" rx="4" fill={color} />
                <rect x="96" y="100" width="30" height="8" rx="4" fill="#fff" />
                <circle cx="100" cy="100" r="40" fill={color} opacity="0.2" />
            </g>
        </svg>
    </VolumetricIcon>
);

export const LampIcon = ({ color }) => (
    <VolumetricIcon layers={25} spacing={1.5}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <Defs />
            <g transform="translate(10, 10)">
                <ellipse cx="100" cy="160" rx="45" ry="15" fill="#222" />
                <path d="M100,160 L100,80" fill="none" stroke="#444" strokeWidth="12" />
                <path d="M60,80 L140,80 L160,130 L40,130 Z" fill={color} />
                <ellipse cx="100" cy="130" rx="60" ry="10" fill={color} filter="brightness(0.7)" />
                <ellipse cx="100" cy="80" rx="40" ry="8" fill="#fff" opacity="0.4" />
            </g>
        </svg>
    </VolumetricIcon>
);

export const SpeakerIcon = ({ color }) => (
    <VolumetricIcon layers={28} spacing={1.5}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <Defs />
            <g transform="translate(10, 10)">
                <rect x="40" y="30" width="120" height="150" rx="10" fill="#222" stroke={color} strokeWidth="4" />
                <circle cx="100" cy="65" r="22" fill="#333" />
                <circle cx="100" cy="130" r="40" fill="#111" stroke={color} strokeWidth="4" />
            </g>
        </svg>
    </VolumetricIcon>
);

export const BrainIcon = ({ color }) => (
    <VolumetricIcon layers={18} spacing={1.5}>
        <svg viewBox="0 0 200 200" className="w-full h-full">
            <Defs />
            <g transform="translate(10, 10)">
                <path d="M50,70 Q40,100 60,140 Q100,160 140,140 Q160,100 150,70 Q130,40 100,50 Q70,40 50,70" fill="#ddd" stroke={color} strokeWidth="3" />
                <path d="M70,80 Q80,70 90,80" fill="none" stroke={color} strokeWidth="3" />
                <path d="M130,80 Q120,70 110,80" fill="none" stroke={color} strokeWidth="3" />
            </g>
        </svg>
    </VolumetricIcon>
);

const ProductIcon = ({ type, color }) => {
    switch (type) {
        case 'sneaker': return <SneakerIcon />;
        case 'headset': return <HeadsetIcon color={color} />;
        case 'watch': return <WatchIcon color={color} />;
        case 'lamp': return <LampIcon color={color} />;
        case 'speaker': return <SpeakerIcon color={color} />;
        case 'brain': return <BrainIcon color={color} />;
        default: return <SneakerIcon />;
    }
};

export default ProductIcon;
