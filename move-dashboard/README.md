# Move Solutions Challenge - Sensor Dashboard

Una dashboard sviluppata per monitorare sensori con misurazioni generate dinamicamente, ordinamento, filtri avanzati e grafico interattivo.

---

## 🚀 Tecnologie utilizzate

- **Vue 3 (Composition API)**
- **Vite**
- **TailwindCSS**
- **Plotly.js** per la visualizzazione del grafico

---

## 📦 Installazione

```bash
npm install
```

## 🏃‍♂️ Avvio del progetto

```bash
npm run dev
```

La dashboard sarà accessibile su `http://localhost:5173` (o su un'altra porta indicata nel terminale).

---

## 📁 Struttura del progetto

```bash 
move-dashboard/
├─ public/
│  ├─ data/
│  │  ├─ sensors.json
├─ src/
│  ├─ components/
│  │  ├─ SensorsChart.vue
│  │  ├─ SensorsTable.vue
│  │  ├─ SummaryCard.vue
│  ├─ utils/
│  │  ├─ generateMeasurements.js
│  ├─ views/
│  │  ├─ Dashboard.vue
│  ├─ App.vue
│  ├─ main.js
│  ├─ style.css
├─ package.json
├─ vite.config.js
├─ README.md
```
---

## 📊 Funzionalità principali

Generazione e calcolo dei valori dei sensori
- Esecuzione della fetch per caricare i sensori da sensors.json
- Per ogni sensore, generazione di una lista di misure nel tempo (timestamp, disp_mm)
- La generazione avviene ad ogni caricamento: questo permette di testare la UI con dataset sempre diversi
- Arricchimento dei dati con l'ultimo valore e lo stato per ogni sensore

Tabella sensori
- Ordinamento per colonna (ID, Name, Location, Last Value, Status)
- Evidenziazione della riga selezionata
- Stato del sensore calcolato dinamicamente in base alla soglia e all'ultimo valore
- Aggiornamento del grafico al click su una riga

Grafico del sensore
- Line chart interattivo (zoom, pan, tooltip)
- Aggiornamento dinamico in base alla selezione della riga nella tabella
- Visualizzazione della soglia come linea orizzontale
- Visualizzazione dei valori sopra/sotto la soglia con colori differenti
- Evidenziazione del valore massimo registrato

---

## 📡 Funzionalità extra

Filtri avanzati
- Ricerca testuale su Nome o ID
- Filtro per stato (OK, Alarm)
- Filtro per location (dropdown con selezione multipla)
- Filtri combinabili tra loro
- Pulsante di reset filtri

Card di riepilogo
Le card offrono una panoramica immediata dello stato generale del sistema:  
- Numero totale di sensori
- Numero di sensori in stato "Alarm"
- Valore massimo registrato tra tutti i sensori
- Valore minimo registrato tra tutti i sensori

---

## 🧩 Decisioni progettuali

- Plotly per il grafico:  
Offre un ottimo controllo della resa grafica ed è immediatamente integrabile in Vue

- Mock dei dati:  
Le misurazioni vengono generate dinamicamente con generateMeasurements.js, rendendo la dashboard autonoma e testabile senza backend

---

## 👤 Autore  
Luca Longinotti



