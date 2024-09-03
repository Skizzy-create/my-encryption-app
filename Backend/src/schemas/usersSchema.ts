import zod from 'zod'; // for zod

const userSignupSchema: zod.Schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(70),
    firstName: zod.string().max(70),
    lastName: zod.string().max(70),
});

const userLoginSchema: zod.Schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(6).max(70),
});

export {
    userSignupSchema,
    userLoginSchema
}