"use client"

import { useState, useEffect } from "react"
import { getSocket } from "@/lib/socket"

export function useSocket() {
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socket = getSocket()

    const onConnect = () => {
      setIsConnected(true)
    }

    const onDisconnect = () => {
      setIsConnected(false)
    }

    socket.on("connect", onConnect)
    socket.on("disconnect", onDisconnect)

    // Set initial connection state
    setIsConnected(socket.isConnected())

    return () => {
      socket.off("connect", onConnect)
      socket.off("disconnect", onDisconnect)
    }
  }, [])

  const subscribe = (event: string, callback: (data: any) => void) => {
    const socket = getSocket()
    socket.on(event, callback)

    return () => {
      socket.off(event, callback)
    }
  }

  const emit = (event: string, data: any) => {
    const socket = getSocket()
    socket.emit(event, data)
  }

  return {
    isConnected,
    subscribe,
    emit,
  }
}
