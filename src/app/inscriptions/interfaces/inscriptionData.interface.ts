import { Inscription } from "./inscription.interface";

export interface InscriptionData extends Inscription {

    username: string;
    course: string;
    student: string;
}