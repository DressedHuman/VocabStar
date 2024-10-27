interface Props {
    label: string;
    name: string;
    id: string;
};

const InputField = ({ label, name, id }: Props) => {

    return (
        <div className="w-full flex flex-col justify-center items-center gap-1">
            <h3 className="text-lg text-[#2E8BC0] font-medium">{label}</h3>
            <input className="w-[300px] md:w-[350px] border-2 border-[#B1D4E0] focus:border-[#2E8BC0] outline-none px-2 py-1 rounded-md" type="text" name={name} id={id} />
        </div>
    );
};

export default InputField;