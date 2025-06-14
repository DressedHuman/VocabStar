interface Props {
    additional_classes?: string;
};

const Footer = ({additional_classes}: Props) => {
    return (
        <div className={`bg-neutral-100 py-6 px-6 ${additional_classes}`}> {/* Applied bg, padding */}
            <p className="text-center text-neutral-400 font-sans"> {/* Applied text color, font */}
                Made with <span className="text-error">&hearts;</span> by <a href="https://mrmizan.vercel.app/" target="_blank" className="text-primary hover:text-secondary hover:underline">Motiur Rahman Mizan</a> {/* Applied link and heart colors */}
            </p>
        </div>
    );
};

export default Footer;