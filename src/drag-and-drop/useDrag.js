import React from 'react'
import interact from 'interactjs'
import { DEFAULT_HEIGHT, DEFAULT_WIDTH, createColor } from '../dataStuff'
import { cloneDeep } from 'lodash'

const position = { x: 0, y: 0 }

function roundToNearest (num, x, y) {
  return Math.round(num / DEFAULT_HEIGHT) * DEFAULT_HEIGHT
}

export const useDrag = data => {
  let ref = React.useRef(null)
  React.useEffect(() => {
    if (!ref) return
    interact(ref?.current).draggable({
      restrict: {
        // elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
      },
      autoScroll: true,
      listeners: {
        start (event) {
          //   event.target.style.height =
          //     event.target.style.height || data.height + 'px'
          console.log(event.type)
        },
        move (event) {
          //   console.log('event: ', event)
          position.x += event.dx
          position.y += event.dy

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
        },
        end (event) {
          //   console.log('event: ', event)
          position.x = 0
          position.y = 0

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`
          event.target.style.zIndex = '1'
        }
      }
    })

    // interact('.drop-now').resizable({
    //   edges: { left: false, right: true, bottom: true, top: false },
    //   enabled: true,
    //   restrict: {
    //     restriction: 'parent'
    //   },
    //   listeners: {
    //     move: event => {
    //       const { left, right, width, top, bottom, height } = event?.deltaRect
    //       Object.assign(event.target.style, {
    //         width: roundToNearest(event.rect.width) + 'px',
    //         height: roundToNearest(event.rect.height) + 'px'
    //       })
    //     }
    //   }
    // })
  }, [])
  return [ref]
}

export const useDrop = data => {
  let ref = React.useRef(null)
  React.useEffect(() => {
    if (!ref) return
    const dropGrid = interact(ref?.current)
    dropGrid.dropzone({
      ondrop: function (event) {
        const gridSize = dropGrid.events.getRect()
        const draggableSize = event.relatedTarget.getBoundingClientRect()

        const newThing = event.relatedTarget.cloneNode(true)
        const newElement = cloneDeep(event.interaction.interactable)
        console.log('newElement: ', newElement)
        // newElement.target = newThing
        newElement.target.classList.add('drop-now')
        newElement.target.style.zIndex = '10'
        newElement.target.style.position = 'absolute'
        newElement.target.style.left = `${roundToNearest(
          draggableSize.x - gridSize.left
        )}px`
        newElement.target.style.top = `${roundToNearest(
          draggableSize.y - gridSize.top
        )}px`
        newElement.target.style.width =
          newElement.target.style.width || `${DEFAULT_WIDTH * 4}px`
        newElement.target.style.height =
          newElement.target.style.height || `${DEFAULT_HEIGHT * 2}px`
        newElement.target.style.transform = 'none'
        // event.target.appendChild(newElement.target)
        newElement.target.style.position = 'absolute'
        // console.log('newElement: ', newElement)
        event.target.appendChild(newElement.target)
      },
      // modifiers: [
      //   interact.modifiers.snap({
      //     targets: [
      //       interact.createSnapGrid({ x: DEFAULT_WIDTH, y: DEFAULT_HEIGHT })
      //     ]
      //   })
      // ],
      overlap: 'center'
    })
  }, [])
  return [ref]
}

const Drag = () => {
  const [ref] = useDrag()
  return <div ref={ref}>Drag me</div>
}
