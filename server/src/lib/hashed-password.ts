import bcrypt from "bcryptjs";


export const hashedPasswordFn = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password ?? '', salt);
    return hashedPassword;
};

export const comparePasswordFn = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password ?? '', hashedPassword ?? '');
};