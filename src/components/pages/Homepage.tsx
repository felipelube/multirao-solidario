type HomePageProps = {} & React.HTMLAttributes<HTMLDivElement>;

export function HomePage({ ...props }: HomePageProps) {
  return (
    <div {...props} className={`${props.className}`}>
      hello world
    </div>
  );
}
