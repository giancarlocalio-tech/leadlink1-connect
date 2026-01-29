import { ArticleContentParser } from './ArticleContentParser';

// Map category/tags to intervention types
const INTERVENTION_TYPE_MAP: Record<string, string> = {
  'guide-pratiche': 'altro',
  'manutenzione': 'caldaia',
  'emergenze': 'perdita_acqua',
  'risparmio': 'altro',
  'normative': 'caldaia',
  'lavandino intasato': 'sturare_spurgo',
  'scarico intasato': 'sturare_spurgo',
  'rubinetto': 'sostituzione_rubinetto',
  'perdita': 'perdita_acqua',
  'allagamento': 'perdita_acqua',
  'tubo rotto': 'riparazione',
  'caldaia': 'caldaia',
  'termosifone': 'termosifone',
  'boiler': 'caldaia',
  'wc': 'sturare_spurgo',
  'doccia': 'box_doccia'
};

// Get intervention type from article metadata
function getInterventionType(category: string, tags: string[]): string {
  // Check category first
  if (INTERVENTION_TYPE_MAP[category]) {
    return INTERVENTION_TYPE_MAP[category];
  }
  
  // Check tags
  for (const tag of tags) {
    const lowerTag = tag.toLowerCase();
    for (const [keyword, type] of Object.entries(INTERVENTION_TYPE_MAP)) {
      if (lowerTag.includes(keyword)) {
        return type;
      }
    }
  }
  
  return 'altro';
}

interface EnhancedArticleContentProps {
  slug: string;
  originalContent: string;
  articleTitle?: string;
  category?: string;
  tags?: string[];
}

export function EnhancedArticleContent({ 
  slug, 
  originalContent,
  articleTitle = '',
  category = 'guide-pratiche',
  tags = []
}: EnhancedArticleContentProps) {
  const interventionType = getInterventionType(category, tags);
  
  // Use the universal parser for all articles
  return (
    <ArticleContentParser
      htmlContent={originalContent}
      articleTitle={articleTitle}
      articleSlug={slug}
      interventionType={interventionType}
    />
  );
}

// Export a simple check function (for backwards compatibility)
export function hasEnhancement(slug: string): boolean {
  // Now all articles have visual enhancement via the parser
  return true;
}
