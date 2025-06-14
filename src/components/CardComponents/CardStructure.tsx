interface Props {
    children: React.ReactNode;
    additional_classes?: string;
};

const CardStructure = ({children, additional_classes}: Props) => {
    // Default card styles aligned with the new design system
    const defaultStyles = "bg-white border border-neutral-200 shadow-lg rounded-lg p-6 space-y-4";

    return (
        // w-full is a common default, h-auto allows card to size to content.
        // Specific height constraints can be passed via additional_classes.
        <div className={`w-full h-auto ${defaultStyles} ${additional_classes}`}>
            {children}
        </div>
    );
};

export default CardStructure;