type TitleProps = {
  subtitle: {
    number: string;
    content: string;
  };
  title: string;
  className?: string;
};

export default function Title({ subtitle, title, className = "" }: TitleProps) {
  return (
    <div className={`space-y-3 py-6 ${className}`}>
      <p className="flex items-center gap-3 text-xs font-medium tracking-[0.08em] text-neutral-400">
        <span className="font-heading text-brass">{subtitle.number}</span>
        <span aria-hidden="true" className="h-px w-8 bg-brass/60" />
        {subtitle.content}
      </p>
      <h2 className="font-heading text-3xl font-medium tracking-tight text-bone sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
