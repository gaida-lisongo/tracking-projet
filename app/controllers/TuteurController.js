import Controller from "./Controller.js";

class TuteurController extends Controller {
    constructor() {
        super();
        console.log("TuteurController initialized");
    }

    index() {
        console.log("TuteurController index method called");
        // Logique pour afficher la page d'accueil des tuteurs
    }

    listSubjects() {
        console.log("TuteurController listSubjects method called");
        // Logique pour afficher la liste des sujets
    }

    manageStudents() {
        console.log("TuteurController manageStudents method called");
        // Logique pour gérer les étudiants
    }

    profile() {
        console.log("TuteurController profile method called");
        // Logique pour afficher le profil du tuteur
    }
}

export default TuteurController;