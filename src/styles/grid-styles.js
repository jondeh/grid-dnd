import styled, { keyframes } from 'styled-components'

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(${p => p.columns}, auto);
  grid-template-rows: repeat(${p => p.rows}, auto);
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100%;
  z-index: 1;
`
export const StyledCell = styled.div`
  position: relative;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  padding: 4px;
  width: ${p => p.width}px;
  height: ${p => p.height}px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const columnDropZoneAnimation = keyframes`
0% { top: -52px; opacity: 0; }  
100% { top: -72px; opacity: 1;}
`

const rowDropZoneAnimation = keyframes`
0% { left: -52px; opacity: 0;}
100% { left: -72px; opacity: 1;}
`

export const StyledDropZone = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: ${p => (p.column ? '-72px' : '50%')};
  left: ${p => (p.column ? '50%' : '-72px')};
  height: ${p => p.height / 2}px;
  width: ${p => p.width / 2}px;
  height: 50px;
  width: 50px;
  border: 2px solid #ccc;
  border-radius: 50%;
  transform: translate(${p => (p.column ? '-50%' : '0, -50%')});
  display: none;
  animation: ${p => (p.column ? columnDropZoneAnimation : rowDropZoneAnimation)}
    300ms ease-in-out;
`

export const StyledFillMenu = styled.div`
  position: absolute;
  top: -50px;
  left: -50px;
  border: 4px dotted orange;
`
