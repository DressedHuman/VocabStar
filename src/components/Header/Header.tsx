import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Link to={"/"}>
            <h2 className="text-center text-2xl md:text-3xl lg:text-4xl text-app_name font-ubuntu">VocabStar</h2>
            <p className="text-base md:text-lg lg:text-xl text-border_color text-center font-hind_siliguri">শিখুন - গেঁথে রাখুন মগজে!</p>
        </Link>
    );
};

export default Header;