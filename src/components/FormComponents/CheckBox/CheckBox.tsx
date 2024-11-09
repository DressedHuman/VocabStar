import tick from './tick.svg';
import cross from './cross.svg';
import { useState } from 'react';



interface Props {
    label?: string;
    defaultChecked?: boolean,
    size?: "small" | "medium" | "large";
    showCross?: boolean;
    disabled?: boolean;
    onChange: () => void;
};

const Checkbox = ({ label, defaultChecked = false, size = 'medium', showCross = true, disabled = false, onChange }: Props) => {
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
        <div className='flex justify-center items-center gap-1'>
            <p className={`font-mono text-card_title
                    ${size==="small" ? "text-base" :
                        size==="medium" ? "text-[20px]" :
                            size==="large" ? "text-[28px]" :
                                ""
                    }
                `}>{label}: </p>
            <div
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? -1 : 0}
                className={`aspect-square select-none ${disabled ? '' : 'hover:scale-150'} duration-75
                ${size === 'small' ? 'w-4 border-[1.5px] p-[1px] rounded' :
                        size === 'medium' ? 'w-5 border-[2px] p-[2px] rounded-md' :
                            size === 'large' ? 'w-7 border-[2px] p-[1px] rounded-md' : 'w-5 border-[2px] p-[2px] rounded-md'}
                ${disabled ? "border-[gray]" : "border-border_color"}
            `}
                draggable={false}
            >
                {
                    checked ?
                        <img
                            src={tick}
                        />
                        :
                        showCross ? <img src={cross} /> : ''
                }
            </div>
        </div>
    );
};

export default Checkbox;