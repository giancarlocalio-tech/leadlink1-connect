import { useState, useEffect } from 'react';
import { Download, Users, Phone, Mail, RefreshCw, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PlumberContact {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  business_name: string;
  main_city: string;
  created_at: string;
}

function formatPhoneForRespondIo(phone: string): string {
  // Remove all whitespace and special characters except +
  let formatted = phone.replace(/[\s\-\(\)]/g, '');
  
  // Remove leading zeros
  formatted = formatted.replace(/^0+/, '');
  
  // If it doesn't start with + or 39, add +39 prefix
  if (!formatted.startsWith('+') && !formatted.startsWith('39')) {
    formatted = '+39' + formatted;
  } else if (formatted.startsWith('39') && !formatted.startsWith('+')) {
    formatted = '+' + formatted;
  }
  
  // Ensure it starts with +
  if (!formatted.startsWith('+')) {
    formatted = '+' + formatted;
  }
  
  return formatted;
}

export function RespondIoExporter() {
  const [plumbers, setPlumbers] = useState<PlumberContact[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPlumbers = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('plumber_profiles')
        .select('id, full_name, phone, email, business_name, main_city, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPlumbers(data || []);
    } catch (error) {
      console.error('Error fetching plumbers:', error);
      toast.error('Errore nel caricamento degli idraulici');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPlumbers();
  }, []);

  const exportToCsv = () => {
    if (plumbers.length === 0) {
      toast.error('Nessun contatto da esportare');
      return;
    }

    // Respond.io CSV format: firstName, lastName, phone, email
    const headers = ['firstName', 'lastName', 'phone', 'email', 'custom.business_name', 'custom.city'];
    
    const rows = plumbers.map(p => {
      const nameParts = p.full_name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      const formattedPhone = formatPhoneForRespondIo(p.phone);
      
      return [
        `"${firstName}"`,
        `"${lastName}"`,
        `"${formattedPhone}"`,
        `"${p.email}"`,
        `"${p.business_name.replace(/"/g, '""')}"`,
        `"${p.main_city.replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `respond-io-contacts-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`Esportati ${plumbers.length} contatti`);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Export Contatti per Respond.io
          </CardTitle>
          <CardDescription>
            Esporta tutti i contatti degli idraulici in formato CSV per l'importazione su Respond.io.
            I numeri di telefono vengono automaticamente formattati con il prefisso +39.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={exportToCsv} disabled={loading || plumbers.length === 0}>
              <Download className="h-4 w-4 mr-2" />
              Esporta CSV ({plumbers.length} contatti)
            </Button>
            <Button variant="outline" onClick={fetchPlumbers} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Aggiorna
            </Button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 text-sm space-y-2">
            <p className="font-medium">Come importare su Respond.io:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Scarica il file CSV cliccando "Esporta CSV"</li>
              <li>Vai su Respond.io → Contacts → Import</li>
              <li>Carica il file CSV scaricato</li>
              <li>Mappa i campi: firstName, lastName, phone, email</li>
              <li>Completa l'importazione</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Preview of contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Anteprima Contatti
          </CardTitle>
          <CardDescription>
            Lista degli idraulici che verranno esportati
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : plumbers.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">Nessun idraulico registrato</p>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {plumbers.map((plumber) => (
                <div
                  key={plumber.id}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{plumber.full_name}</p>
                    <p className="text-sm text-muted-foreground truncate">{plumber.business_name}</p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      <code className="bg-muted px-1 rounded text-xs">
                        {formatPhoneForRespondIo(plumber.phone)}
                      </code>
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Mail className="h-3 w-3" />
                      {plumber.email}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
