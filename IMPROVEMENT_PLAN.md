# SGA (Smart Guest Assistant) Service Excellence Roadmap

This roadmap outlines strategic frontend enhancements designed to elevate the SGA platform into a world-class administrative tool for hotel service excellence. These improvements focus on operational visibility, personalized guest service, and administrative efficiency.

---

## 📊 1. Data-Driven Operational Intelligence
*Empowering admins with historical insights and trend analysis to optimize property performance.*

### [SGA-ADM-01] Real-Time Dashboard & Daily Chronological Filtering
- **Focus:** Default the dashboard to "Today's Operations" and include an integrated `DatePicker` for historical selection.
- **Service Impact:** Allows management to focus on immediate daily tasks while maintaining the ability to audit performance from any specific date in the past.

### [SGA-ADM-02] Comparative Response Performance Metrics
- **Focus:** Update the "Average Response Time" visualization to provide a 24-hour comparative analysis (Today vs. Yesterday).
- **Service Impact:** Provides immediate feedback on whether service efficiency is improving or declining compared to the previous day.

### [SGA-ADM-03] Staff Productivity & Workload Analytics
- **Focus:** A dashboard view that ranks staff performance by response time and number of requests handled.
- **Service Impact:** Helps management distribute workload evenly and recognize high-performing team members.

---

## ⚡ 2. SLA & Priority Management
*Ensuring the "Smart Guest Assistant" lives up to its name through timely and prioritized service.*

### [SGA-SLA-01] Visual Urgency & Task Escalation
- **Focus:** Color-coded urgency markers and countdown timers on active requests based on hotel response targets.
- **Service Impact:** Ensures admins prioritize high-urgency tasks and provides immediate visual alerts when a request is about to hit its deadline.

### [SGA-SLA-02] Real-Time Multi-Department Alert Center
- **Focus:** A centralized notification hub with persistent visual and optional audio cues for incoming high-priority guest needs.
- **Service Impact:** Minimizes response latency and ensures no guest request goes unnoticed, even during peak hours.

---

## 👤 3. Personalized Guest Relationship Management (GRM)
*Moving beyond room numbers to provide a high-touch, personalized hospitality experience.*

### [SGA-GRM-01] Complete Guest Order & Service History
- **Focus:** Implement an "Order History" view for each guest, consolidating all previous service requests and food orders.
- **Service Impact:** Allows admins to provide personalized service by understanding historic guest preferences (e.g., favorite food items or recurring maintenance issues).

### [SGA-GRM-02] Guest Satisfaction Feedback Loop
- **Focus:** Inline ratings (1-5 stars) and comments displayed next to completed requests.
- **Service Impact:** Provides immediate insight into guest satisfaction levels for specific services like Housekeeping or Room Service.

---

## 🛠️ 4. Advanced Workflow & Operation Controls
*Streamlining complex hotel operations through intuitive administrative tools.*

### [SGA-WKF-01] Operational Status Filtering
- **Focus:** Granular status filter buttons (Pending, In-Progress, Completed) directly on service cards (Requests & Room Service).
- **Service Impact:** Streamlines staff focus by allowing them to quickly filter out finished tasks and concentrate on active "Pending" or "In-Progress" workflows.

### [SGA-WKF-02] Administrative Broadcast System
- **Focus:** A tool for admins to send notifications/alerts to all active guests or specific floors (e.g., "Elevator maintenance starting in 10 minutes").
- **Service Impact:** Improves proactive communication and reduces guest frustration by keeping them informed about property-wide updates.

### [SGA-WKF-03] Mini-Inventory Monitoring (Room Service)
- **Focus:** Visual markers for items that are low in stock on the Room Service management view.
- **Service Impact:** Prevents guests from ordering unavailable items and helps the F&B team restock items proactively.

---

## 💎 UX & Future Polish
- **Dark/Light Mode:** Full support for staff working night-shifts or in low-light environments.
- **Optimistic UI:** Super-fast interface responses where status changes happen instantly on the screen for a "pro" software feel.
