import Controller from "./Controller";

class HomeController extends Controller {
    constructor() {
        super();
        console.log("HomeController initialized");
    }

    index() {
        console.log("HomeController index method called");
        // Logique pour afficher la page d'accueil
        // Par exemple, charger des données, afficher un message, etc.
    }

    login() {
        console.log("HomeController login method called");
        // Logique pour afficher la page de connexion
        // Par exemple, rediriger vers une page de connexion ou afficher un formulaire
    }

    register() {
        console.log("HomeController register method called");
        // Logique pour afficher la page d'inscription
        // Par exemple, rediriger vers une page d'inscription ou afficher un formulaire
    }

    unregister() {
        console.log("HomeController unregister method called");
        // Logique pour afficher la page de désinscription
        // Par exemple, rediriger vers une page de désinscription ou afficher un message de confirmation
    }
}

export default HomeController;
