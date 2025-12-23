-- Create table for Italian cities/municipalities
CREATE TABLE public.italian_cities (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  province_code text NOT NULL,
  province_name text NOT NULL,
  region text NOT NULL,
  cap text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create index for fast search
CREATE INDEX idx_italian_cities_name ON public.italian_cities USING gin(to_tsvector('italian', name));
CREATE INDEX idx_italian_cities_name_lower ON public.italian_cities (lower(name));
CREATE INDEX idx_italian_cities_province ON public.italian_cities (province_code);
CREATE INDEX idx_italian_cities_cap ON public.italian_cities USING gin(cap);

-- Enable RLS
ALTER TABLE public.italian_cities ENABLE ROW LEVEL SECURITY;

-- Anyone can read cities (public data)
CREATE POLICY "Anyone can view cities"
ON public.italian_cities
FOR SELECT
USING (true);

-- Insert sample Italian cities (main cities per region)
INSERT INTO public.italian_cities (name, province_code, province_name, region, cap) VALUES
-- Lombardia
('Milano', 'MI', 'Milano', 'Lombardia', ARRAY['20121', '20122', '20123', '20124', '20125', '20126', '20127', '20128', '20129', '20131', '20132', '20133', '20134', '20135', '20136', '20137', '20138', '20139', '20141', '20142', '20143', '20144', '20145', '20146', '20147', '20148', '20149', '20151', '20152', '20153', '20154', '20155', '20156', '20157', '20158', '20159', '20161', '20162']),
('Bergamo', 'BG', 'Bergamo', 'Lombardia', ARRAY['24121', '24122', '24123', '24124', '24125', '24126', '24127', '24128', '24129']),
('Brescia', 'BS', 'Brescia', 'Lombardia', ARRAY['25121', '25122', '25123', '25124', '25125', '25126', '25127', '25128', '25129', '25131', '25132', '25133', '25134', '25135', '25136']),
('Como', 'CO', 'Como', 'Lombardia', ARRAY['22100']),
('Monza', 'MB', 'Monza e Brianza', 'Lombardia', ARRAY['20900']),
('Varese', 'VA', 'Varese', 'Lombardia', ARRAY['21100']),
('Pavia', 'PV', 'Pavia', 'Lombardia', ARRAY['27100']),
('Mantova', 'MN', 'Mantova', 'Lombardia', ARRAY['46100']),
('Cremona', 'CR', 'Cremona', 'Lombardia', ARRAY['26100']),
('Lecco', 'LC', 'Lecco', 'Lombardia', ARRAY['23900']),
('Lodi', 'LO', 'Lodi', 'Lombardia', ARRAY['26900']),
('Sondrio', 'SO', 'Sondrio', 'Lombardia', ARRAY['23100']),
('Sesto San Giovanni', 'MI', 'Milano', 'Lombardia', ARRAY['20099']),
('Cinisello Balsamo', 'MI', 'Milano', 'Lombardia', ARRAY['20092']),
('Legnano', 'MI', 'Milano', 'Lombardia', ARRAY['20025']),
('Busto Arsizio', 'VA', 'Varese', 'Lombardia', ARRAY['21052']),
-- Lazio
('Roma', 'RM', 'Roma', 'Lazio', ARRAY['00118', '00119', '00121', '00122', '00123', '00124', '00125', '00126', '00127', '00128', '00129', '00131', '00132', '00133', '00134', '00135', '00136', '00137', '00138', '00139', '00141', '00142', '00143', '00144', '00145', '00146', '00147', '00148', '00149', '00151', '00152', '00153', '00154', '00155', '00156', '00157', '00158', '00159', '00161', '00162', '00163', '00164', '00165', '00166', '00167', '00168', '00169', '00171', '00172', '00173', '00174', '00175', '00176', '00177', '00178', '00179', '00181', '00182', '00183', '00184', '00185', '00186', '00187', '00188', '00189', '00191', '00192', '00193', '00194', '00195', '00196', '00197', '00198', '00199']),
('Latina', 'LT', 'Latina', 'Lazio', ARRAY['04100']),
('Frosinone', 'FR', 'Frosinone', 'Lazio', ARRAY['03100']),
('Viterbo', 'VT', 'Viterbo', 'Lazio', ARRAY['01100']),
('Rieti', 'RI', 'Rieti', 'Lazio', ARRAY['02100']),
-- Piemonte
('Torino', 'TO', 'Torino', 'Piemonte', ARRAY['10121', '10122', '10123', '10124', '10125', '10126', '10127', '10128', '10129', '10131', '10132', '10133', '10134', '10135', '10136', '10137', '10138', '10139', '10141', '10142', '10143', '10144', '10145', '10146', '10147', '10148', '10149', '10151', '10152', '10153', '10154', '10155', '10156']),
('Novara', 'NO', 'Novara', 'Piemonte', ARRAY['28100']),
('Alessandria', 'AL', 'Alessandria', 'Piemonte', ARRAY['15121', '15122']),
('Asti', 'AT', 'Asti', 'Piemonte', ARRAY['14100']),
('Cuneo', 'CN', 'Cuneo', 'Piemonte', ARRAY['12100']),
('Biella', 'BI', 'Biella', 'Piemonte', ARRAY['13900']),
('Vercelli', 'VC', 'Vercelli', 'Piemonte', ARRAY['13100']),
('Verbania', 'VB', 'Verbano-Cusio-Ossola', 'Piemonte', ARRAY['28922']),
-- Veneto
('Venezia', 'VE', 'Venezia', 'Veneto', ARRAY['30121', '30122', '30123', '30124', '30125', '30126', '30131', '30132', '30133', '30134', '30135', '30141', '30142', '30173', '30174', '30175', '30176']),
('Verona', 'VR', 'Verona', 'Veneto', ARRAY['37121', '37122', '37123', '37124', '37125', '37126', '37127', '37128', '37129', '37131', '37132', '37133', '37134', '37135', '37136', '37137', '37138', '37139', '37141', '37142']),
('Padova', 'PD', 'Padova', 'Veneto', ARRAY['35121', '35122', '35123', '35124', '35125', '35126', '35127', '35128', '35129', '35131', '35132', '35133', '35134', '35135', '35136', '35137', '35138', '35141', '35142', '35143']),
('Vicenza', 'VI', 'Vicenza', 'Veneto', ARRAY['36100']),
('Treviso', 'TV', 'Treviso', 'Veneto', ARRAY['31100']),
('Rovigo', 'RO', 'Rovigo', 'Veneto', ARRAY['45100']),
('Belluno', 'BL', 'Belluno', 'Veneto', ARRAY['32100']),
-- Emilia-Romagna
('Bologna', 'BO', 'Bologna', 'Emilia-Romagna', ARRAY['40121', '40122', '40123', '40124', '40125', '40126', '40127', '40128', '40129', '40131', '40132', '40133', '40134', '40135', '40136', '40137', '40138', '40139', '40141']),
('Modena', 'MO', 'Modena', 'Emilia-Romagna', ARRAY['41121', '41122', '41123', '41124', '41125', '41126']),
('Parma', 'PR', 'Parma', 'Emilia-Romagna', ARRAY['43121', '43122', '43123', '43124', '43125', '43126']),
('Reggio Emilia', 'RE', 'Reggio Emilia', 'Emilia-Romagna', ARRAY['42121', '42122', '42123', '42124']),
('Ravenna', 'RA', 'Ravenna', 'Emilia-Romagna', ARRAY['48121', '48122', '48123', '48124']),
('Ferrara', 'FE', 'Ferrara', 'Emilia-Romagna', ARRAY['44121', '44122', '44123', '44124']),
('Rimini', 'RN', 'Rimini', 'Emilia-Romagna', ARRAY['47921', '47922', '47923', '47924']),
('Forlì', 'FC', 'Forlì-Cesena', 'Emilia-Romagna', ARRAY['47121', '47122']),
('Piacenza', 'PC', 'Piacenza', 'Emilia-Romagna', ARRAY['29121', '29122']),
-- Toscana
('Firenze', 'FI', 'Firenze', 'Toscana', ARRAY['50121', '50122', '50123', '50124', '50125', '50126', '50127', '50128', '50129', '50131', '50132', '50133', '50134', '50135', '50136', '50137', '50138', '50139', '50141', '50142', '50143', '50144', '50145']),
('Pisa', 'PI', 'Pisa', 'Toscana', ARRAY['56121', '56122', '56123', '56124', '56125', '56126', '56127', '56128']),
('Livorno', 'LI', 'Livorno', 'Toscana', ARRAY['57121', '57122', '57123', '57124', '57125', '57126', '57127', '57128']),
('Siena', 'SI', 'Siena', 'Toscana', ARRAY['53100']),
('Arezzo', 'AR', 'Arezzo', 'Toscana', ARRAY['52100']),
('Lucca', 'LU', 'Lucca', 'Toscana', ARRAY['55100']),
('Prato', 'PO', 'Prato', 'Toscana', ARRAY['59100']),
('Grosseto', 'GR', 'Grosseto', 'Toscana', ARRAY['58100']),
('Pistoia', 'PT', 'Pistoia', 'Toscana', ARRAY['51100']),
('Massa', 'MS', 'Massa-Carrara', 'Toscana', ARRAY['54100']),
-- Campania
('Napoli', 'NA', 'Napoli', 'Campania', ARRAY['80121', '80122', '80123', '80124', '80125', '80126', '80127', '80128', '80129', '80131', '80132', '80133', '80134', '80135', '80136', '80137', '80138', '80139', '80141', '80142', '80143', '80144', '80145', '80146', '80147']),
('Salerno', 'SA', 'Salerno', 'Campania', ARRAY['84121', '84122', '84123', '84124', '84125', '84126', '84127', '84128', '84129', '84131', '84132', '84133', '84134', '84135']),
('Caserta', 'CE', 'Caserta', 'Campania', ARRAY['81100']),
('Avellino', 'AV', 'Avellino', 'Campania', ARRAY['83100']),
('Benevento', 'BN', 'Benevento', 'Campania', ARRAY['82100']),
-- Sicilia
('Palermo', 'PA', 'Palermo', 'Sicilia', ARRAY['90121', '90122', '90123', '90124', '90125', '90126', '90127', '90128', '90129', '90131', '90132', '90133', '90134', '90135', '90136', '90137', '90138', '90139', '90141', '90142', '90143', '90144', '90145', '90146', '90147', '90148', '90149', '90151']),
('Catania', 'CT', 'Catania', 'Sicilia', ARRAY['95121', '95122', '95123', '95124', '95125', '95126', '95127', '95128', '95129', '95131']),
('Messina', 'ME', 'Messina', 'Sicilia', ARRAY['98121', '98122', '98123', '98124', '98125', '98126', '98127', '98128', '98129', '98131', '98132', '98133', '98134', '98135', '98136', '98137', '98138', '98139', '98141', '98142', '98143', '98144', '98145', '98146', '98147', '98148', '98149', '98151', '98152', '98153', '98154', '98155', '98156', '98157', '98158', '98159', '98161', '98162', '98163', '98164', '98165', '98166', '98167', '98168']),
('Siracusa', 'SR', 'Siracusa', 'Sicilia', ARRAY['96100']),
('Ragusa', 'RG', 'Ragusa', 'Sicilia', ARRAY['97100']),
('Trapani', 'TP', 'Trapani', 'Sicilia', ARRAY['91100']),
('Agrigento', 'AG', 'Agrigento', 'Sicilia', ARRAY['92100']),
('Caltanissetta', 'CL', 'Caltanissetta', 'Sicilia', ARRAY['93100']),
('Enna', 'EN', 'Enna', 'Sicilia', ARRAY['94100']),
-- Puglia
('Bari', 'BA', 'Bari', 'Puglia', ARRAY['70121', '70122', '70123', '70124', '70125', '70126', '70127', '70128', '70129', '70131', '70132']),
('Lecce', 'LE', 'Lecce', 'Puglia', ARRAY['73100']),
('Taranto', 'TA', 'Taranto', 'Puglia', ARRAY['74121', '74122', '74123']),
('Foggia', 'FG', 'Foggia', 'Puglia', ARRAY['71121', '71122']),
('Brindisi', 'BR', 'Brindisi', 'Puglia', ARRAY['72100']),
('Barletta', 'BT', 'Barletta-Andria-Trani', 'Puglia', ARRAY['76121']),
-- Sardegna
('Cagliari', 'CA', 'Cagliari', 'Sardegna', ARRAY['09121', '09122', '09123', '09124', '09125', '09126', '09127', '09128', '09129', '09131', '09132', '09133', '09134']),
('Sassari', 'SS', 'Sassari', 'Sardegna', ARRAY['07100']),
('Nuoro', 'NU', 'Nuoro', 'Sardegna', ARRAY['08100']),
('Oristano', 'OR', 'Oristano', 'Sardegna', ARRAY['09170']),
-- Calabria
('Reggio Calabria', 'RC', 'Reggio Calabria', 'Calabria', ARRAY['89121', '89122', '89123', '89124', '89125', '89126', '89127', '89128', '89129', '89131', '89132', '89133']),
('Catanzaro', 'CZ', 'Catanzaro', 'Calabria', ARRAY['88100']),
('Cosenza', 'CS', 'Cosenza', 'Calabria', ARRAY['87100']),
('Crotone', 'KR', 'Crotone', 'Calabria', ARRAY['88900']),
('Vibo Valentia', 'VV', 'Vibo Valentia', 'Calabria', ARRAY['89900']),
-- Liguria
('Genova', 'GE', 'Genova', 'Liguria', ARRAY['16121', '16122', '16123', '16124', '16125', '16126', '16127', '16128', '16129', '16131', '16132', '16133', '16134', '16135', '16136', '16137', '16138', '16139', '16141', '16142', '16143', '16144', '16145', '16146', '16147', '16148', '16149', '16151', '16152', '16153', '16154', '16155', '16156', '16157', '16158', '16159', '16161', '16162', '16163', '16164', '16165', '16166', '16167']),
('La Spezia', 'SP', 'La Spezia', 'Liguria', ARRAY['19121', '19122', '19123', '19124', '19125', '19126']),
('Savona', 'SV', 'Savona', 'Liguria', ARRAY['17100']),
('Imperia', 'IM', 'Imperia', 'Liguria', ARRAY['18100']),
-- Marche
('Ancona', 'AN', 'Ancona', 'Marche', ARRAY['60121', '60122', '60123', '60124', '60125', '60126', '60127', '60128', '60129', '60131']),
('Pesaro', 'PU', 'Pesaro e Urbino', 'Marche', ARRAY['61121', '61122']),
('Fermo', 'FM', 'Fermo', 'Marche', ARRAY['63900']),
('Macerata', 'MC', 'Macerata', 'Marche', ARRAY['62100']),
('Ascoli Piceno', 'AP', 'Ascoli Piceno', 'Marche', ARRAY['63100']),
-- Abruzzo
('L''Aquila', 'AQ', 'L''Aquila', 'Abruzzo', ARRAY['67100']),
('Pescara', 'PE', 'Pescara', 'Abruzzo', ARRAY['65121', '65122', '65123', '65124', '65125', '65126', '65127', '65128', '65129']),
('Chieti', 'CH', 'Chieti', 'Abruzzo', ARRAY['66100']),
('Teramo', 'TE', 'Teramo', 'Abruzzo', ARRAY['64100']),
-- Umbria
('Perugia', 'PG', 'Perugia', 'Umbria', ARRAY['06121', '06122', '06123', '06124', '06125', '06126', '06127', '06128', '06129', '06131', '06132', '06134', '06135']),
('Terni', 'TR', 'Terni', 'Umbria', ARRAY['05100']),
-- Friuli-Venezia Giulia
('Trieste', 'TS', 'Trieste', 'Friuli-Venezia Giulia', ARRAY['34121', '34122', '34123', '34124', '34125', '34126', '34127', '34128', '34129', '34131', '34132', '34133', '34134', '34135', '34136', '34137', '34138', '34139', '34141', '34142', '34143', '34144', '34145', '34146', '34147', '34148', '34149', '34151']),
('Udine', 'UD', 'Udine', 'Friuli-Venezia Giulia', ARRAY['33100']),
('Pordenone', 'PN', 'Pordenone', 'Friuli-Venezia Giulia', ARRAY['33170']),
('Gorizia', 'GO', 'Gorizia', 'Friuli-Venezia Giulia', ARRAY['34170']),
-- Trentino-Alto Adige
('Trento', 'TN', 'Trento', 'Trentino-Alto Adige', ARRAY['38121', '38122', '38123']),
('Bolzano', 'BZ', 'Bolzano', 'Trentino-Alto Adige', ARRAY['39100']),
-- Basilicata
('Potenza', 'PZ', 'Potenza', 'Basilicata', ARRAY['85100']),
('Matera', 'MT', 'Matera', 'Basilicata', ARRAY['75100']),
-- Molise
('Campobasso', 'CB', 'Campobasso', 'Molise', ARRAY['86100']),
('Isernia', 'IS', 'Isernia', 'Molise', ARRAY['86170']),
-- Valle d'Aosta
('Aosta', 'AO', 'Aosta', 'Valle d''Aosta', ARRAY['11100']);