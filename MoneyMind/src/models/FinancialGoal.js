export default class FinancialGoal {
    constructor(id, userId, title, targetAmount, currentAmount, deadline) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.targetAmount = targetAmount;
      this.currentAmount = currentAmount;
      this.deadline = deadline;
    }
  
    static mockData() {
      return new FinancialGoal("g1", "1", "Save for a new laptop", 2000, 500, new Date("2024-12-31"));
    }
  }
  