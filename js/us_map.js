class UsMap extends GameMap {
    constructor() {
        super();

        if (!!UsMap.instance) {
            return UsMap.instance;
        }

        UsMap.instance = this;

        this.territories = new Map()
        this.territories.set("AK", new Territory("AK", ["HI","CA","AZ"]));
        this.territories.set("AL", new Territory("AL", ["MS","TN","GA","FL"]));
        this.territories.set("AR", new Territory("AR", ["OK","MO","TN","MS","LA","TX"]));
        this.territories.set("AZ", new Territory("AZ", ["AK","CA","NV","UT","NM"]));
        this.territories.set("CA", new Territory("CA", ["OR","NV","AZ","AK"]));
        this.territories.set("CO", new Territory("CO", ["WY","NE","KS","OK","NM","AZ","UT"]));
        this.territories.set("CT", new Territory("CT", ["MA","RI","NY"]));
        this.territories.set("DC", new Territory("DC", ["VA","MD"]));
        this.territories.set("DE", new Territory("DE", ["NJ","PA","MD"]));
        this.territories.set("FL", new Territory("FL", ["AL","GA"]));
        this.territories.set("GA", new Territory("GA", ["FL","AL","SC","TN","NC"]));
        this.territories.set("HI", new Territory("HI", ["AK","WA"]));
        this.territories.set("IA", new Territory("IA", ["MN","WI","IL","MO","NE","SD"]));
        this.territories.set("ID", new Territory("ID", ["WA","MT","WY","UT","NV","OR"]));
        this.territories.set("IL", new Territory("IL", ["WI","IN","KY","MO","IA"]));
        this.territories.set("IN", new Territory("IN", ["MI","OH","KY","IL"]));
        this.territories.set("KS", new Territory("KS", ["NE","MO","OK","CO"]));
        this.territories.set("KY", new Territory("KY", ["IL","IN","OH","WV","VA","TN","MO"]));
        this.territories.set("LA", new Territory("LA", ["AR","MS","TX"]));
        this.territories.set("MA", new Territory("MA", ["NH","VT","NY","CT","RI"]));
        this.territories.set("MD", new Territory("MD", ["PA","DE","WV","VA"]));
        this.territories.set("ME", new Territory("ME", ["NH"]));
        this.territories.set("MI", new Territory("MI", ["WI","IN","OH"]));
        this.territories.set("MN", new Territory("MN", ["ND","SD","IA","WI"]));
        this.territories.set("MO", new Territory("MO", ["IA","IL","NE","KS","OK","AR","KY","TN"]));
        this.territories.set("MS", new Territory("MS", ["TN","AL","LA","AR"]));
        this.territories.set("MT", new Territory("MT", ["ID","WY","ND","SD"]));
        this.territories.set("NC", new Territory("NC", ["VA","TN","SC","GA"]));
        this.territories.set("ND", new Territory("ND", ["MT","SD","MN"]));
        this.territories.set("NE", new Territory("NE", ["SD","WY","CO","KS","IA"]));
        this.territories.set("NH", new Territory("NH", ["ME","VT","MA"]));
        this.territories.set("NJ", new Territory("NJ", ["NY","PA","DE"]));
        this.territories.set("NM", new Territory("NM", ["AZ","UT","CO","OK","TX"]));
        this.territories.set("NV", new Territory("NV", ["OR","ID","UT","AZ","CA"]));
        this.territories.set("NY", new Territory("NY", ["VT","MA","CT","NJ","PA"]));
        this.territories.set("OH", new Territory("OH", ["MI","IN","KY","WV","PA"]));
        this.territories.set("OK", new Territory("OK", ["KS","CO","NM","TX","AR"]));
        this.territories.set("OR", new Territory("OR", ["WA","ID","NV","CA"]));
        this.territories.set("PA", new Territory("PA", ["NY","NJ","DE","MD","WV","OH"]));
        this.territories.set("PR", new Territory("PR", [])); // idk 
        this.territories.set("RI", new Territory("RI", ["MA","CT"]));
        this.territories.set("SC", new Territory("SC", ["NC","GA"]));
        this.territories.set("SD", new Territory("SD", ["ND","MN","IA","NE","WY","MT"]));
        this.territories.set("TN", new Territory("TN", ["KY","VA","NC","GA","AL","MS","AR","MO"]));
        this.territories.set("TX", new Territory("TX", ["NM","OK","LA"]));
        this.territories.set("UT", new Territory("UT", ["ID","WY","CO","NM","AZ","NV"]));
        this.territories.set("VA", new Territory("VA", ["WV","MD","NC","TN","KY"]));
        this.territories.set("VT", new Territory("VT", ["NY","MA","NH"]));
        this.territories.set("WA", new Territory("WA", ["OR","ID","HI"]));
        this.territories.set("WI", new Territory("WI", ["MN","LA","IL","MI"]));
        this.territories.set("WV", new Territory("WV", ["OH","KY","VA","MD","PA"]));
        this.territories.set("WY", new Territory("WY", ["MT","ID","UT","CO","NE","SD"]));

        return this;
    }
}