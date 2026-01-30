import { ReactNode } from 'react';
import { MethodCard } from './MethodCard';
import { SummaryBox } from './SummaryBox';
import { WarningBox } from './WarningBox';
import { ProCallBox } from './ProCallBox';
import { FinalCTABox } from './FinalCTABox';
import { ArticleIntro } from './ArticleIntro';
import { LocalProblemLinks } from './LocalProblemLinks';
import { EnhancedArticleIntro } from './EnhancedArticleIntro';
import { DIYLimitationsWarning } from './DIYLimitationsWarning';
import { WhatPlumberDoes } from './WhatPlumberDoes';
import { BlogArticleFAQ } from './BlogArticleFAQ';
// Icon mapping for common topics
const TOPIC_ICONS: Record<string, string> = {
  'acqua bollente': '🔥',
  'acqua calda': '🔥',
  'bicarbonato': '🧪',
  'aceto': '🧪',
  'sale': '🧂',
  'ventosa': '🪠',
  'sifone': '🔧',
  'sonda': '🌀',
  'gancio': '🪝',
  'attrezzi': '🧰',
  'pulizia': '🧹',
  'pulisci': '🧹',
  'riparazione': '🔩',
  'ripara': '🔩',
  'controllo': '🔍',
  'controlla': '🔍',
  'verifica': '🔍',
  'sicurezza': '🛡️',
  'emergenza': '🚨',
  'risparmio': '💰',
  'manutenzione': '⚙️',
  'caldaia': '🔥',
  'termosifone': '🌡️',
  'termostato': '🌡️',
  'rubinetto': '🚿',
  'tubo': '🔧',
  'perdita': '💧',
  'allagamento': '🌊',
  'wc': '🚽',
  'water': '🚽',
  'doccia': '🚿',
  'lavandino': '🚰',
  'lavandino cucina': '🚰',
  'valvola': '🔩',
  'pressione': '📊',
  'bonus': '💶',
  'detrazione': '📋',
  'documenti': '📄',
  'costi': '💸',
  'guarnizione': '⭕',
  'cartuccia': '🔲',
  'flessibile': '〰️',
  'stucco': '🧱',
  'fascetta': '🔗',
  'nastro': '🩹',
  'bottiglia': '🧴',
  'detersivo': '🧴',
  'enzimi': '🦠',
  'reset': '🔄',
  'sfiata': '💨',
  'gas': '🔥',
  'elettric': '⚡',
  'pilota': '🔥',
  'filtro': '🔲',
  'pompa': '⚙️',
  'scarico': '🚿',
  'griglia': '🔲',
  'stringi': '🔧',
  'sostituire': '🔄',
  'sostituisci': '🔄',
  'default': '✅'
};

// Get appropriate icon for a title/content
function getIconForContent(text: string): string {
  const lowerText = text.toLowerCase();
  for (const [keyword, icon] of Object.entries(TOPIC_ICONS)) {
    if (keyword !== 'default' && lowerText.includes(keyword)) {
      return icon;
    }
  }
  return TOPIC_ICONS.default;
}

// Parse HTML content into structured sections
interface ParsedSection {
  type: 'intro' | 'causes' | 'method' | 'warning' | 'procall' | 'prevention' | 'list' | 'text' | 'h2' | 'h3';
  title?: string;
  content: string;
  items?: string[];
  icon?: string;
}

function parseHtmlContent(htmlContent: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  
  // Clean and normalize HTML
  const cleanHtml = htmlContent.trim();
  
  // Split by h2 headers to get main sections
  const h2Parts = cleanHtml.split(/<h2[^>]*>/gi);
  
  h2Parts.forEach((part, index) => {
    if (index === 0 && part.trim()) {
      // Content before first h2 is the intro
      const introContent = part.replace(/<[^>]+>/g, ' ').trim();
      if (introContent) {
        sections.push({
          type: 'intro',
          content: introContent
        });
      }
      return;
    }
    
    // Extract h2 title
    const h2Match = part.match(/^([^<]+)<\/h2>/i);
    if (!h2Match) return;
    
    const title = h2Match[1].trim();
    const remainingContent = part.replace(/^[^<]+<\/h2>/i, '').trim();
    
    // Detect section types based on title keywords
    const lowerTitle = title.toLowerCase();
    
    // "Cause comuni" or similar sections
    if (lowerTitle.includes('cause') || 
        lowerTitle.includes('perché') ||
        lowerTitle.includes('origine')) {
      sections.push({
        type: 'causes',
        title,
        content: remainingContent,
        items: extractListItems(remainingContent),
        icon: '🔍'
      });
      return;
    }
    
    // Pro call / When to call professional sections
    if (lowerTitle.includes('quando chiamare') || 
        lowerTitle.includes('professionista') ||
        lowerTitle.includes('idraulico') && lowerTitle.includes('quando') ||
        lowerTitle.includes('tecnico') && lowerTitle.includes('quando')) {
      sections.push({
        type: 'procall',
        title,
        content: stripHtml(remainingContent)
      });
      return;
    }
    
    // Warning sections
    if (lowerTitle.includes('attenzione') || 
        lowerTitle.includes('errori') ||
        lowerTitle.includes('cosa non fare') ||
        lowerTitle.includes('pericolo') ||
        lowerTitle.includes('evitare') ||
        lowerTitle.includes('segnali di problemi')) {
      sections.push({
        type: 'warning',
        title: cleanWarningTitle(title),
        content: stripHtml(remainingContent),
        items: extractListItems(remainingContent)
      });
      return;
    }
    
    // Prevention / Tips sections
    if (lowerTitle.includes('prevenzione') ||
        lowerTitle.includes('consigli') ||
        lowerTitle.includes('buone abitudini') ||
        lowerTitle.includes('come evitare')) {
      sections.push({
        type: 'prevention',
        title,
        content: remainingContent,
        items: extractListItems(remainingContent),
        icon: '💡'
      });
      return;
    }
    
    // Method cards (numbered sections or practical methods)
    const isNumbered = /^[0-9]+[.\s]/.test(title) || 
                       /^(metodo|passo|step|fase|causa)\s+[0-9]+/i.test(title);
    const isPracticalMethod = lowerTitle.includes('metodo') || 
                               lowerTitle.includes('soluzione') ||
                               lowerTitle.includes('rimedio') ||
                               lowerTitle.includes('tecnica') ||
                               /^(le prime|prima|1\.|2\.|3\.|4\.|5\.)/.test(lowerTitle);
    
    if (isNumbered || isPracticalMethod) {
      // Extract steps from list items
      const steps = extractListItems(remainingContent);
      const description = extractFirstParagraph(remainingContent);
      
      sections.push({
        type: 'method',
        title: cleanMethodTitle(title),
        content: description,
        items: steps,
        icon: getIconForContent(title)
      });
      return;
    }
    
    // Check for "Codici di errore" or similar info sections
    if (lowerTitle.includes('codic') || lowerTitle.includes('error')) {
      sections.push({
        type: 'h2',
        title,
        content: remainingContent,
        icon: '📟'
      });
      return;
    }
    
    // Regular section with potential nested content
    sections.push({
      type: 'h2',
      title,
      content: remainingContent,
      icon: getIconForContent(title)
    });
  });
  
  return sections;
}

// Strip HTML tags
function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

// Clean warning title
function cleanWarningTitle(title: string): string {
  return title
    .replace(/^attenzione[:\s]*/i, '')
    .replace(/cosa non fare/i, 'Cosa NON fare')
    .trim() || 'Attenzione';
}

// Extract list items from HTML
function extractListItems(html: string): string[] {
  const items: string[] = [];
  
  // Match all list items
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let match;
  
  while ((match = liRegex.exec(html)) !== null) {
    const text = stripHtml(match[1]);
    if (text && !items.includes(text)) {
      items.push(text);
    }
  }
  
  return items;
}

// Extract first paragraph text
function extractFirstParagraph(html: string): string {
  const pMatch = html.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
  if (pMatch) {
    return stripHtml(pMatch[1]);
  }
  // Fallback: get text before first list
  const beforeList = html.split(/<[uo]l/i)[0];
  return stripHtml(beforeList);
}

// Clean method title (remove numbering prefix for display)
function cleanMethodTitle(title: string): string {
  return title
    .replace(/^[0-9]+[.\s:—–-]+\s*/g, '')
    .replace(/^(metodo|passo|step|fase|causa)\s+[0-9]+[.\s:—–-]*/i, '')
    .trim();
}

// Generate summary items from parsed sections
function generateSummaryItems(sections: ParsedSection[]): Array<{ icon: string; label: string }> {
  const methodSections = sections.filter(s => s.type === 'method');
  
  if (methodSections.length >= 2) {
    return methodSections.slice(0, 6).map(section => ({
      icon: section.icon || '✅',
      label: section.title || 'Metodo'
    }));
  }
  
  // Fallback: use h2 sections
  const h2Sections = sections.filter(s => s.type === 'h2' || s.type === 'causes');
  return h2Sections.slice(0, 5).map(section => ({
    icon: section.icon || '📌',
    label: section.title || 'Sezione'
  }));
}

// Render causes section
function renderCausesSection(section: ParsedSection): ReactNode {
  return (
    <section key="causes" className="space-y-4 my-8">
      <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
        <span className="text-2xl">🔍</span>
        {section.title}
      </h2>
      {section.items && section.items.length > 0 ? (
        <ul className="space-y-3 bg-muted/30 rounded-xl p-5">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-primary mt-0.5">•</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div 
          className="prose prose-lg max-w-none prose-p:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )}
    </section>
  );
}

// Render prevention section
function renderPreventionSection(section: ParsedSection): ReactNode {
  return (
    <section key="prevention" className="space-y-4 my-8 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-3">
        <span className="text-2xl">💡</span>
        {section.title}
      </h2>
      {section.items && section.items.length > 0 ? (
        <ul className="space-y-2">
          {section.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-muted-foreground">
              <span className="text-blue-500 mt-0.5">✓</span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div 
          className="prose prose-lg max-w-none prose-p:text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      )}
    </section>
  );
}

// Render a parsed section as React component
function renderSection(section: ParsedSection, index: number, articleTitle: string): ReactNode {
  switch (section.type) {
    case 'intro':
      return (
        <ArticleIntro key={`intro-${index}`}>
          <p>{section.content}</p>
        </ArticleIntro>
      );
    
    case 'causes':
      return renderCausesSection(section);
    
    case 'prevention':
      return renderPreventionSection(section);
    
    case 'method':
      return (
        <MethodCard
          key={`method-${index}`}
          icon={section.icon || '✅'}
          number={index}
          title={section.title || ''}
          description={section.content}
          steps={section.items || []}
        />
      );
    
    case 'warning':
      return (
        <WarningBox key={`warning-${index}`} title={section.title}>
          {section.items && section.items.length > 0 ? (
            <ul className="list-none space-y-2">
              {section.items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>{section.content}</p>
          )}
        </WarningBox>
      );
    
    case 'procall':
      return (
        <ProCallBox key={`procall-${index}`} title={section.title}>
          <p>{section.content}</p>
        </ProCallBox>
      );
    
    case 'h2':
      return (
        <section key={`section-${index}`} className="space-y-4 my-8">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <span className="text-2xl">{section.icon}</span>
            {section.title}
          </h2>
          <div 
            className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-p:leading-relaxed prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:marker:text-primary prose-li:my-1 prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3 prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: section.content }}
          />
        </section>
      );
    
    default:
      return null;
  }
}

interface ArticleContentParserProps {
  htmlContent: string;
  articleTitle: string;
  articleSlug: string;
  interventionType?: string;
}

export function ArticleContentParser({ 
  htmlContent, 
  articleTitle,
  articleSlug,
  interventionType = 'altro'
}: ArticleContentParserProps) {
  const sections = parseHtmlContent(htmlContent);
  
  // Find method sections for summary
  const methodSections = sections.filter(s => s.type === 'method');
  const hasMethodCards = methodSections.length >= 2;
  
  // Generate summary items
  const summaryItems = generateSummaryItems(sections);
  
  // Get intro section
  const introSection = sections.find(s => s.type === 'intro');
  
  // Get causes section
  const causesSection = sections.find(s => s.type === 'causes');
  
  // Get other sections (excluding intro, causes, and methods if we're rendering them separately)
  const otherSections = sections.filter(s => 
    s.type !== 'intro' && 
    s.type !== 'causes' && 
    (s.type !== 'method' || !hasMethodCards)
  );
  
  // Check if there's a pro call section
  const hasProCallSection = sections.some(s => s.type === 'procall');
  
  // Number the method cards properly
  let methodNumber = 0;
  
  return (
    <div className="space-y-8">
      {/* Enhanced Intro - Longer and more SEO-optimized */}
      <EnhancedArticleIntro
        articleSlug={articleSlug}
        articleTitle={articleTitle}
        originalIntro={introSection?.content || ''}
      />
      
      {/* Summary Box */}
      {summaryItems.length >= 2 && (
        <SummaryBox
          icon={getIconForContent(articleTitle)}
          title={`Problema con ${articleTitle.toLowerCase().replace('come ', '').replace('la ', '').replace('il ', '')}? Prova questi passaggi`}
          items={summaryItems}
        />
      )}
      
      {/* Causes Section */}
      {causesSection && renderCausesSection(causesSection)}
      
      {/* Methods as Cards */}
      {hasMethodCards && (
        <div className="space-y-6 my-10">
          <h2 className="text-2xl font-bold text-foreground">
            🛠️ Cosa puoi provare da solo
          </h2>
          <div className="grid gap-6">
            {methodSections.map((section, index) => (
              <MethodCard
                key={`method-${index}`}
                icon={section.icon || '✅'}
                number={index + 1}
                title={section.title || ''}
                description={section.content}
                steps={section.items || []}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* DIY Limitations Warning - After methods */}
      {hasMethodCards && (
        <DIYLimitationsWarning 
          articleSlug={articleSlug}
          articleTitle={articleTitle}
        />
      )}
      
      {/* Other sections */}
      {otherSections.map((section, index) => renderSection(section, index, articleTitle))}
      
      {/* Add ProCallBox if none exists */}
      {!hasProCallSection && (
        <ProCallBox title="Quando è il momento di chiamare un professionista">
          <p>
            Se i metodi fai-da-te non hanno risolto il problema, è il momento di affidarsi a un esperto. 
            Un idraulico professionista dispone degli strumenti e dell'esperienza per risolvere 
            anche le situazioni più complesse in modo rapido e sicuro.
          </p>
        </ProCallBox>
      )}
      
      {/* What the Plumber Does - New section */}
      <WhatPlumberDoes 
        articleSlug={articleSlug}
        articleTitle={articleTitle}
      />
      
      {/* Local Problem City Links - Internal Linking for SEO */}
      <LocalProblemLinks 
        articleSlug={articleSlug} 
        articleTitle={articleTitle} 
      />
      
      {/* FAQ Section with Schema */}
      <BlogArticleFAQ 
        articleSlug={articleSlug}
        articleTitle={articleTitle}
      />
      
      {/* Final CTA - Strong conversion-focused */}
      <FinalCTABox
        title="Il problema non si risolve?"
        description="Se i metodi fai-da-te non hanno funzionato, il problema potrebbe essere più serio. Trova subito un idraulico qualificato vicino a te."
        interventionType={interventionType}
        problemContext={`Richiesta da articolo: ${articleTitle}`}
      />
    </div>
  );
}
