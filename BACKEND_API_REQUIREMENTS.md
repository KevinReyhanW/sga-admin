# SGA Backend API Requirements

> **Frontend Repo:** `mta-sga`
> **Last Updated:** 2026-03-05

---

## 1. Guest Order History

### `GET /api/v1/guests/{guestId}/orders`

Fetch all orders/requests submitted by a specific guest.

**Path Parameters:**
| Parameter | Type   | Description |
|-----------|--------|-------------|
| `guestId` | string (UUID) | The guest's unique ID |

**Response:**
```json
{
  "data": [
    {
      "order_id": "uuid-string",
      "order_number": "ORD-001",
      "category": "room_service | housekeeping | maintenance | restaurant",
      "status": "pending | in_progress | completed | rejected",
      "guest_name": "John Doe",
      "order_items": [
        {
          "title": "Special Fried Rice",
          "description": "No MSG, extra chili"
        }
      ],
      "room": {
        "room_number": "120"
      },
      "created_at": "2026-01-28T10:30:00Z",
      "updated_at": "2026-01-28T11:00:00Z"
    }
  ]
}
```

**Notes:**
- Should return all orders historically, not limited to current session
- Sorted by `created_at` descending (newest first)
- Used in the **Guest Management** page → "Order History" drawer

---

## 2. Average Response Time

### `GET /api/v1/dashboard/avg-response-time`

Calculate the average time between order creation and first status update (or completion).

**Query Parameters:**
| Parameter | Type   | Description | Required |
|-----------|--------|-------------|----------|
| `date`    | string (YYYY-MM-DD) | The date to calculate for | Yes |

**Response:**
```json
{
  "data": {
    "avg_minutes": 4.56,
    "comparison": {
      "previous_avg_minutes": 7.23,
      "diff_minutes": -2.67,
      "period": "yesterday"
    }
  }
}
```

**Notes:**
- `avg_minutes` = average response time for the given `date`
- `comparison.previous_avg_minutes` = average response time for the day before `date`
- `comparison.diff_minutes` = difference (negative = improved)
- Currently the frontend hardcodes this as **"N/A"** until this endpoint is ready
- Used in the **Dashboard** page → "Avg Response Time" card

---

## 3. Dashboard Stats by Date (Optional Enhancement)

### `GET /api/v1/dashboard/stats?date=YYYY-MM-DD`

Currently, the frontend filters Electric SQL data client-side by date. If performance becomes an issue with large datasets, consider a server-side aggregation endpoint.

**Response:**
```json
{
  "data": {
    "total_registered_guests": 124,
    "active_requests": 18,
    "room_service_orders": 5,
    "avg_response_time_minutes": 4.56,
    "guests_registered_this_week": 3
  }
}
```

**Notes:**
- This is **optional** — only needed if client-side date filtering on Electric SQL data causes performance issues
- Currently **not** called by the frontend

---

## Priority

| # | Endpoint | Priority | Reason |
|---|----------|----------|--------|
| 1 | Guest Order History | **High** | UI is built and ready, shows empty state until API exists |
| 2 | Avg Response Time | **Medium** | Dashboard card currently shows "N/A" |
| 3 | Dashboard Stats by Date | **Low** | Only needed for performance optimization |
