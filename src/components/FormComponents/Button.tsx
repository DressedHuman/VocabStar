interface Props {
    label: string;
    button_type?: "submit" | "reset" | "button" | undefined;
    font_color?: string;
    additional_classes?: string;
    onClickHandler?: () => void;
}

const Button = ({ label, button_type, additional_classes, onClickHandler }: Props) => {
    return (
        <button
            type={button_type}
            className={`min-w-36 border-2 border-[#1E88E5] px-3 py-1 text-white bg-[#1E88E5] hover:bg-[#1565C0] text-lg font-medium rounded-md relative overflow-hidden group ${additional_classes}`}
            onClick={onClickHandler}
        >
            {label}
        </button>
    );
};

export default Button;