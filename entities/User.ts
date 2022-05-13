export class User {
    email: string;
    displayname?: string;
    studyProgram?: string;
    photoUrl?: string

    constructor(email: string, displayname?: string, studyProgram?: string, photoUrl?: string) {
        this.email = email;
        this.displayname = displayname;
        this.studyProgram = studyProgram;
        this.photoUrl = photoUrl;
    }
}