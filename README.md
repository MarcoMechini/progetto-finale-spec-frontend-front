# Healthy Bites

Healthy Bites è un'applicazione web interattiva per la gestione e l'analisi dei dati nutrizionali della frutta. Consente agli utenti di cercare, filtrare, ordinare e confrontare frutti, oltre ad aggiungere nuovi dati nutrizionali personalizzati.

## Funzionalità principali

- **Ricerca e filtro**: Cerca i frutti per nome e filtra per categoria.
- **Ordinamento**: Ordina i frutti per titolo o categoria.
- **Gestione dei dati**: Aggiungi nuovi frutti con informazioni nutrizionali personalizzate.
- **Confronto**: Confronta più frutti per analisi comparative.
- **Interfaccia intuitiva**: Design moderno e facile da usare.

## Tecnologie utilizzate

- **React**: Libreria per la creazione dell'interfaccia utente.
- **Vite**: Tool per il build e lo sviluppo rapido.
- **Lodash**: Per ottimizzare le interazioni con debounce.
- **React Router**: Per la navigazione tra le pagine.
- **FontAwesome**: Per le icone.

## Installazione

1. Clona il repository:
   ```bash
   git clone <URL-del-repository>
   ```

2. Naviga nella directory del progetto:
   ```bash
   cd progetto-finale-spec-frontend-front
   ```

3. Installa le dipendenze:
   ```bash
   npm install
   ```

4. Avvia l'applicazione in modalità sviluppo:
   ```bash
   npm run dev
   ```

5. Apri il browser e vai su `http://localhost:5173`.

## Struttura del progetto

- **src/**: Contiene il codice sorgente dell'applicazione.
  - **components/**: Componenti riutilizzabili come `AppLike`, `AppModal`, e `Comparator`.
  - **context/**: Contesto globale per la gestione dello stato.
  - **pages/**: Pagine principali come `HomePage` e `DetailPage`.
  - **hooks/**: Custom hooks come `useFruits`.
  - **layout/**: Layout generale dell'app.
- **public/**: File statici.
- **back/**: Dati di esempio e tipi TypeScript.