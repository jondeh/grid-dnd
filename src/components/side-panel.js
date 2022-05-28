import React from 'react'
import styled from 'styled-components'
import interact from 'interactjs'

const createColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
const ITEMS = [
  { color: createColor(), text: 'Text' },
  { color: createColor(), text: 'Number' },
  { color: createColor(), text: 'Multiselect' },
  { color: createColor(), text: 'Date/Time' },
  { color: createColor(), text: 'Data Lookup' }
]
const SidePanel = ({ handleColumnChange, handleRowChange, rows, columns }) => {
  const position = { x: 0, y: 0 }
  React.useEffect(() => {
    interact('.drag-item').draggable({
      //   inertia: true,
      restrict: {
        //   restriction: 'parent',
        // endOnly: true,
        elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,
      listeners: {
        start (event) {
          //   console.log(event.type, event.target)
        },
        move (event) {
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
        },
        end: function (event) {
          position.x = 0
          position.y = 0

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
          //   event.target.style.height = 'calc(100% - 2px)'
          //   event.target.style.width = 'calc(100% - 2px)'
          event.target.style.zIndex = '1'
        }
      }
    })
  }, [])
  return (
    <StyledPanel className='side-panel'>
      <h5>Columns </h5>
      <StyledInput
        value={columns}
        type='number'
        onChange={e => handleColumnChange(e.target.value)}
      />
      <h5>Rows </h5>
      <StyledInput
        value={rows}
        type='number'
        onChange={e => handleRowChange(e.target.value)}
      />

      <ul style={{ listStyle: 'none', padding: '0' }}>
        <li
          style={{
            width: '160px',
            height: '80px',
            border: '1px solid #d3d3d3'
          }}
        >
          {ITEMS.map((item, index) => {
            return (
              <StyledItem key={index} color={item.color} className='drag-item'>
                {item.text}
              </StyledItem>
            )
          })}
        </li>
      </ul>
    </StyledPanel>
  )
}

export const StyledItem = styled.div`
  min-width: calc(100% - 2px);
  min-height: calc(100% - 2px);
  height: 100%
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 18px solid ${p => p.color};
`

const StyledInput = styled.input`
  height: 50px;
  padding: 8px;
  font-size: 24px;
  width: 100%;
`

const StyledPanel = styled.div`
  right: 0;
  top: 0;
  padding: 10px;

  position: absolute;
  border-left: 1px solid #ccc;
  width: 200px;
  height: 100%;
  background-color: #f5f5f5;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  z-index: 5;
`

export default SidePanel
