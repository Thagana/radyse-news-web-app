import Article from "../interface/Article.interface";

class UniqueNameSet extends Set {
    constructor(values: Article[]) {
        super(values);

        const names: Article[] = [];
        // @ts-ignore
        for (let value of this) {
            if (names.includes(value.title)) {
                this.delete(value);
            } else {
                names.push(value.title);
            }
        }
    }
}

export default UniqueNameSet;