import { UserVocabType } from "./MyVocabsHome";
import DeleteIcon from './icons/delete.svg';

declare global {
    interface Window {
        responsiveVoice: {
            speak: (text: string, voice: string, options?: unknown) => void;
        };
    }
};

interface Props {
    word: UserVocabType;
    deleteVocab: () => void;
};

const ShowWord = ({ word, deleteVocab }: Props) => {
    const handleWordClick = () => {
        const speech = new SpeechSynthesisUtterance(word.word);
        speech.lang = "en-US";
        speech.rate = 1;
        speech.pitch = 1;
        speech.voice = window.speechSynthesis.getVoices().find(voice => voice.voiceURI.includes("Microsoft Susan"))!;
        window.speechSynthesis.speak(speech);
    }

    const handleMeaningClick = (meaning: string) => {
        window.responsiveVoice.speak(meaning,"Bangla Bangladesh Male", {rate: 1.0, pitch: 1.12});
    }

import CardStructure from "../CardComponents/CardStructure"; // Import CardStructure

    return (
        <CardStructure additional_classes="relative"> {/* Use CardStructure, add relative for absolute positioning of delete button */}
            <div className="flex flex-col md:flex-row md:items-center md:gap-4">
                {/* Word */}
                <div className="md:w-1/3">
                    <h2
                        className="font-heading text-primary text-xl cursor-pointer capitalize text-center md:text-left mb-2 md:mb-0"
                        onClick={handleWordClick}
                    >
                        {word.word}
                    </h2>
                </div>

                {/* Meanings */}
                <div className="md:w-2/3 md:border-l md:border-neutral-200 md:pl-4">
                    {word.meanings.map((meaning, index) => (
                        <p
                            key={meaning.id}
                            className={`font-hind_siliguri text-neutral-400 text-base py-1 cursor-pointer text-center md:text-left ${index < word.meanings.length - 1 ? 'mb-1' : ''}`}
                            onClick={() => handleMeaningClick(meaning.meaning)}
                        >
                            {meaning.meaning}
                        </p>
                    ))}
                </div>
            </div>

            {/* Delete Button - Positioned inside the card padding area */}
            <button
                onClick={deleteVocab}
                title="Delete word" // Added title for accessibility
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-neutral-100 hover:bg-error text-neutral-400 hover:text-white rounded-full transition-colors duration-150 ease-in-out"
            >
                <img
                    src={DeleteIcon}
                    alt="Delete" // Added alt text
                    className="w-4 h-4" // Control icon size
                />
            </button>
        </CardStructure>
    );
};

export default ShowWord;