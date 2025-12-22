# 🏟️ Courtev – Sports Court Reservation Platform

**Courtev** is a frontend web application designed to make reserving sports courts easy and intuitive. The platform supports multiple sports and locations, providing users with real-time contextual information such as location maps, weather conditions, and sport-related equipment.

This project was developed as a college learning project with a strong focus on **clean architecture**, **user flow**, and **modern web concepts**.

---

## 📌 Project Overview

Courtev enables users to:

- **Reserve** sports courts for various sports.
- **Filter** by city, date, and time range.
- **Locate** courts via integrated Google Maps.
- **Check** real-time weather conditions before booking.
- **Shop** for sport-specific equipment via embedded services.
- **Manage** bookings with email confirmations and cancellation rules.

> **Note:** Currently, the project is implemented as a frontend simulation, with plans to extend it to a full-stack system.

---

## 🏐 Supported Sports

The UI dynamically updates based on the sport selected:

- ⚽ **Soccer**
- 🎾 **Tennis**
- 🏀 **Basketball**
- 🏐 **Volleyball**

---

## 🔄 User Flow

1.  **User Information Page**: Enter personal details (Name, Email, Phone, ID, Address).
2.  **Court Selection Page**: Choose sport, city, date, and time slot.
3.  **Contextual Insights**:
    - 📍 **Google Maps**: Preview court location.
    - 🌤️ **Weather Service**: Check real-time conditions.
    - 🛒 **SaaS Integration**: Purchase gear via embedded shopping sites.
4.  **Booking**: Complete the UI-simulated payment and receive an email confirmation.
5.  **Cancellation**: Reservations can be cancelled using a User ID up to **24 hours** before the scheduled time.

---

## 🛠️ Technologies Used

- **HTML5 & CSS3**: Structure and responsive styling.
- **JavaScript (Vanilla)**: Core business logic and UI manipulation.
- **Local Storage**: Frontend-based data persistence.
- **Iframes**: Integration of external services (Maps, Weather, Shopping).

---

## 🧱 Project Architecture

The project follows a strict **Separation of Concerns** to ensure maintainability:

- **/data**: Local data handling and reservation storage logic.
- **/logic**: Core JavaScript business logic and validation rules.
- **/presentation**: UI pages, CSS styling, and layout assets.

---

## 🚀 How to Run the Project

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/chipmunkk1/CourtevProject.git
    ```
2.  **Open the project**:
    Simply open `index.html` in any modern web browser.
    _No additional setup or backend servers are required for this frontend-only version._

---

## 📈 Project Status & Roadmap

🟡 **Current Status**: Almost Completed (Frontend Simulation)

**Planned Improvements**:

- [ ] Replace iframes with real API integrations (OpenWeather, Google Maps API).
- [ ] Implement a backend (MongoDB) for persistent data.
- [ ] Integrate a real payment gateway (Stripe or PayPal).
- [ ] Add user authentication and an Admin Dashboard.

---

## 👥 Team Members

- **Rohi Basheer**
- **Diaa Al Din abo alheja**
- **Amir Sanallah**
- **Mohammed Shalata**

---

## 🎓 Purpose

Courtev was created as a college project to explore:

- Frontend architecture patterns.
- Designing real-world user flows.
- SaaS and third-party service integration.
