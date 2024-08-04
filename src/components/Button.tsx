type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ ...props }: ButtonProps) {
  // TODO: add loading state
  return (
    <button
      {...props}
      className={`p-2 border rounded-lg bg-slate-700 hover:bg-slate-800 active:bg-slate-950 text-white ${props.className}`}
    />
  );
}
