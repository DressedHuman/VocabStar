interface Props {
    errorText: string;
}

const FormError = ({errorText}: Props) => {
    return (
        <p className="text-sm font-medium font-sans text-error">{errorText}</p> // Changed to <p> for semantics, updated styles
    );
};

export default FormError;