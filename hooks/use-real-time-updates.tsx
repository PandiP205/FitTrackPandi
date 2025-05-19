"use client"

import { useState, useEffect } from "react"
import { useSocket } from "./use-socket"

export function useRealTimeUpdates<T>(
  initialData: T[],
  eventPrefix: string,
): {
  data: T[]
  addItem: (item: T) => void
  removeItem: (id: number) => void
  updateItem: (id: number, updates: Partial<T>) => void
} {
  const [data, setData] = useState<T[]>(initialData)
  const { subscribe, emit } = useSocket()

  useEffect(() => {
    // Subscribe to real-time updates
    const unsubscribeAdd = subscribe(`${eventPrefix}:add`, (newItem: T) => {
      setData((prev) => [...prev, newItem])
    })

    const unsubscribeRemove = subscribe(`${eventPrefix}:remove`, (id: number) => {
      setData((prev) => prev.filter((item: any) => item.id !== id))
    })

    const unsubscribeUpdate = subscribe(
      `${eventPrefix}:update`,
      ({ id, updates }: { id: number; updates: Partial<T> }) => {
        setData((prev) => prev.map((item: any) => (item.id === id ? { ...item, ...updates } : item)))
      },
    )

    return () => {
      unsubscribeAdd()
      unsubscribeRemove()
      unsubscribeUpdate()
    }
  }, [eventPrefix, subscribe])

  const addItem = (item: T) => {
    // In a real app, you would call an API to add the item
    // and the socket server would broadcast the update
    emit(`${eventPrefix}:add`, item)
    setData((prev) => [...prev, item])
  }

  const removeItem = (id: number) => {
    // In a real app, you would call an API to remove the item
    // and the socket server would broadcast the update
    emit(`${eventPrefix}:remove`, id)
    setData((prev) => prev.filter((item: any) => item.id !== id))
  }

  const updateItem = (id: number, updates: Partial<T>) => {
    // In a real app, you would call an API to update the item
    // and the socket server would broadcast the update
    emit(`${eventPrefix}:update`, { id, updates })
    setData((prev) => prev.map((item: any) => (item.id === id ? { ...item, ...updates } : item)))
  }

  return { data, addItem, removeItem, updateItem }
}
