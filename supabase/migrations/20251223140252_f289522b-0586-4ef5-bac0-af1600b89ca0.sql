-- Add more intervention types to the enum
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'installazione_sostituzione';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'sturare_spurgo';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'riparazione';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'impianto_idraulico';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'box_doccia';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'impianto_riscaldamento';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'termoidraulico';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'condizionatori';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'ristrutturazione';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'certificazione';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'termosifone';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'contatore';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'addolcitore_acqua';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'depuratore_acqua';
ALTER TYPE intervention_type ADD VALUE IF NOT EXISTS 'sostituzione_rubinetto';