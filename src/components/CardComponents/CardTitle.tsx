interface Props {
    title: string;
    size?: "text-xl lg:text-2xl" | "text-lg lg:text-xl" | "text-base lg:text-lg" | "text-sm lg:text-base";
};

const CardTitle = ({ title, size="text-xl lg:text-2xl" }: Props) => {
    return (
        <h2 className={`${size} font-semibold text-card_title text-center`}>{title}</h2>
    );
};

export default CardTitle;