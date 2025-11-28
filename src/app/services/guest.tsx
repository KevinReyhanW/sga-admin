import apiClient from "@/app/services/apiClient";

class guestService {
  static async fetchGuestList() {
    try {
      const response = await apiClient.get(`/api/v1/guests`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }

  static async setGuestCheckout(id: string) {
    try {
      return await apiClient.post(`/api/v1/guests/${id}/checkout`);
    } catch (error) {
      console.log(error);
    }
  }

  static async registerGuest(payload: any) {
    try {
      return await apiClient.post(`/api/v1/guests/register`, payload);
    } catch (error) {
      console.log(error);
    }
  }
}

export default guestService;
