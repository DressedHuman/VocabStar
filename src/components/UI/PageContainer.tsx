import React from 'react';

interface Props {
    children: React.ReactNode;
    additional_classes?: string;
    useNeutralBackground?: boolean; // To control bg-neutral-100
}

const PageContainer: React.FC<Props> = ({ children, additional_classes, useNeutralBackground = false }) => {
    const baseClasses = "py-8 px-4 sm:px-6 lg:px-8 min-h-screen";
    const backgroundClass = useNeutralBackground ? "bg-neutral-100" : "";

    return (
        <div className={`${baseClasses} ${backgroundClass} ${additional_classes || ""}`}>
            {children}
        </div>
    );
};

export default PageContainer;
