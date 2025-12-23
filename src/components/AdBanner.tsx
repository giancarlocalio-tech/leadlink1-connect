interface AdBannerProps {
  className?: string;
}

export function AdBanner({ className }: AdBannerProps) {
  return (
    <div className={className}>
      <div className="bg-secondary/50 border border-border rounded-lg h-14 flex items-center justify-center">
        <span className="text-sm text-muted-foreground">Spazio pubblicitario</span>
      </div>
    </div>
  );
}
