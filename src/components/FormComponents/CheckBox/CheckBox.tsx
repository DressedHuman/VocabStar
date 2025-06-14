import tick from './tick.svg';
import cross from './cross.svg';
import { useState } from 'react';



interface Props {
    label?: string;
    defaultChecked?: boolean,
    // size prop removed
    showCross?: boolean;
    disabled?: boolean;
    onChange: () => void;
};

const Checkbox = ({ label, defaultChecked = false, /* size = 'medium' removed */ showCross = true, disabled = false, onChange }: Props) => {
    const [checked, setChecked] = useState(defaultChecked || false);

    const handleClick = () => {
        if (disabled === true) {
            return
        }
        setChecked(!checked);
        onChange();
    }
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            handleClick();
        }
    }

    return (
        <div className={`flex items-center gap-2 ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={handleClick}>
            <div
                role="checkbox"
                aria-checked={checked}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={handleKeyDown}
                className={`w-5 h-5 flex items-center justify-center border rounded
                    select-none transition-colors duration-150 ease-in-out
                    focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primary
                    ${checked
                        ? 'bg-primary border-primary' // Changed to primary
                        : `bg-white border-neutral-300 ${disabled ? "" : "hover:border-primary"}`
                    }
                    ${disabled ? "border-neutral-200 bg-neutral-100" : ""}
                `}
                draggable={false}
            >
                {checked && <img src={tick} alt="Checked" className="w-4 h-4" />} {/* Assuming tick is white or light */}
                {!checked && showCross && <img src={cross} alt="Not checked" className="w-4 h-4 text-neutral-300" />} {/* May need to style SVG fill if it's not inheriting */}
            </div>
            {label && (
                <p className={`font-sans text-base ${disabled ? "text-neutral-300" : "text-neutral-400"} select-none`}>
                    {label}
                </p>
            )}
        </div>
    );
};

export default Checkbox;
/* Default size prop changed, removed unused size styling for label.
   Moved click handler to the main div for better UX (clicking label also toggles).
   Added ARIA roles and states.
   Standardized checkbox size and removed internal padding from the div, relying on SVG size.
   Simplified hover effects.
   Adjusted disabled styling.
*/