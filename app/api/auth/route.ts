import { NextResponse } from "next/server"

// This is a mock authentication API
// In a real application, you would use a proper authentication system
// with password hashing, JWT tokens, etc.

// Mock user database
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "Password123", // In a real app, this would be hashed
  },
]

export async function POST(request: Request) {
  try {
    const { action, email, password, name } = await request.json()

    // Handle login
    if (action === "login") {
      const user = users.find((u) => u.email === email)

      if (!user || user.password !== password) {
        return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
      }

      // In a real app, you would generate a JWT token here
      return NextResponse.json({
        success: true,
        user: { id: user.id, name: user.name, email: user.email },
        token: "mock-jwt-token",
      })
    }

    // Handle signup
    if (action === "signup") {
      // Check if user already exists
      const existingUser = users.find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json({ success: false, message: "Email already in use" }, { status: 400 })
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        name,
        email,
        password,
      }

      users.push(newUser)

      // In a real app, you would generate a JWT token here
      return NextResponse.json({
        success: true,
        user: { id: newUser.id, name: newUser.name, email: newUser.email },
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json({ success: false, message: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 })
  }
}
