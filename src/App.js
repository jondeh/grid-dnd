import './App.css'
import Grid from './components/grid'
import SidePanel from './components/side-panel'
import React from 'react'
import {
  DEFAULT_HEIGHT,
  DEFAULT_WIDTH,
  DEFAULT_ROWS,
  DEFAULT_COLUMNS
} from './dataStuff'
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
        defaultHeight={DEFAULT_HEIGHT}
        defaultWidth={DEFAULT_WIDTH}
        rows={rows}
        columns={columns}
        handleColumnChange={handleColumnChange}
        handleRowChange={handleRowChange}
      />
      <Grid
        defaultHeight={DEFAULT_HEIGHT}
        defaultWidth={DEFAULT_WIDTH}
        rows={rows}
        columns={columns}
      />
    </div>
  )
}

export default App
