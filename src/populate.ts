import pool from './config/database';
import bcrypt from 'bcrypt';

async function seedDatabase() {
    try {
        // Create users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert sample users
        const password = await bcrypt.hash('password123', 10);
        await pool.query(`
            INSERT INTO users (email, password) 
            VALUES 
                ($1, $2),
                ($3, $4)
            ON CONFLICT (email) DO NOTHING;
        `, ['test@example.com', password, 'admin@example.com', password]);

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();