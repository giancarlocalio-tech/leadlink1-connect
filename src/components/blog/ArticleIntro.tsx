interface ArticleIntroProps {
  children: React.ReactNode;
}

export function ArticleIntro({ children }: ArticleIntroProps) {
  return (
    <div className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 border-l-4 border-primary pl-6 py-4 bg-muted/30 rounded-r-xl">
      {children}
    </div>
  );
}
