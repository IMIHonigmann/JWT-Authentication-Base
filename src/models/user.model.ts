import argon2 from "argon2";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

    async function createUser(email: string, password: string, username = "Anonymous") {
        const hashedPassword = await argon2.hash(password);
        const user = await prisma.user.create({
            data: {
                name: username,
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
        return await argon2.verify(hashedPassword, password);
    }

export { createUser, findByEmail, findById, validatePassword }
