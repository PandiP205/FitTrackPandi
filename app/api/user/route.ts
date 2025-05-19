import { NextResponse } from "next/server"

// Mock user data
const userData = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  age: 28,
  gender: "male",
  height: 175,
  weight: 74.5,
  fitnessGoal: "lose-weight",
  targetWeight: 70,
  weeklyGoal: 0.5,
  activityLevel: "moderate",
  dietType: "balanced",
  calorieGoal: 2000,
  proteinPercentage: 30,
  carbPercentage: 40,
  fatPercentage: 30,
  settings: {
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    dataSharing: true,
    units: "metric",
  },
}

export async function GET() {
  try {
    // In a real app, you would get the userId from the authenticated session
    // and fetch the user data from the database

    return NextResponse.json({ success: true, data: userData })
  } catch (error) {
    console.error("Error fetching user data:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch user data" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json()

    // In a real app, you would validate the updates and save them to the database
    // Here we're just returning the mock data with the updates

    const updatedUser = { ...userData, ...updates }

    return NextResponse.json({ success: true, data: updatedUser })
  } catch (error) {
    console.error("Error updating user data:", error)
    return NextResponse.json({ success: false, message: "Failed to update user data" }, { status: 500 })
  }
}
