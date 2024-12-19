import pool from '../config/database';
import bcrypt from 'bcrypt';

class User {
    public id: number;
    public email: string;
    public password: string;

    constructor(id: number, email: string, password: string) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    static async createUser(email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        );
        return new User(result.rows[0].id, result.rows[0].email, result.rows[0].password);
    }

    static async findByEmail(email: string): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length === 0) return null;
        return new User(result.rows[0].id, result.rows[0].email, result.rows[0].password);
    }

    static async findById(id: number): Promise<User | null> {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) return null;
        return new User(result.rows[0].id, result.rows[0].email, result.rows[0].password);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }
}

export default User;