interface Props {
    errorText: string;
}

const FormError = ({errorText}: Props) => {
    return (
        <h3 className="text-sm font-medium font-mono text-yellow-400">{errorText}</h3>
    );
};

export default FormError;