interface Props {
    additional_classes?: string;
};

const Footer = ({additional_classes}: Props) => {
    return (
        <div className={`${additional_classes}`}>
            <p className="text-center text-gray-300">Made with <span className="text-[#FFC107]">&hearts;</span> by <a href="https://mrmizan.vercel.app/" target="_blank" className="text-[#1E88E5] hover:text-[#FFC107] hover:underline">Motiur Rahman Mizan</a></p>
        </div>
    );
};

export default Footer;