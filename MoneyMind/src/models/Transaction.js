export default class Transaction {
    constructor(id, userId, cardId, type, category, amount, date, description = "") {
      this.id = id;
      this.userId = userId;
      this.cardId = cardId;
      this.type = type; // "income" o "expense"
      this.category = category;
      this.amount = amount;
      this.date = date;
      this.description = description;
    }
  
    static mockData() {
      return [
        new Transaction("t1", "1", "c1", "expense", "Food", 25.5, new Date(), "Dinner at a restaurant"),
        new Transaction("t2", "1", "c1", "income", "Salary", 2000, new Date(), "Monthly paycheck")
      ];
    }
  }
  