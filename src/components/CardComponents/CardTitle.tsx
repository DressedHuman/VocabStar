interface Props {
    title: string;
    additional_classes?: string; // Added for flexibility
};

const CardTitle = ({ title, additional_classes }: Props) => {
    // Default title styles aligned with the new design system
    const defaultStyles = "font-heading text-primary text-2xl text-center mb-4";

    return (
        <h2 className={`${defaultStyles} ${additional_classes || ""}`}>{title}</h2>
    );
};

export default CardTitle;