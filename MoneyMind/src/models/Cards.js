import mastercard from "@/assets/icons/mastercard.png";
import visa from "@/assets/icons/visa-white.png";

export default class Card {
  constructor(id, userId, cardNumber, holderName, expirationDate, balance, type) {
    this.id = id;
    this.userId = userId;
    this.cardNumber = cardNumber;
    this.holderName = holderName;
    this.expirationDate = expirationDate;
    this.balance = balance;
    this.logo = this.getLogoPath(type);
  }

  getLogoPath(type) {
    const logos = {
      "MasterCard": mastercard,
      "VISA": visa
    };
    return logos[type] || visa; // Si no encuentra el tipo, usa VISA por defecto
  }

  static mockData() {
    return [
      new Card("c1", "1", "1234123412341234", "Tiana Saris", "12/26", 1250.75, "VISA"),
      new Card("c2", "2", "5678567856785678", "John Doe", "05/27", 890.50, "MasterCard")
    ];
  }
}
