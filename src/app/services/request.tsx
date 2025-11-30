import apiClient from "@/app/services/apiClient";
import delay from "delay";

class requestService {
  static async fetchRequestList() {
    try {
      return [
        {
          id: "1",
          guestName: "John Doe",
          room: "302",
          type: "Housekeeping",
          description: "Extra towels needed",
          status: "completed",
          assignedTo: "Maria Garcia",
          submittedAt: "2024-11-07 09:15",
          pickedUpAt: "2024-11-07 09:20",
        },
        {
          id: "2",
          guestName: "Jane Smith",
          room: "405",
          type: "Room Service",
          description: "Breakfast delivery - eggs benedict",
          status: "in-progress",
          assignedTo: "Carlos Rodriguez",
          submittedAt: "2024-11-07 09:30",
          pickedUpAt: "2024-11-07 09:35",
        },
        {
          id: "3",
          guestName: "Mike Johnson",
          room: "201",
          type: "Maintenance",
          description: "AC not working properly",
          status: "pending",
          submittedAt: "2024-11-07 09:45",
        },
        {
          id: "4",
          guestName: "Sarah Williams",
          room: "508",
          type: "Concierge",
          description: "Restaurant reservation assistance",
          status: "in-progress",
          assignedTo: "Jessica Lee",
          submittedAt: "2024-11-07 10:00",
          pickedUpAt: "2024-11-07 10:05",
        },
      ];
    } catch (error) {
      console.log(error);
    }
  }
}

export default requestService;
