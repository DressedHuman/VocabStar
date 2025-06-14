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
    switch (variant) {
        case "primary":
            variantStyles = `bg-primary text-neutral-100 hover:bg-secondary focus:ring-secondary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
            break;
        case "secondary":
            variantStyles = `bg-neutral-200 text-primary border border-primary hover:bg-neutral-300 hover:border-secondary focus:ring-secondary ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
            break;
    }

    return (
        <button
            type={button_type}
            className={`${baseStyles} ${variantStyles} ${additional_classes}`}
            onClick={onClickHandler}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;