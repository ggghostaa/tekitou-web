import React from "react";

type TableProps<T> = {
    data: T[];
    columns: {
        key: keyof T;
        header: string;
        render?: (value: T[keyof T], row: T) => React.ReactNode;
    }[];
}


const MdTable = <T,>({ data, columns }: TableProps<T>) => {

    return (
        <React.Fragment>
            dddd
            <table>

            </table>
        </React.Fragment>
    )

}
export default MdTable;