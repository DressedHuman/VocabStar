interface Props {
    totalSeconds: number;
    label?: string;
    sticky?: boolean;
};

const Timer = ({ totalSeconds, label, sticky }: Props) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return (
        <div>
            <p className={`font-ubuntu text-lg text-card_title font-semibold text-nowrap ${sticky ? "sticky top-0 left-0 right-0" : ""}`}>{label ? `${label} - ` : ""}{`${minutes < 10 ? "0" : ""}${minutes}`} <span className="text-[green]">:</span> {`${seconds < 10 ? "0" : ""}${seconds}`}</p>
        </div>
    );
};

export default Timer;