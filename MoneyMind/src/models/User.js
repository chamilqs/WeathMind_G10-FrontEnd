export default class User {
    constructor(id, fullName, username, email, phone, address, avatarUrl, createdAt) {
      this.id = id;
      this.fullName = fullName;
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.avatarUrl = avatarUrl;
      this.createdAt = createdAt;
    }
  
    static mockData() {
      return new User(
        "1",
        "Tiana Saris",
        "Broklyn",
        "brooklynsimmons@gmail.com",
        "+1 3712 3789",
        "711 Leavenworth Apt. # 47, San Francisco, CA 94109",
        "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50",
        new Date()
      );
    }
  }
  