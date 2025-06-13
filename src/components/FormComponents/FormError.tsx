interface Props {
    errorText: string;
}

const FormError = ({errorText}: Props) => {
    return (
        <h3 className="text-sm font-medium font-open-sans text-[#F44336]">{errorText}</h3>
    );
};

export default FormError;