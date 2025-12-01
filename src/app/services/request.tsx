import apiClient from "@/app/services/apiClient";
import delay from "delay";

class requestService {
  static async fetchRequestList() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  static async assignWorker(requestId: string, workerId: string) {
    try {
      return await apiClient.post(`/api/v1/orders/${requestId}/assign-worker`, {
        worker_id: workerId,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateStatus(requestId: string, status: string) {
    try {
      return await apiClient.patch(`/api/v1/orders/${requestId}/status`, {
        status: status,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default requestService;
