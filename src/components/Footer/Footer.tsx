interface Props {
    additional_classes?: string;
};

const Footer = ({additional_classes}: Props) => {
    return (
        <div className={`${additional_classes}`}>
            <p className="text-center">Made with <span className="text-[red]">&hearts;</span> by <a href="https://mrmizan.vercel.app/" target="_blank" className="text-[yellow] hover:text-white hover:underline">Motiur Rahman Mizan</a></p>
        </div>
    );
};

export default Footer;