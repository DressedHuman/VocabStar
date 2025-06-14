interface Props {
    label: string;
    button_type?: "submit" | "reset" | "button" | undefined;
    variant?: "primary" | "secondary"; // Added variant prop
    additional_classes?: string;
    onClickHandler?: () => void;
    disabled?: boolean; // Added disabled prop
}

const Button = ({
    label,
    button_type = "button",
    variant = "primary",
    additional_classes,
    onClickHandler,
    disabled = false
}: Props) => {

    const baseStyles = "py-2 px-4 font-sans font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150 ease-in-out";

    let variantStyles = "";
    // Updated to use the new professional palette
    // primary: '#1A2B45', secondary: '#4DB0A2', neutral-50: '#F9FAFB'
    switch (variant) {
        case "primary":
            variantStyles = `bg-primary text-neutral-50 hover:opacity-90 focus:ring-secondary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
            break;
        case "secondary":
            // This variant is now a solid button using the secondary color.
            // Text changed from text-neutral-50 to text-neutral-900 for better contrast on secondary background.
            variantStyles = `bg-secondary text-neutral-900 hover:opacity-90 focus:ring-primary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
            break;
    }

    return (
        <button
            type={button_type}
            className={`${baseStyles} ${variantStyles} ${additional_classes || ""}`} // Added || "" for additional_classes
            onClick={onClickHandler}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;