// Auth repository placeholder
import prisma from "../../config/db";

export const createUser = async (data) => {
    return prisma.user.create({
        data,
    });
};

export const findUserByEmail = async (email) => {
    return prisma.user.findUnique({
        where: {
            email,
        },
    });
};

export const findUserById = async (id) => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
};

