import apiClient from "@/app/services/apiClient";
import { format } from "date-fns";

class messageService {
  static async fetchMessages(sessionId: string) {
    try {
      return await apiClient.get(`/api/v1/messages?session_id=${sessionId}`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default messageService;
