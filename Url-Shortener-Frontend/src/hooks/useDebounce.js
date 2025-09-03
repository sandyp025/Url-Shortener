import { useState, useEffect } from 'react'

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export function useThrottledCallback(callback, delay) {
  const [throttledCallback, setThrottledCallback] = useState(() => callback)
  const [lastRun, setLastRun] = useState(Date.now())

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRun >= delay) {
        setThrottledCallback(() => callback)
        setLastRun(Date.now())
      }
    }, delay - (Date.now() - lastRun))

    return () => {
      clearTimeout(handler)
    }
  }, [callback, delay, lastRun])

  return throttledCallback
}