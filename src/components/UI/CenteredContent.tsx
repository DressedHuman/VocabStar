import React from 'react';

interface Props {
    children: React.ReactNode;
    additional_classes?: string;
    maxWidth?: 'max-w-xs' | 'max-w-sm' | 'max-w-md' | 'max-w-lg' | 'max-w-xl' | 'max-w-2xl' | 'max-w-3xl' | 'max-w-4xl' | 'max-w-5xl' | 'max-w-6xl' | 'max-w-7xl' | 'max-w-full' | 'max-w-screen-sm' | 'max-w-screen-md' | 'max-w-screen-lg' | 'max-w-screen-xl' | 'max-w-screen-2xl';
    textAlign?: 'text-left' | 'text-center' | 'text-right' | 'text-justify';
}

const CenteredContent: React.FC<Props> = ({
    children,
    additional_classes,
    maxWidth = 'max-w-2xl',
    textAlign = 'text-left' // Default to left, as text-center is not always desired
}) => {
    const baseClasses = `mx-auto`;

    return (
        <div className={`${baseClasses} ${maxWidth} ${textAlign} ${additional_classes || ""}`}>
            {children}
        </div>
    );
};

export default CenteredContent;
