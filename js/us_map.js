class UsMap extends GameMap {
    constructor() {
        super();

        if (!!UsMap.instance) {
            return UsMap.instance;
        }

        UsMap.instance = this;

        this.territories = new Map()
        this.territories.set("AK", new Territory("AK", []));
        this.territories.set("AL", new Territory("AL", []));
        this.territories.set("AR", new Territory("AR", []));
        this.territories.set("AZ", new Territory("AZ", []));
        this.territories.set("CA", new Territory("CA", []));
        this.territories.set("CO", new Territory("CO", []));
        this.territories.set("CT", new Territory("CT", []));
        this.territories.set("DC", new Territory("DC", []));
        this.territories.set("DE", new Territory("DE", []));
        this.territories.set("FL", new Territory("FL", []));
        this.territories.set("GA", new Territory("GA", []));
        this.territories.set("HI", new Territory("HI", []));
        this.territories.set("IA", new Territory("IA", []));
        this.territories.set("ID", new Territory("ID", []));
        this.territories.set("IL", new Territory("IL", []));
        this.territories.set("IN", new Territory("IN", []));
        this.territories.set("KS", new Territory("KS", []));
        this.territories.set("KY", new Territory("KY", []));
        this.territories.set("LA", new Territory("LA", []));
        this.territories.set("MA", new Territory("MA", []));
        this.territories.set("MD", new Territory("MD", []));
        this.territories.set("ME", new Territory("ME", []));
        this.territories.set("MI", new Territory("MI", []));
        this.territories.set("MN", new Territory("MN", []));
        this.territories.set("MO", new Territory("MO", []));
        this.territories.set("MS", new Territory("MS", []));
        this.territories.set("MT", new Territory("MT", []));
        this.territories.set("NC", new Territory("NC", []));
        this.territories.set("ND", new Territory("ND", []));
        this.territories.set("NE", new Territory("NE", []));
        this.territories.set("NH", new Territory("NH", []));
        this.territories.set("NJ", new Territory("NJ", []));
        this.territories.set("NM", new Territory("NM", []));
        this.territories.set("NV", new Territory("NV", []));
        this.territories.set("NY", new Territory("NY", []));
        this.territories.set("OH", new Territory("OH", []));
        this.territories.set("OK", new Territory("OK", []));
        this.territories.set("OR", new Territory("OR", []));
        this.territories.set("PA", new Territory("PA", []));
        this.territories.set("PR", new Territory("PR", []));
        this.territories.set("RI", new Territory("RI", []));
        this.territories.set("SC", new Territory("SC", []));
        this.territories.set("SD", new Territory("SD", []));
        this.territories.set("TN", new Territory("TN", []));
        this.territories.set("TX", new Territory("TX", []));
        this.territories.set("UT", new Territory("UT", []));
        this.territories.set("VA", new Territory("VA", []));
        this.territories.set("VT", new Territory("VT", []));
        this.territories.set("WA", new Territory("WA", []));
        this.territories.set("WI", new Territory("WI", []));
        this.territories.set("WV", new Territory("WV", []));
        this.territories.set("WY", new Territory("WY", []));

        return this;
    }
}