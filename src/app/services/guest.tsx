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
}

export default guestService;
