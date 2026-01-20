import "@/styles/Auth.css";

export default function Formfield({
    label,
    name,
    type = "text",
    value,
    onChange,
    placeholder,
    error
}) {
    return (
        <div className="field">
            <label className="field-label" htmlFor={name}>
                {label}
            </label>
            <input
                className="field-input"
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
            {error && <p className="field-error">{error}</p>}
        </div>
    );
}