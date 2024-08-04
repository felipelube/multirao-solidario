export type PageContentProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function PageContent({ children, ...props }: PageContentProps) {
  return (
    <div
      {...props}
      className={`w-full bg-white p-4 rounded-2xl rounded-b-none flex flex-col gap-4 max-h-[85vh] overflow-scroll ${props.className}`}
    >
      {children}
    </div>
  );
}
