interface Props {
    label: string;
    count: number;
    type: "right" | "wrong" | "not_attempted";
};

const ResultItem = ({ label, count, type }: Props) => {
    return (
        <div className={`flex flex-col justify-center items-center gap-1 ${type === "right" ? "text-[green]" :
                type === "wrong" ? "text-[#ff3543]" : "text-[#222333]"
            }`}>
            <p className="text-base md:text-lg order-2 font-mono text-center">{label}</p>
            <span className="text-2xl">{count}</span>
        </div>
    );
};

export default ResultItem;