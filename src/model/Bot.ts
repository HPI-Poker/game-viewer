export class Bot {
    id: string;
    name: string;
    isPredefined: boolean;
    // performance: number;

    constructor(id: string, name: string, isPredefined: boolean, performance: number) {
        this.id = id;
        this.name = name;
        this.isPredefined = isPredefined;
        // this.performance = performance;
    }
}