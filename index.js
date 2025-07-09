// Import des modules avec extensions .js pour GitHub Pages
import Routeur from "./config/Routeur.js";
import HomeController from "./app/controllers/HomeController.js";
import EtudiantController from "./app/controllers/EtudiantController.js";
import TuteurController from "./app/controllers/TuteurController.js";

// Configuration des contrôleurs (instances créées dans le routeur)
const controllers = {
    'HomeController': HomeController,
    'EtudiantController': EtudiantController,
    'TuteurController': TuteurController
};

// Configuration des routes adaptée aux hash routes
const routes = [
    { pattern: 'home', controller: 'HomeController', method: 'index' },
    { pattern: 'login', controller: 'HomeController', method: 'login' },
    { pattern: 'dashboard', controller: 'HomeController', method: 'dashboard' },
    { pattern: 'activities', controller: 'EtudiantController', method: 'listActivities' },
    { pattern: 'activity', controller: 'EtudiantController', method: 'showActivity' },
    { pattern: 'submit', controller: 'EtudiantController', method: 'submitWork' },
    { pattern: 'subjects', controller: 'TuteurController', method: 'listSubjects' },
    { pattern: 'user', controller: 'HomeController', method: 'profile' },
    { pattern: 'recharge', controller: 'HomeController', method: 'recharge' }
];

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', () => {
    console.log('TFE App - Initialisation...');
    
    // Créer et démarrer le routeur
    const router = new Routeur(routes, controllers);
    
    // Exposer le routeur globalement pour navigation
    window.app = router;
    
    console.log('Application démarrée avec succès');
});