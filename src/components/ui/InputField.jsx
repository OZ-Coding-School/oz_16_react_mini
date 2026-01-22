/** @format */

function InputField({
  id,
  name,
  type = "text",
  autoComplete,
  placeholder,
  label,
  inputClassName = "w-full h-12 rounded-lg border px-3 text-slate-800",

  // controlled일 때만
  value,
  onChange,
  error = "",
}) {
  const isControlled = value !== undefined;

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <input
        className={`${inputClassName} ${error ? "border-red-500" : ""}`}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        {...(isControlled ? { value, onChange } : {})}
      />

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;
