interface Props {
    children: React.ReactNode;
    additional_classes?: string;
};

const CardStructure = ({children, additional_classes}: Props) => {
    return (
        <div className={`w-full h-full px-7 py-5 border-2 border-border_color rounded-md space-y-5 md:space-y-7 lg:space-y-10 ${additional_classes}`}>
            {children}
        </div>
    );
};

export default CardStructure;