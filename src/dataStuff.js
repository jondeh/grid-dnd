export const DEFAULT_ROWS = 10
export const DEFAULT_COLUMNS = 20

export const DEFAULT_HEIGHT = 50
export const DEFAULT_WIDTH = DEFAULT_HEIGHT

export const createColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export const ITEMS = [
  {
    color: createColor(),
    height: DEFAULT_HEIGHT * 2,
    width: DEFAULT_WIDTH * 4,
    text: 'Text'
  },
  {
    color: createColor(),
    height: DEFAULT_HEIGHT * 2,
    width: DEFAULT_WIDTH * 4,
    text: 'Number'
  },
  {
    color: createColor(),
    height: DEFAULT_HEIGHT * 4,
    width: DEFAULT_WIDTH * 4,
    text: 'Multiselect'
  },
  {
    color: createColor(),
    height: DEFAULT_HEIGHT * 2,
    width: DEFAULT_WIDTH * 4,
    text: 'Date/Time'
  },
  {
    color: createColor(),
    height: DEFAULT_HEIGHT * 2,
    width: DEFAULT_WIDTH * 4,
    text: 'Data Lookup'
  }
]
