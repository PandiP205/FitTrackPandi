// This is a mock implementation of a real-time socket connection
// In a real application, you would use Socket.io or a similar library

class MockSocket {
  private listeners: Record<string, Array<(data: any) => void>> = {}
  private connected = false

  constructor() {
    this.connect()
  }

  connect() {
    setTimeout(() => {
      this.connected = true
      this.emit("connect", {})
      console.log("Socket connected")
    }, 500)
  }

  disconnect() {
    this.connected = false
    this.emit("disconnect", {})
    console.log("Socket disconnected")
  }

  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
    return this
  }

  off(event: string, callback?: (data: any) => void) {
    if (!callback) {
      delete this.listeners[event]
    } else if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter((cb) => cb !== callback)
    }
    return this
  }

  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data))
    }
    return this
  }

  // Mock method to simulate receiving data from the server
  mockReceive(event: string, data: any) {
    setTimeout(() => {
      if (this.connected) {
        this.emit(event, data)
      }
    }, 100)
  }

  isConnected() {
    return this.connected
  }
}

// Singleton instance
let socket: MockSocket | null = null

export const getSocket = () => {
  if (!socket) {
    socket = new MockSocket()
  }
  return socket
}
