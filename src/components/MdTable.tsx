import React from "react";
type TableColumn<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

type TableProps<T> = {
    data: T[];
    columns: TableColumn<T>[];
    readonly?: boolean;
}


const MdTable = <T,>({ data, columns, readonly = false }: TableProps<T>) => {

    return (
        <React.Fragment>
            <table>
                <thead >
                    <tr >
                        {
                            columns.map((column, columnIndex) => (
                                <th key={columnIndex}>
                                    {column.header}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                columns.map((column) => (
                                    <td key={column.key as string}>
                                        {
                                            readonly
                                                ? column.render ? column.render(row[column.key], row) : row[column.key]?.toString()
                                                : (
                                                    <input/>
                                                )
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
        </table>
</React.Fragment>
)

}
export default MdTable;