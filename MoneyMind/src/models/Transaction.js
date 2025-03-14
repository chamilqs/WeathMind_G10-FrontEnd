export default class Transaction {
  constructor(id, cardId, type, amount, date, description, category) {
    this.id = id; // Identificador único de la transacción
    this.cardId = cardId; // Relación con una tarjeta
    this.type = type; // "Ingreso" o "Gasto"
    this.amount = amount; // Monto de la transacción
    this.date = date; // Fecha en que se realizó
    this.description = description; // Ej: "Compra en Amazon"
    this.category = category; // Ej: "Compras", "Salario", etc.
  }

  static mockData() {
    return [
      new Transaction("t1", "c1", "Gasto", 120.5, "2025-03-10", "Cena en un restaurante", "Restaurantes"),
      new Transaction("t2", "c1", "Ingreso", 2000, "2025-03-05", "Pago de salario", "Salario"),
      new Transaction("t3", "c2", "Gasto", 75.3, "2025-03-08", "Amazon purchase", "Compras"),
    ];
  }
}
