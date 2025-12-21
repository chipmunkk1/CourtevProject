# 🏟️ Courtev – Sports Court Reservation Platform

Courtev is a frontend web application that allows users to reserve sports courts easily and intuitively.  
The platform supports multiple sports and locations, providing users with real-time contextual information such as location maps, weather conditions, and sport-related equipment.

This project was developed as a college learning project with a strong focus on clean architecture, user flow, and modern web concepts.

---

## 📌 Project Overview

Courtev enables users to:

- Reserve sports courts for different sports
- Choose a city, date, and time range
- View court locations on Google Maps
- See real-time weather information
- Purchase sport-related equipment via embedded services
- Receive email confirmation upon successful booking
- Cancel reservations according to defined rules

Currently, the project is implemented as a frontend simulation, with plans to extend it to a full-stack system.

---

## 🏐 Supported Sports

- ⚽ Soccer
- 🎾 Tennis
- 🏀 Basketball
- 🏐 Volleyball

Each sport dynamically updates the UI and embedded content based on the user’s selection.

---

## 🔄 User Flow

- **User Information Page**
  - Enter personal details (name, email, phone, ID, address)
  - Proceed to court selection

- **Court Selection Page**
  - Choose sport, city, date, and time slot
  - View:
    - 📍 Embedded Google Maps showing court location
    - 🌤️ Embedded real-time weather service
    - 🛒 Embedded sport-related shopping site (SaaS)

- **Booking**
  - Click Book
  - Payment window (UI simulation)
  - Booking confirmation is sent via email

- **Cancellation**
  - Users can cancel a reservation using their ID
  - Cancellation is allowed up to 24 hours before the reservation time

---

## 🧩 Key Features

- Dynamic court reservation system
- Embedded Google Maps for location preview
- Real-time weather embedding
- Sport-based SaaS integration (equipment and gear)
- Email confirmation system
- Reservation cancellation logic
- Clean UI and user-friendly flow

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Local data storage (frontend simulation)
- Embedded external services (iframes)

---

## 🧱 Project Architecture

The project follows a clear separation of concerns:

