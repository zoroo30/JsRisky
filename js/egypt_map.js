class EgyptMap extends GameMap {
    constructor() {
        super();
        
        if (!!EgyptMap.instance) {
            return EgyptMap.instance;
        }

        EgyptMap.instance = this;

        this.territories = new Map()
        this.territories.set('SS', new Territory('SS', ['BS', 'IS', 'SW', 'JS']));
        this.territories.set('AN', new Territory('AN', ['WJ', 'BA', 'QN']));
        this.territories.set('WJ', new Territory('WJ', ['AN', 'QN', 'SJ', 'AT', 'MN', 'JZ', 'MT']));
        this.territories.set('BA', new Territory('BA', ['AN', 'QN', 'SJ', 'AT', 'MN', 'BN', 'JZ', 'SW']));
        this.territories.set('MT', new Territory('MT', ['IK', 'BH', 'JZ', 'WJ']));
        this.territories.set('SW', new Territory('SW', ['BA', 'JZ', 'QH', 'IS', 'SS', 'JS']));
        this.territories.set('JS', new Territory('JS', ['SW', 'SS']));
        this.territories.set('BS', new Territory('BS', ['SS', 'IS', 'SQ']));
        this.territories.set('DQ', new Territory('DQ', ['KS', 'GH', 'QL', 'SQ', 'DT']));
        this.territories.set('SQ', new Territory('SQ', ['DQ', 'BS', 'IS', 'QL', 'QH']));
        this.territories.set('IS', new Territory('IS', ['BS', 'SQ', 'SS', 'SW', 'QH']));
        this.territories.set('DT', new Territory('DT', ['DQ']));
        this.territories.set('KS', new Territory('KS', ['BH', 'GH', 'DQ']));
        this.territories.set('BH', new Territory('BH', ['KS', 'GH', 'MF', 'IK', 'JZ', 'MT']));
        this.territories.set('IK', new Territory('IK', ['BH', 'MT']));
        this.territories.set('QH', new Territory('QH', ['QL', 'SQ', 'IS', 'SW', 'JZ']));
        this.territories.set('JZ', new Territory('JZ', ['MT', 'SW', 'BH', 'MF', 'QL', 'QH', 'BA', 'FY', 'BN', 'MN', 'WJ']));
        this.territories.set('MN', new Territory('MN', ['AT', 'BA', 'BN', 'JZ', 'WJ']));
        this.territories.set('FY', new Territory('FY', ['JZ', 'BN']));
        this.territories.set('BN', new Territory('BN', ['JZ', 'MN', 'BA', 'FY']));
        this.territories.set('MF', new Territory('MF', ['GH', 'BH', 'JZ', 'QL']));
        this.territories.set('QL', new Territory('QL', ['DQ', 'GH', 'MF', 'JZ', 'QH', 'SQ']));
        this.territories.set('GH', new Territory('GH', ['KS', 'BH', 'MF', 'QL', 'DQ']));
        this.territories.set('SJ', new Territory('SJ', ['QN', 'AT', 'BA', 'WJ']));
        this.territories.set('QN', new Territory('QN', ['UQ', 'SJ', 'WJ', 'BA', 'AN']));
        this.territories.set('AT', new Territory('AT', ['MN', 'WJ', 'SJ', 'BA']));
        this.territories.set('UQ', new Territory('UQ', ['QN']));


        return this;
    }
}