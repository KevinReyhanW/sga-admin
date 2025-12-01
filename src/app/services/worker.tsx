import apiClient from "@/app/services/apiClient";

class workerService {
  static async fetchWorkerLists() {
    try {
      return await apiClient.get(`/api/v1/workers`);
    } catch (error) {
      console.log(error);
    }
  }
}

export default workerService;
