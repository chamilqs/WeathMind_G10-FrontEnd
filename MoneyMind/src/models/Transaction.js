export default class Transaction {
  constructor(id, cardId, description, amount, type, category, date) {
    this.id = id;
    this.cardId = cardId; // Relación con la tarjeta
    this.description = description;
    this.amount = amount;
    this.type = type; // "Ingreso" o "Gasto"
    this.category = category;
    this.date = date;
  }

  static mockData() {
    return [
      new Transaction("t1", "c1", "Dinner at Restaurant", 45.99, "Gasto", "Food", "2025-03-10"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t3", "c2", "New Shoes", 90.00, "Gasto", "Shopping", "2025-03-12"),
      new Transaction("t4", "c2", "Uber Ride", 12.50, "Gasto", "Transport", "2025-03-09"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      new Transaction("t2", "c1", "Salary", 2500, "Ingreso", "Salary", "2025-03-05"),
      
    ];
  }
}
