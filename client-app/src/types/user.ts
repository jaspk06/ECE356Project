export interface User {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    passwordHash: string,
    phoneNumber: string,
    gender: string,
    birthday: Date,
    dateJoined: Date
}