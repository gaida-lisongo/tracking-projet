/**
 * Routeur pour gérer les hash routes
 * Supporte les routes avec paramètres comme #activity-1, #submit-1-2, etc.
 */
class Routeur {
    /**
     * Constructeur du routeur
     * @param {Array} routes - Tableau des routes définies
     * @param {Object} controllers - Objet contenant les contrôleurs disponibles
     */
    constructor(routes = [], controllers = {}) {
        this.routes = routes;
        this.controllers = controllers;
        this.currentRoute = null;
        this.init();
    }

    /**
     * Initialise le routeur
     */
    init() {
        // Écouter les changements de hash
        window.addEventListener('hashchange', () => this.handleRouteChange());
        window.addEventListener('load', () => this.handleRouteChange());
        
        // Gérer la route initiale
        this.handleRouteChange();
    }

    /**
     * Ajoute une nouvelle route
     * @param {string} pattern - Pattern de la route (ex: "activity", "submit")
     * @param {string} controller - Nom du contrôleur
     * @param {string} method - Méthode à appeler sur le contrôleur
     */
    addRoute(pattern, controller, method) {
        this.routes.push({
            pattern: pattern,
            controller: controller,
            method: method
        });
    }

    /**
     * Parse le hash actuel et extrait les paramètres
     * @param {string} hash - Hash à parser
     * @returns {Object} - Objet contenant le nom de la route et les paramètres
     */
    parseHash(hash) {
        // Enlever le # du début
        const cleanHash = hash.replace('#', '');
        
        if (!cleanHash) {
            return { route: 'home', params: [] };
        }

        // Séparer par les tirets pour extraire les paramètres
        const parts = cleanHash.split('-');
        const route = parts[0];
        const params = parts.slice(1);

        return { route, params };
    }

    /**
     * Trouve la route correspondante dans la liste des routes
     * @param {string} routeName - Nom de la route à chercher
     * @returns {Object|null} - Route trouvée ou null
     */
    findRoute(routeName) {
        return this.routes.find(route => route.pattern === routeName) || null;
    }

    /**
     * Gère les changements de route
     */
    handleRouteChange() {
        const hash = window.location.hash || '#home';
        const { route, params } = this.parseHash(hash);
        
        console.log(`Navigation vers: ${route}`, params);
        
        // Chercher la route correspondante
        const routeConfig = this.findRoute(route);
        
        if (routeConfig) {
            this.executeRoute(routeConfig, params);
        } else {
            console.warn(`Route non trouvée: ${route}`);
            // Rediriger vers la page d'accueil par défaut
            this.navigateTo('home');
        }
    }

    /**
     * Exécute une route avec ses paramètres
     * @param {Object} routeConfig - Configuration de la route
     * @param {Array} params - Paramètres extraits de l'URL
     */
    executeRoute(routeConfig, params) {
        try {
            const ControllerClass = this.controllers[routeConfig.controller];
            
            if (!ControllerClass) {
                throw new Error(`Contrôleur non trouvé: ${routeConfig.controller}`);
            }

            // Créer une instance du contrôleur
            const controller = new ControllerClass();
            
            // Vérifier que la méthode existe
            if (typeof controller[routeConfig.method] !== 'function') {
                throw new Error(`Méthode non trouvée: ${routeConfig.method} dans ${routeConfig.controller}`);
            }

            // Appeler la méthode avec les paramètres
            controller[routeConfig.method](...params);
            
            this.currentRoute = {
                route: routeConfig.pattern,
                params: params,
                controller: routeConfig.controller,
                method: routeConfig.method
            };

        } catch (error) {
            console.error('Erreur lors de l\'exécution de la route:', error);
        }
    }

    /**
     * Navigation programmatique vers une route
     * @param {string} route - Nom de la route
     * @param {Array} params - Paramètres optionnels
     */
    navigateTo(route, params = []) {
        let hash = '#' + route;
        
        if (params.length > 0) {
            hash += '-' + params.join('-');
        }
        
        window.location.hash = hash;
    }

    /**
     * Obtient la route actuelle
     * @returns {Object|null} - Route actuelle ou null
     */
    getCurrentRoute() {
        return this.currentRoute;
    }

    /**
     * Vérifie si une route est active
     * @param {string} routeName - Nom de la route à vérifier
     * @returns {boolean} - True si la route est active
     */
    isActiveRoute(routeName) {
        return this.currentRoute && this.currentRoute.route === routeName;
    }
}

// Export pour utilisation dans d'autres modules
export default Routeur;