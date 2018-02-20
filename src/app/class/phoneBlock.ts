
export class PhoneBlock {

    office: string;

    home: string;

    cellphone: string;

    fax: string;

    main: string;

    other: string;

    constructor(){
        this.office = null;
        this.home = null;
        this.cellphone = null;
        this.fax = null;
        this.main = null;
        this.other = null;
    }

    public static getAsString(phoneBlock: PhoneBlock) {
        let result = "";

        let t = [];

        if (phoneBlock.office) t.push(phoneBlock.office);
        if (phoneBlock.home) t.push(phoneBlock.home);
        if (phoneBlock.cellphone) t.push(phoneBlock.cellphone);
        if (phoneBlock.fax) t.push(phoneBlock.fax);
        if (phoneBlock.main) t.push(phoneBlock.main);
        if (phoneBlock.other) t.push(phoneBlock.other);

        result = t.join(", ");

        return result;
    }

    public static getNotNullPhone(phoneBlock: PhoneBlock){
        if (phoneBlock.main) return phoneBlock.main;
        else if (phoneBlock.cellphone) return phoneBlock.cellphone;
        else if (phoneBlock.home) return phoneBlock.home;
        else if (phoneBlock.fax) return phoneBlock.fax;
        else if (phoneBlock.office) return phoneBlock.office;
        else if (phoneBlock.other) return phoneBlock.other;
        else return "";
    }

    public static getAsArray(phoneBlock: PhoneBlock) {
        let t : string[] = [];

        if (phoneBlock.office) t.push(phoneBlock.office);
        if (phoneBlock.home) t.push(phoneBlock.home);
        if (phoneBlock.cellphone) t.push(phoneBlock.cellphone);
        if (phoneBlock.fax) t.push(phoneBlock.fax);
        if (phoneBlock.main) t.push(phoneBlock.main);
        if (phoneBlock.other) t.push(phoneBlock.other);

        return t;
    }

    public static formatNumberArray(data: string[]){
        let t : string[] = [];
        data.forEach(dt => {
            var match = dt.match(/(7|8)(\d{3})(\d{3})(\d{2})(\d{2})/);
            if(match != null && match.length){
                t.push( "+7(" + match[2] + ")" + match[3] +"-"+ match[4] +"-" + match[5]);
            }
        });
        return t;
    }
}
