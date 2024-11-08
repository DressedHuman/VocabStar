import "./Loader.css";

const Loader = () => {
    const scrollEventHandler = (e: React.UIEvent) => {
        e.stopPropagation();
    }

    return (
        <div
            onScroll={scrollEventHandler}
            className={'preloader bg-none backdrop-blur-lg'}
        >
            <div className={'preloader-inner'}>
                <div className={'preloader-icon'}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;