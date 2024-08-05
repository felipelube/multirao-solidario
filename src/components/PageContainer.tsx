import { useUIState } from "./providers/MapProvider";

export type PageContentProps = {
  fixedHeight?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function PageContent({
  children,
  fixedHeight,
  ...props
}: PageContentProps) {
  const { collapsedContent, setCollapsedContent } = useUIState();

  return (
    <div
      {...props}
      className={`w-full bg-white p-4 rounded-2xl rounded-b-none flex flex-col gap-4 transition-all  overflow-auto max-h-[85vh] ${props.className}`}
      onClick={() => !fixedHeight && setCollapsedContent(false)}
      style={{
        transform: `translateY(${
          !fixedHeight && collapsedContent ? "calc(100% - 6ch)" : "0"
        })`,
      }}
    >
      {children}
    </div>
  );
}
