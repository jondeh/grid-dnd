import React from 'react'
import styled from 'styled-components'
import interact from 'interactjs'
import { ITEMS, DEFAULT_WIDTH, DEFAULT_HEIGHT } from '../dataStuff'
import { useDrag } from '../drag-and-drop/useDrag'

const SidePanel = ({ handleColumnChange, handleRowChange, rows, columns }) => {
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
        {ITEMS.map((item, index) => {
          return (
            <StyledLi
              key={index + item.text}
              style={{
                border: '1px solid grey',
                height: item.height + 'px',
                width: item.width + 'px'
              }}
            >
              <DragItem
                item={item}
                key={index}
                index={index}
                color={item.color}
                className='drag-item'
              >
                {item.text}
              </DragItem>
            </StyledLi>
          )
        })}
      </ul>
    </StyledPanel>
  )
}

const DragItem = ({ item, index }) => {
  const [ref] = useDrag(item)
  // console.log(ref)
  return (
    <StyledItem ref={ref} key={index} color={item?.color} className='drag-item'>
      {item.text}
    </StyledItem>
  )
}

const StyledLi = styled.li`
  > * {
    height: 100%;
  }
`

export const StyledItem = styled.div`
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
