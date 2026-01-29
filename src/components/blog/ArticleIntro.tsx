interface ArticleIntroProps {
  children: React.ReactNode;
}

export function ArticleIntro({ children }: ArticleIntroProps) {
  return (
    <div className="text-lg text-muted-foreground leading-relaxed mb-8 border-l-4 border-primary/30 pl-6 py-2">
      {children}
    </div>
  );
}
