
import MdTable from "./components/MdTable.tsx";

import './App.css'

const users = [
    { id: 1, name: "Alice", age: 25 },
    { id: 2, name: "Bob", age: 30 },
    { id: 3, name: "Charlie", age: 22 },
]

function App() {

  return (
    <>
        <MdTable data={users} columns={[
            { key: "id", header: "ID" },
            { key: "name", header: "Name" },
            { key: "age", header: "Age" }
        ]}></MdTable>
    </>
  )
}

export default App
