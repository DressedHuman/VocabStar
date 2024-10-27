interface Props {
    label: string;
    button_type?: "submit" | "reset" | "button" | undefined;
    onClickHandler?: () => void;
}

const Button = ({ label, button_type, onClickHandler }: Props) => {
    return (
        <button
            type={button_type}
            className="min-w-36 border-2 border-border_color px-3 py-1 text-font_color hover:text-white bg-transparent text-lg font-medium rounded-md relative overflow-hidden group"
            onClick={onClickHandler}
        >
            {label}

            {/* background animation on mouse over */}
            <span className="absolute -top-16 -left-10 -z-10 w-0 h-0 group-hover:w-40 group-hover:h-40 duration-300 rounded-[50%] bg-[#0a263d]"></span>
            <span className="absolute -top-16 -left-10 -z-20 w-0 h-0 group-hover:w-72 group-hover:h-72 duration-300 rounded-[50%] bg-border_color"></span>
        </button>
    );
};

export default Button;