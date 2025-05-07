
// - Le proprietà `id`, `createdAt` e `updatedAt` vengono aggiunte in automatico dal server
// - Il nome del tipo (es. `Product`) determinerà il nome dell'endpoint API (es. `/products`)
// Il server sarà disponibile all'indirizzo: **http://localhost:3001**


type NutritionalValue = {
  name: string; // "Carboidrati"
  quantity: number; // Quantità del nutriente
  unit: string;   // g
};

export type Fruit = {

  readonly title: string;
  readonly calories: number; // Calorie per 100g
  readonly category: string; // "Agrume"
  nutritionalValues: NutritionalValue[]; // Un array di valori nutrizionali
};