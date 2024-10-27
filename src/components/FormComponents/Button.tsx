interface Props {
    label: string;
    button_type?: "submit" | "reset" | "button" | undefined;
    onClickHanlder?: <T>() => T;
}

const Button = ({ label, button_type, onClickHanlder }: Props) => {
    return (
        <button
            type={button_type}
            className="min-w-28 border-2 border-[#2E8BC0] px-3 py-1 text-[#145DA0] hover:text-white hover:bg-[#0C2D48] duration-300 text-lg font-medium rounded-md"
            onClick={onClickHanlder}
        >
            {label}
        </button>
    );
};

export default Button;