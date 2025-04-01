
import './MdTable.css'
import React, {useRef, useState} from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

type TableColumn<T> = {
    key: keyof T;
    header: string;
    render?: (value: T[keyof T], row: T) => React.ReactNode;
}

type TableProps<T> = {
    initialData: T[];
    columns: TableColumn<T>[];
    readonly?: boolean;
    showHeader?: boolean;
}


const MdTable = <T,>({ initialData, columns, readonly = false, showHeader = true }: TableProps<T>) => {

    const [data, setData] = useState<T[]>(initialData ?? []);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [update, setUpdate] = useState(false);

    const [date, setDate] = useState<Dayjs | null>(null);
    const [time, setTime] = useState<Dayjs | null>(null);

    const handleInputChange = (rowIndex: number, columnKey: keyof T, event: React.ChangeEvent<HTMLInputElement>) => {
        const newData = [...data];
        newData[rowIndex] = { ...newData[rowIndex], [columnKey]: event.target.value };
        setData(newData);
        setUpdate(true);
    }

    const handleAddRow = (callback?: () => void) => {
        setData(prevData => [
            ...prevData,
            columns.reduce((acc, column) => {
                acc[column.key] = "" as T[keyof T];
                return acc;
            }, {} as Partial<T>) as T
        ]);
        if (callback) {
            setTimeout(() => {
                callback();
            }, 0)
        }
    };

    const handleSave = () => {
        setUpdate(false)
    }

    const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        //get all board
        const ctrl = event.ctrlKey;
        console.log(event.key)
        if (event.key === "Enter" || event.key === "Tab" || (event.key === "Enter" && ctrl)) {
            if (index + 1 === inputRefs.current.length) {
                handleAddRow(() => {
                    inputRefs.current[index+1]!.focus();
                });
            } else {
                event.preventDefault();
                inputRefs.current[index+1]?.focus();
            }
        } else if (event.key === "Backspace") {

        } else if (event.key === "Delete") {

        }
    }

    const handleConfirm = () => {
        if (date && time) {
            alert(`Selected Event: ${date.format("YYYY-MM-DD")} at ${time.format("HH:mm")}`);
        } else {
            alert("Please select both date and time.");
        }
    };

    return (
        <React.Fragment>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Select Date" value={date} onChange={setDate} />
            </LocalizationProvider>
            <table className={"md-table"} style={{ marginTop: "10px"}}>
                {
                    showHeader ? (
                        <thead>
                        <tr>
                            {
                                columns.map((column, columnIndex) => (
                                    <th key={columnIndex}>
                                        {column.header}
                                    </th>
                                ))
                            }
                        </tr>
                        </thead>
                    ) : ""
                }

                <tbody>
                {
                    data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {
                                columns.map((column, columnIndex) => (
                                    <td key={column.key as string}>
                                        {
                                            readonly
                                                ? column.render ? column.render(row[column.key], row) : row[column.key]?.toString()
                                                : (
                                                    <input
                                                        key={rowIndex * columns.length + columnIndex}
                                                        ref={(el) => {inputRefs.current[rowIndex * columns.length + columnIndex] = el}}
                                                        onKeyDown={(e) => handleKeyDown(rowIndex * columns.length + columnIndex, e)}
                                                        value={String(row[column.key] ?? "")}
                                                        onChange={event => handleInputChange(rowIndex, column.key, event)}/>
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
            <button disabled={!update} onClick={() => handleSave()}>保存</button>
</React.Fragment>
)
}
export default MdTable;