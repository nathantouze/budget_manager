
interface Column {
    title: string;
    key: string;
    type: string;
    width: number;
    mandatory: boolean;
    options?: any;
};

class ArrayStruct {

    columns: Array<Column> = [];

    static ColumnType = {
        TEXT: 'text',
        NUMBER: 'number',
        DATE: 'date',
        PRICE: 'price',
        ACTION: 'action',
    };

    constructor() {}

    addColumn(title: string, key: string, type: string, width: number, mandatory: boolean, options?: any) {
        this.columns.push({
            title: title,
            key: key,
            type: type,
            width: width,
            mandatory: mandatory,
            options: options,
        });
    }

    getColumns() {
        return this.columns;
    }
}

export default ArrayStruct;