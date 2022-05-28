import './App.css'
import Grid from './components/grid'
import SidePanel from './components/side-panel'
import React from 'react'

const DEFAULT_ROWS = 3
const DEFAULT_COLUMNS = 4

function App () {
  const [rows, setRows] = React.useState(DEFAULT_ROWS)
  const [columns, setColumns] = React.useState(DEFAULT_COLUMNS)

  const handleColumnChange = num => {
    if (num <= 1) return
    setColumns(+num)
  }
  const handleRowChange = num => {
    if (num <= 1) return
    setRows(+num)
  }

  return (
    <div className='App'>
      <SidePanel
        rows={rows}
        columns={columns}
        handleColumnChange={handleColumnChange}
        handleRowChange={handleRowChange}
      />
      <Grid rows={rows} columns={columns} />
    </div>
  )
}

export default App
