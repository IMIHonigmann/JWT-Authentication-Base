import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

    async function createUser(email: string, password: string) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: "placeholder",
                email: email,
                password: hashedPassword,
            },
        });
        return user;
    }

    async function findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user) return null;
        return user
    }

    async function findById(id: number) {
        const user = await prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!user) return null;
        return user
    }

    async function validatePassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

export { createUser, findByEmail, findById, validatePassword }
