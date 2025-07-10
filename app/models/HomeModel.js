import Model from "./Model.js";

export default class HomeModel extends Model {
    constructor() {
        super();
        this.topics = [];
        this.topic = {
            id: null,
            title: "",
            description: "",
            status: "open",
            students: [],
            tutor: {
                id: null,
                name: "",
                email: "",
                phone: ""
            },
            subtutor: {
                id: null,
                name: "",
                email: "",
                phone: ""
            },
        }
    }
}
