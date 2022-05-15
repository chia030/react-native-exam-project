export class FirebaseSigninSuccess {
    constructor(
        public idToken: string,
        public email: string,
        public displayName: string,
        public profilePicture: string,
        public refreshToken: string,
        public expiresIn: string, 
        public localId: string
    ) {}
}