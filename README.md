# Booking Platform API

A backend REST API for a booking platform built using **NestJS**, **TypeScript**, and **PostgreSQL**.  
The system provides user authentication, service management, and booking management with JWT-based security.

---

## Project Overview

The Booking Platform API allows users to:

- Register and authenticate using JWT authentication
- Manage available services
- Create and manage bookings
- Update booking statuses
- Store data securely using PostgreSQL database

The project follows NestJS best practices with modular architecture, separation of concerns, and maintainable folder structure.

---

## Technologies Used

- **Backend Framework:** NestJS
- **Programming Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT + Passport
- **Password Security:** bcrypt
- **API Testing:** Postman
- **Package Manager:** npm

---

## Features

### Authentication

- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- Protected API endpoints

### Services Management

- Create services
- View all services
- View service by ID
- Update services
- Delete services

### Booking Management

- Create bookings
- View all bookings
- View booking by ID
- Update booking status
- Delete bookings

---

## Project Structure
src
│
├── auth
│ ├── dto
│ ├── jwt.strategy
│ ├── auth.controller.ts
│ ├── auth.service.ts
│ └── auth.module.ts
│
├── users
│ ├── entities
│ ├── users.service.ts
│ └── users.module.ts
│
├── services
│ ├── dto
│ ├── entities
│ ├── services.controller.ts
│ ├── services.service.ts
│ └── services.module.ts
│
├── bookings
│ ├── dto
│ ├── entities
│ ├── bookings.controller.ts
│ ├── bookings.service.ts
│ └── bookings.module.ts
│
├── app.module.ts
└── main.ts


---

# Installation Steps

## 1. Clone Repository

```bash
git clone https://github.com/Sudesh456/booking-platform-api.git
