import apiClient from "@/app/services/apiClient";
import { format } from "date-fns";

class messageService {
  static async fetchMessages(payload: any) {
    try {
      return await apiClient.get(`/api/v1/messages`, {
        ...payload,
        checkin_date: format(payload.checkin_date, "yyyy-MM-dd"),
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default messageService;
