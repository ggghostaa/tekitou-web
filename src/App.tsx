
import MdTable from "./components/MdTable.tsx";

import './App.css'

const users = [
    { a: "どくせん", b: "独占", c: "◎", d: "独占，垄断"},
    { a: "せいそう", b: "盛装", c: "◎", d: "盛装"},
    { a: "こっとう", b: "照会", c: "◎", d: "询问，查询"},
    { a: "どくせん", b: "骨董", c: "◎", d: "古董"},
]

function App() {

  return (
    <>
        <MdTable initialData={users} columns={[
            { key: "a", header: "ID" },
            { key: "b", header: "Name" },
            { key: "c", header: "Age" },
            { key: "d", header: "Age" }
        ]} showHeader={false} readonly={false}></MdTable>
    </>
  )
}

export default App
