export default class Card {
    constructor(id, userId, cardNumber, holderName, expirationDate, balance, type) {
      this.id = id;
      this.userId = userId;
      this.cardNumber = cardNumber;
      this.holderName = holderName;
      this.expirationDate = expirationDate;
      this.balance = balance;
      this.type = type; // "VISA", "MasterCard", "Amex"
    }
  
    static mockData() {
      return new Card("c1", "1", "**** **** **** 1234", "Tiana Saris", "12/26", 1250.75, "VISA");
    }
  }
  