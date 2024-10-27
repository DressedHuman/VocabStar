interface Props {
    additional_classes?: string;
};

const Footer = ({additional_classes}: Props) => {
    return (
        <div className={`${additional_classes}`}>
            <p>Developed by <a href="https://mrmizan.vercel.app/" target="_blank" className="text-[goldenrod] hover:text-white hover:underline">Motiur Rahman Mizan</a></p>
        </div>
    );
};

export default Footer;