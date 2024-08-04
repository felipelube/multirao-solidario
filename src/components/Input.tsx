type InputProps = {
  label: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, ...props }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label}
      <input
        {...props}
        className={`p-2 border rounded-lg ${props.className}`}
      />
    </label>
  );
}
