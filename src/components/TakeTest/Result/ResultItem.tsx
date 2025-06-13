interface Props {
    label: string;
    count: number;
    type: "right" | "wrong" | "not_attempted";
};

const ResultItem = ({ label, count, type }: Props) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-1 ${type === "right" ? "text-[#4CAF50]" :
                type === "wrong" ? "text-[#F44336]" : "text-gray-400"
            }`}>
            <p className="text-base md:text-lg order-2 font-open-sans text-center">{label}</p>
            <span className="text-2xl font-montserrat font-semibold">{count}</span>
        </div>
    );
};

export default ResultItem;