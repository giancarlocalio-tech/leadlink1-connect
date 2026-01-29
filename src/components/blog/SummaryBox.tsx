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
    <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 my-8 shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <span className="text-2xl" role="img" aria-label="guide">
            {icon}
          </span>
        </div>
        <h2 className="text-lg md:text-xl font-bold text-foreground leading-tight">
          {title}
        </h2>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/50 hover:border-primary/30 transition-colors"
          >
            <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <span className="text-xl" role="img" aria-label={item.label}>
                {item.icon}
              </span>
            </div>
            <span className="font-medium text-foreground">{item.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
