interface SummaryBoxProps {
  icon: string;
  title: string;
  items: Array<{
    icon: string;
    label: string;
  }>;
}

export function SummaryBox({ icon, title, items }: SummaryBoxProps) {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 my-8">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" role="img" aria-label="guide">
          {icon}
        </span>
        <h2 className="text-lg font-semibold text-foreground">
          {title}
        </h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-foreground">
            <span className="text-lg" role="img" aria-label={item.label}>
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
