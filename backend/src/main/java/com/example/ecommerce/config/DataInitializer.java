package com.example.ecommerce.config;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            // Add sample products
            productRepository.save(new Product(null, "Wireless Headphones", "Premium quality wireless headphones with noise cancellation", 79.99, "Electronics", "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&fm=webp", 4.5, 120, 50));
            productRepository.save(new Product(null, "USB-C Cable", "High-speed USB-C charging cable", 19.99, "Electronics", "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?w=300&h=300&fit=crop&fm=webp", 4.2, 85, 100));
            productRepository.save(new Product(null, "Phone Case", "Protective phone case with screen protector", 24.99, "Electronics", "https://images.unsplash.com/photo-1541877944-ac82a091518a?w=300&h=300&fit=crop&fm=webp", 4.3, 95, 75));
            productRepository.save(new Product(null, "Portable Charger", "10000mAh portable power bank", 39.99, "Electronics", "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=300&h=300&fit=crop&fm=webp", 4.6, 145, 60));
            productRepository.save(new Product(null, "Screen Protector", "Tempered glass screen protector", 14.99, "Electronics", "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=300&h=300&fit=crop&fm=webp", 4.1, 70, 120));
            productRepository.save(new Product(null, "Wireless Charger", "Fast wireless charging pad", 29.99, "Electronics", "https://images.unsplash.com/photo-1516747773446-b1fd1ccf0a3b?w=300&h=300&fit=crop&fm=webp", 4.4, 110, 80));

            productRepository.save(new Product(null, "Cotton T-Shirt", "Comfortable 100% cotton t-shirt", 19.99, "Fashion", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&fm=webp", 4.3, 200, 150));
            productRepository.save(new Product(null, "Slim Fit Jeans", "Modern slim fit jeans", 59.99, "Fashion", "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop&fm=webp", 4.5, 180, 95));
            productRepository.save(new Product(null, "Running Shoes", "Lightweight running shoes", 89.99, "Fashion", "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&fm=webp", 4.6, 250, 80));

            productRepository.save(new Product(null, "Coffee Maker", "Programmable coffee maker", 49.99, "Home", "https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=300&h=300&fit=crop&fm=webp", 4.4, 135, 65));
            productRepository.save(new Product(null, "LED Desk Lamp", "Adjustable LED desk lamp", 34.99, "Home", "https://images.unsplash.com/photo-1565182999555-2dd203b0f9fd?w=300&h=300&fit=crop&fm=webp", 4.5, 95, 85));

            productRepository.save(new Product(null, "Face Cleanser", "Gentle daily face cleanser", 16.99, "Beauty", "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop&fm=webp", 4.5, 180, 110));
            productRepository.save(new Product(null, "Moisturizer Cream", "Rich moisturizer with SPF 30", 24.99, "Beauty", "https://images.unsplash.com/photo-1596462502278-af3efdc991db?w=300&h=300&fit=crop&fm=webp", 4.6, 165, 90));

            productRepository.save(new Product(null, "Organic Granola", "Healthy organic granola cereal", 8.99, "Grocery", "https://images.unsplash.com/photo-1585518419759-6e92a7df7c0d?w=300&h=300&fit=crop&fm=webp", 4.4, 120, 200));
            productRepository.save(new Product(null, "Premium Coffee", "1lb bag of premium coffee beans", 14.99, "Grocery", "https://images.unsplash.com/photo-1447933601403-0c6688bcf566?w=300&h=300&fit=crop&fm=webp", 4.7, 210, 150));

            System.out.println("Sample products initialized in database");
        }
    }
}