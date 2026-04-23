# E-Commerce Web Application

A full-stack e-commerce web application similar to Amazon, built with React frontend and Spring Boot backend with MySQL database.

## Features

- User authentication and authorization (JWT)
- Product catalog with search and filtering
- Shopping cart
- Order management
- Payment integration with Stripe
- Admin dashboard (basic)
- Responsive design

## Tech Stack

- **Frontend:** React (CRA)
- **Backend:** Spring Boot (Java), Hibernate JPA
- **Database:** MySQL
- **Payments:** Stripe
- **Deployment:** Docker

## Getting Started

### Prerequisites

- Java 17 or higher
- MySQL Server
- Node.js (for frontend)
- Maven 3.6+
- Docker (optional)

### Installation

1. Clone the repository
2. Set up MySQL database:
   - Create a database named `ecommerce`
   - Update credentials in `backend/src/main/resources/application.properties` if needed

3. Install dependencies

#### Backend
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Frontend
```bash
cd frontend
npm install
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

## Environment Variables

### Backend
Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### Frontend
The frontend connects to `http://localhost:8080` for API calls.

4. Seed data
```bash
cd backend
npm run data:import
```

5. Start the servers

#### Using npm
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm start
```

#### Using Docker
```bash
docker-compose up --build
```

6. Access the app at http://localhost:3000

## API Endpoints

- `/api/users` - User management
- `/api/products` - Product management
- `/api/orders` - Order management
- `/api/payments` - Payment processing

## Contributing

Contributions are welcome!

## License

This project is licensed under the MIT License.