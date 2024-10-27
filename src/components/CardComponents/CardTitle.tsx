interface Props {
    title: string;
};

const CardTitle = ({title}: Props) => {
    return (
        <h2 className="text-xl lg:text-2xl font-semibold text-card_title text-center">{title}</h2>
    );
};

export default CardTitle;