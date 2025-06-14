interface Props {
    label: string;
    count: number;
    type: "right" | "wrong" | "not_attempted";
};

const ResultItem = ({ label, count, type }: Props) => {
    let textColorClass = "";
    switch (type) {
        case "right":
            textColorClass = "text-success";
            break;
        case "wrong":
            textColorClass = "text-error";
            break;
        case "not_attempted":
            textColorClass = "text-neutral-400";
            break;
        default:
            textColorClass = "text-primary"; // Fallback, though type is constrained
    }

    return (
        <div className={`flex flex-col justify-center items-center gap-1 p-3 rounded-md bg-neutral-100 ${textColorClass}`}>
            {/* Label - Placed below the count using order-2 */}
            <p className="text-sm font-sans order-2 text-center">{label}</p>
            {/* Count - Larger and bold */}
            <span className="text-xl font-semibold">{count}</span>
        </div>
    );
};

export default ResultItem;