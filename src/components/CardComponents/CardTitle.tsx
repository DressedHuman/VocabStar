interface Props {
    title: string;
    color?: string;
    size?: "text-2xl lg:text-3xl" | "text-xl lg:text-2xl" | "text-lg lg:text-xl" | "text-base lg:text-lg" | "text-sm lg:text-base";
};

const CardTitle = ({ title, color="text-card_title", size="text-xl lg:text-2xl" }: Props) => {
    return (
        <h2 className={`${size} font-semibold ${color} text-center`}>{title}</h2>
    );
};

export default CardTitle;