interface Props {
    totalSeconds: number;
    label?: string;
    sticky?: boolean;
};

const Timer = ({ totalSeconds, label, sticky }: Props) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    const timerText = `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    let containerClasses = "text-center"; // Default container styling
    let textClasses = "font-sans text-base font-semibold text-secondary text-nowrap";

    if (sticky) {
        containerClasses = "sticky top-0 z-10 bg-white shadow-sm py-3 px-4 w-full text-center"; // Added more padding and w-full
        textClasses = "font-sans text-lg font-semibold text-secondary text-nowrap"; // Larger text for sticky timer
    }

    return (
        <div className={containerClasses}>
            <p className={textClasses}>
                {label && <span className="text-neutral-500">{label} - </span>}
                {timerText}
            </p>
        </div>
    );
};

export default Timer;