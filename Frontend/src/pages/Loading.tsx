import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-900 to-blue-700 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full">
                <defs>
                    <pattern id="pattern" patternUnits="userSpaceOnUse" width="40" height="40">
                        <rect width="40" height="40" fill="none" />
                        <path d="M 0 40 L 40 0 M -10 10 L 10 -10 M 30 50 L 50 30" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
            <div className="flex flex-col justify-center items-center">
                {/* <DotLottieReact
                    src="../../public/loading3.lottie"
                    loop
                    autoplay
                    className="w-48 h-24" // Added margin below the animation
                /> */}
                <div className="flex flex-row items-center ">
                    <p className="text-4xl text-gray-300">Verifying authentication...</p>
                    <DotLottieReact
                        src="/loading2.lottie"
                        loop
                        autoplay
                        className="w-48 h-48 z-10" // Added margin below the animation
                    />
                </div>
            </div>
        </div>
    );
}
