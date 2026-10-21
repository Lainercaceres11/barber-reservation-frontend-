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
    <div
      className={`flex flex-col justify-baseline items-start gap-2 uppercase p-4 ${className}  `}
    >
      <p className="text-yellow-400 text-sm">
        {subtitle.number} - {subtitle.content}
      </p>
      <h2 className="font-bold text-3xl">{title}</h2>
    </div>
  );
}
