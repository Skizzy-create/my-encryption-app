// src/components/Layout/PageLayout.tsx
import React from 'react';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-blue-500 p-8 flex flex-col items-center">
            {children}
            <div className='mt-16 text-white'>
                <p className="text-sm">© 2024 MyEncrypt | Version 3.2.1</p>
            </div>
        </div>
    );
};

export default PageLayout;