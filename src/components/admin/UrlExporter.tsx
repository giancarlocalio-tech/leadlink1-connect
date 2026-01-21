import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { 
  generateKeywordUrls, 
  generateCityUrls, 
  generateCityServiceUrls,
  exportUrlsAsText,
  getUrlStats 
} from '@/lib/generateKeywordUrls';

export function UrlExporter() {
  const [copied, setCopied] = useState<string | null>(null);
  
  const stats = getUrlStats();
  const keywordUrls = generateKeywordUrls();
  const cityUrls = generateCityUrls();
  const cityServiceUrls = generateCityServiceUrls();

  const copyToClipboard = async (urls: string[], type: string) => {
    const text = exportUrlsAsText(urls);
    await navigator.clipboard.writeText(text);
    setCopied(type);
    toast.success(`${urls.length} URL copiate!`);
    setTimeout(() => setCopied(null), 2000);
  };

  const downloadAsTxt = (urls: string[], filename: string) => {
    const text = exportUrlsAsText(urls);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success(`File ${filename} scaricato!`);
  };

  const UrlList = ({ urls, type }: { urls: string[]; type: string }) => (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button 
          onClick={() => copyToClipboard(urls, type)}
          variant="outline"
          className="flex-1"
        >
          {copied === type ? (
            <><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Copiate!</>
          ) : (
            <><Copy className="h-4 w-4 mr-2" /> Copia tutte ({urls.length})</>
          )}
        </Button>
        <Button 
          onClick={() => downloadAsTxt(urls, `${type}-urls.txt`)}
          variant="outline"
        >
          <Download className="h-4 w-4 mr-2" /> Scarica .txt
        </Button>
      </div>
      <div className="bg-muted rounded-lg p-4 max-h-96 overflow-y-auto">
        <pre className="text-xs text-muted-foreground whitespace-pre-wrap break-all">
          {urls.join('\n')}
        </pre>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>URL Exporter per GSC</CardTitle>
        <CardDescription>
          Genera e copia le URL per richiedere reindicizzazione in Google Search Console
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{stats.keywordPages}</div>
            <div className="text-sm text-muted-foreground">Pagine Keyword</div>
          </div>
          <div className="bg-blue-500/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.cityPages}</div>
            <div className="text-sm text-muted-foreground">Pagine Città</div>
          </div>
          <div className="bg-green-500/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.cityServicePages}</div>
            <div className="text-sm text-muted-foreground">Città + Servizi</div>
          </div>
          <div className="bg-orange-500/10 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.totalPages}</div>
            <div className="text-sm text-muted-foreground">Totale URL</div>
          </div>
        </div>

        <Tabs defaultValue="keyword" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="keyword">Keyword ({stats.keywordPages})</TabsTrigger>
            <TabsTrigger value="city">Città ({stats.cityPages})</TabsTrigger>
            <TabsTrigger value="cityservice">Città+Servizi ({stats.cityServicePages})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="keyword" className="mt-4">
            <UrlList urls={keywordUrls} type="keyword" />
          </TabsContent>
          
          <TabsContent value="city" className="mt-4">
            <UrlList urls={cityUrls} type="city" />
          </TabsContent>
          
          <TabsContent value="cityservice" className="mt-4">
            <UrlList urls={cityServiceUrls} type="cityservice" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
