import React, { useEffect } from 'react'
import {
  StyledGrid,
  StyledCell,
  StyledDropZone,
  StyledFillMenu
} from '../styles/grid-styles'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, createColor } from '../dataStuff'
import { useDrop } from '../drag-and-drop/useDrag'

import interact from 'interactjs'

const Grid = ({
  rows,
  columns,
  defaultHeight,
  defaultWidth,
  handleColumnChange,
  handleRowChange
}) => {
  const [ref] = useDrop({})
  const [height, setHeight] = React.useState(
    [...new Array(rows)].map(() => defaultHeight)
  )
  const [width, setWidth] = React.useState(
    [...new Array(columns)].map(() => defaultWidth)
  )

  const handleHeight = (newHeight, i) => {
    setHeight(prev => {
      let newArray = [...prev]
      newArray[i] = newHeight
      return newArray
    })
  }

  const handleWidth = (newWidth, j) => {
    setWidth(prev => {
      let newArray = [...prev]
      newArray[j] = newWidth
      return newArray
    })
  }

  return (
    <StyledGrid ref={ref} rows={rows} columns={columns} className='grid'>
      {[...new Array(rows)].map((e, i) => {
        return [...new Array(columns)].map((f, j) => {
          return (
            <Cell
              defaultHeight={defaultHeight}
              defaultWidth={defaultWidth}
              handleHeight={handleHeight}
              handleWidth={handleWidth}
              height={height[i] || defaultHeight}
              width={width[j] || defaultWidth}
              i={i}
              j={j}
              key={i + '' + j}
            >
              {}
            </Cell>
          )
        })
      })}
    </StyledGrid>
  )
}

const Cell = ({
  defaultHeight,
  defaultWidth,
  height,
  width,
  handleHeight,
  handleWidth,
  i,
  j
}) => {
  let cellRef = React.useRef(null)

  // React.useEffect(() => {
  //   interact(cellRef.current).resizable({
  //     //   edges: { left: false, right: true, bottom: true, top: false },
  //     edges: { left: false, right: true, bottom: true, top: false },
  //     invert: 'reposition',
  //     inertia: true,
  //     listeners: {
  //       move: function (event) {
  //         handleWidth(event.rect.width, j)
  //         handleHeight(event.rect.height, i)
  //       }
  //     },
  //     modifiers: [
  //       interact.modifiers.restrictSize({
  //         min: { width: defaultWidth, height: defaultHeight },
  //         max: { width: Infinity, height: Infinity }
  //       })
  //     ]
  //   })

  // interact(cellRef?.current)
  //   .dropzone({
  //     ondrop: function (event) {
  //       console.log('ding')
  //       if (i === 0 && j === 0) {
  //         if (event.target.children?.length > 2) {
  //           event.target.removeChild(event.target.children[2])
  //         }
  //       }
  //       if (i === 0 || j === 0) {
  //         if (event.target.children?.length > 1) {
  //           event.target.removeChild(event.target.children[1])
  //         }
  //       }

  //       event.target.firstChild &&
  //         i !== 0 &&
  //         j !== 0 &&
  //         event.target.removeChild(event.target.firstChild)

  //       if (
  //         event.relatedTarget?.parentElement?.tagName?.toLowerCase() !== 'li'
  //       ) {
  //         event.target.appendChild(event.relatedTarget)
  //         event.target.classList.remove('drop-target')
  //         cellRef = null
  //         return
  //       }

  //       let newElement = event.relatedTarget.cloneNode(true)
  //       cellRef = null
  //       newElement.style.transform = 'none'

  //       //   event.target.parentElement.removeChild(event.target)
  //       event.target.appendChild(newElement)
  //       event.target.classList.remove('drop-target')
  //     },
  //     overlap: 'center'
  //   })
  //   .on('dragenter', event => {
  //     event.target.classList.add('drop-target')
  //   })
  //   .on('dragleave', event => {
  //     event.target.classList.remove('drop-target')
  //   })
  //   .on('drop', event => {
  //     event.target.classList.remove('drop-target')
  //   })
  // }, [height, width, handleHeight, handleWidth, i, j])

  return (
    <StyledCell
      ref={cellRef}
      height={height}
      width={width}
      className={`cell column-${j} row-${i}`}
    ></StyledCell>
  )
}

export default Grid
