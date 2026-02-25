export class Get {
  apiUrl: string;
  constructor() {
    this.apiUrl = process.env.NEXT_PUBLIC_API_URL || "";
    if (!this.apiUrl) {
      throw new Error("unckown .env");
    }
  }
  async berbers() {
    const url = `${this.apiUrl}/barber/get-all`;
    const req = await fetch(url);
    const data = await req.json();
    return data
}
unavailableDays(barberId: string) {
    const url = `${this.apiUrl}/barber/unavailable-days/${barberId}`;
    const data = fetch(url);
    return data;
  }
}
