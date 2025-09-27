import { userSchema } from "../schemes/user.schema";    

export const init = () => {
    // Create Root User
    userSchema.add({
        name: "root",
        email: "root@example.com",
        password: "root",
        permissions: []
    });
}