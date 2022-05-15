export class FirebaseUpdateProfileSuccess {
    constructor(
        public localId: string,
        public email: string,
        public displayName: string,
        public photoUrl: string,
        public idToken: string,
        public refreshToken: string,
        public expiresIn: string, 
        
    ) {}
}

// data from server Object {
//     "displayName": "hello",
//     "email": "chia@email.com",
//     "localId": "P5NrYQUra3UfxxGXkya4YK27NEi2",
//     "passwordHash": "UkVEQUNURUQ=",
//     "photoUrl": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FTestProject-23d78823-958b-4413-a3fd-813e69ba1df6/ImagePicker/58e88c65-c84f-402d-b843-456231eb3146.png",
//     "providerUserInfo": Array [
//       Object {
//         "displayName": "hello",
//         "email": "chia@email.com",
//         "federatedId": "chia@email.com",
//         "photoUrl": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FTestProject-23d78823-958b-4413-a3fd-813e69ba1df6/ImagePicker/58e88c65-c84f-402d-b843-456231eb3146.png",
//         "providerId": "password",
//         "rawId": "chia@email.com",
//       },
//     ],
//   }