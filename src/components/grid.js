import React, { useEffect } from 'react'
import {
  StyledGrid,
  StyledCell,
  StyledDropZone,
  StyledFillMenu
} from '../styles/grid-styles'
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io'

import interact from 'interactjs'

const DEFAULT_HEIGHT = 80
const DEFAULT_WIDTH = 160

const Grid = ({ rows, columns }) => {
  const [height, setHeight] = React.useState(
    [...new Array(rows)].map(() => DEFAULT_HEIGHT)
  )
  const [width, setWidth] = React.useState(
    [...new Array(columns)].map(() => DEFAULT_WIDTH)
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
    <StyledGrid rows={rows} columns={columns} className='grid'>
      {[...new Array(rows)].map((e, i) => {
        return [...new Array(columns)].map((f, j) => {
          return (
            <Cell
              handleHeight={handleHeight}
              handleWidth={handleWidth}
              height={height[i] || DEFAULT_HEIGHT}
              width={width[j] || DEFAULT_WIDTH}
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

const Cell = ({ height, width, handleHeight, handleWidth, i, j }) => {
  let cellRef = React.useRef(null)

  React.useEffect(() => {
    interact(cellRef.current).resizable({
      //   edges: { left: false, right: true, bottom: true, top: false },
      edges: { left: false, right: true, bottom: true, top: false },
      invert: 'reposition',
      inertia: true,
      listeners: {
        move: function (event) {
          handleWidth(event.rect.width, j)
          handleHeight(event.rect.height, i)
        }
      },
      modifiers: [
        interact.modifiers.restrictSize({
          min: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
          max: { width: Infinity, height: Infinity }
        })
      ]
    })

    interact(cellRef?.current)
      .dropzone({
        ondrop: function (event) {
          console.log('ding')
          if (i === 0 && j === 0) {
            if (event.target.children?.length > 2) {
              event.target.removeChild(event.target.children[2])
            }
          }
          if (i === 0 || j === 0) {
            if (event.target.children?.length > 1) {
              event.target.removeChild(event.target.children[1])
            }
          }

          event.target.firstChild &&
            i !== 0 &&
            j !== 0 &&
            event.target.removeChild(event.target.firstChild)

          if (
            event.relatedTarget?.parentElement?.tagName?.toLowerCase() !== 'li'
          ) {
            event.target.appendChild(event.relatedTarget)
            event.target.classList.remove('drop-target')
            cellRef = null
            return
          }

          let newElement = event.relatedTarget.cloneNode(true)
          cellRef = null
          newElement.style.transform = 'none'

          //   event.target.parentElement.removeChild(event.target)
          event.target.appendChild(newElement)
          event.target.classList.remove('drop-target')
        },
        overlap: 'center'
      })
      .on('dragenter', event => {
        event.target.classList.add('drop-target')
      })
      .on('dragleave', event => {
        event.target.classList.remove('drop-target')
      })
      .on('drop', event => {
        event.target.classList.remove('drop-target')
      })
  }, [height, width, handleHeight, handleWidth, i, j])

  return (
    <StyledCell
      ref={cellRef}
      height={height}
      width={width}
      className={`cell column-${j} row-${i}`}
    >
      {i === 0 && (
        <ColumnRowDropzone
          i={i}
          j={j}
          className='grid-dropzone'
          column
          height={height}
          width={width}
        >
          ^
        </ColumnRowDropzone>
      )}
      {j === 0 && (
        <ColumnRowDropzone
          i={i}
          j={j}
          className='grid-dropzone'
          row
          height={height}
          width={width}
        >
          <span>{'>'}</span>
        </ColumnRowDropzone>
      )}

      {/* {(i === 0 || j === 0) && <div>{i + ':' + j}</div>} */}
    </StyledCell>
  )
}

const ColumnRowDropzone = ({ row, column, height, width, i, j }) => {
  const ref = React.useRef(null)
  const [showMenu, setShowMenu] = React.useState(false)
  useEffect(() => {
    interact(ref.current)
      .dropzone({
        ondrop: function (event) {
          if (ref.rendered) return
          appendRowOrColumn(
            row ? i : j,
            event.relatedTarget,
            row ? 'row' : 'column',
            row ? j : i
          )
          ref.rendered = true
        },
        overlap: 0.01
      })
      .on('dragenter', event => {
        setShowMenu(true)
        event.target.classList.add('drop-target')
      })
      .on('dragleave', event => {
        setShowMenu(false)
        event.target.classList.remove('drop-target')
      })
      .on('drop', event => {
        event.target.classList.remove('drop-target')
      })
      .on('dropactivate', function (event) {
        event.target.style.display = 'flex'
        event.relatedTarget.style.zIndex = '1'
      })
      .on('dropdeactivate', function (event) {
        event.target.style.display = 'none'
      })
  }, [])

  return (
    <StyledDropZone
      ref={ref}
      rowIndex={i}
      colIndex={j}
      className='grid-dropzone'
      column={column}
      row={row}
      height={height}
      width={width}
    >
      {column ? (
        <IoIosArrowDown color={'#ccc'} size={20} />
      ) : (
        <IoIosArrowForward color={'#ccc'} size={20} />
      )}
      {/* {showMenu && <ReplaceFillMenu />} */}
    </StyledDropZone>
  )
}

const ReplaceFillMenu = () => {
  return (
    <StyledFillMenu>
      <ul>
        <li>Replace</li>
        <li>Fill</li>
      </ul>
    </StyledFillMenu>
  )
}

const appendRowOrColumn = (x, relatedTarget, rowOrColumn, y) => {
  console.log(' ')
  console.log(' ')
  console.log(' ')
  console.log(' ')
  //   console.log('x: ', x, 'y: ', y)
  const thisRowOrColumn = document.getElementsByClassName(`${rowOrColumn}-${x}`)
  for (let i = 0; i < thisRowOrColumn.length; i++) {
    // if (i === 0) {
    //   //   if (x === 0) {
    //   //     console.log('1 :', thisRowOrColumn[i].children)
    //   //     if (thisRowOrColumn[i].children.length > 2) {
    //   //       console.log('2 :', thisRowOrColumn[i].children)
    //   //     }
    //   //   }
    //   console.log('ONE: ', 'x: ', x, 'y: ', y)
    // //   if (thisRowOrColumn[i].children.length > (x === 0 ? 2 : 1)) continue
    //   if (thisRowOrColumn[i].children.length > (x === 0 ? 2 : 1)) continue
    //   console.log('TWO: ', 'x: ', x, 'y: ', y)
    // }
    //   if (thisRowOrColumn[i].children.length > (x === 0 ? 2 : 1)) continue

    // if (thisRowOrColumn[i].children.length > (i === 0 ? (x === 0 ? 2 : 1) : 1))
    //   continue

    // if (x === 0 && i === 0) continue

    // if (
    //   thisRowOrColumn[i].children.length >
    //   (i === 0 && x === 0 ? 2 : i === 0 && x !== 0 ? 1 : 0)
    // ) {
    //   console.log(
    //     'i: ',
    //     i,
    //     x,
    //     thisRowOrColumn.length,
    //     thisRowOrColumn[i].children.length
    //   )
    //   console.log('continue')
    //   continue
    // }

    console.log('i', i, 'x:', x, thisRowOrColumn[i])

    if (i === 0 && x === 0) {
      console.log('zero', thisRowOrColumn[i].children.length)
      if (thisRowOrColumn[i].children.length > 2) {
        console.log('continue0')
        continue
      }
    }

    if (i === 0 && x !== 0) {
      console.log('one', thisRowOrColumn[i].children.length)
      if (thisRowOrColumn[i].children.length > 1) {
        console.log('continue1')
        continue
      }
    }

    if (i !== 0 && x === 0) {
      console.log('two', thisRowOrColumn[i].children.length)
      if (thisRowOrColumn[i].children.length > 1) {
        console.log('continue2')
        continue
      }
    }

    if (i !== 0 && x !== 0) {
      console.log('three', thisRowOrColumn[i].children.length)
      if (thisRowOrColumn[i].children.length > 0) {
        console.log('continue3')
        continue
      }
    }

    console.log('made it')

    let newElement = relatedTarget.cloneNode(true)
    newElement.style.transform = 'none'
    thisRowOrColumn[i].appendChild(newElement)
  }
}

export default Grid
