# E-Commerce Backend (Spring Boot)

This is the backend API for the e-commerce application built with Spring Boot, MySQL, and Hibernate JPA.

## Features

- RESTful API for product management
- MySQL database integration
- Hibernate JPA for ORM
- CORS configuration for frontend communication
- Sample data initialization
- Input validation

## Technologies Used

- Java 17
- Spring Boot 3.1.0
- Spring Data JPA
- MySQL Database
- Hibernate
- Maven
- Lombok
- Jakarta Bean Validation

## Prerequisites

- Java 17 or higher
- MySQL Server
- Maven 3.6+

## Database Setup

1. Install MySQL Server
2. Create a database named `ecommerce`
3. Update the database credentials in `src/main/resources/application.properties` if needed

## Running the Application

1. Clone the repository
2. Navigate to the backend directory
3. Run the application:

```bash
mvn spring-boot:run
```

The API will be available at `http://localhost:8080`

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Product Model

```json
{
  "id": "number",
  "name": "string",
  "description": "string",
  "price": "number",
  "category": "string",
  "image": "string",
  "rating": "number",
  "numReviews": "number",
  "stock": "number"
}
```

## Configuration

Database configuration can be found in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce
spring.datasource.username=root
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

## CORS Configuration

CORS is configured to allow requests from `http://localhost:3000` (React frontend).

## Sample Data

The application automatically populates the database with sample products on startup if the database is empty.