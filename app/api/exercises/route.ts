import { NextResponse } from "next/server"

// Mock database for exercises
let exercises = [
  {
    id: 1,
    userId: 1,
    name: "Running",
    category: "Cardio",
    quantity: 30,
    unit: "minutes",
    caloriesBurned: 300,
    time: "07:30 AM",
    date: "2023-05-19",
  },
  {
    id: 2,
    userId: 1,
    name: "Push-ups",
    category: "Strength",
    quantity: 20,
    unit: "reps",
    caloriesBurned: 10,
    time: "08:00 AM",
    date: "2023-05-19",
  },
]

export async function GET(request: Request) {
  try {
    // In a real app, you would get the userId from the authenticated session
    const userId = 1
    const url = new URL(request.url)
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0]

    const userExercises = exercises.filter((exercise) => exercise.userId === userId && exercise.date === date)

    return NextResponse.json({ success: true, data: userExercises })
  } catch (error) {
    console.error("Error fetching exercises:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch exercises" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, category, quantity, unit, caloriesBurned } = await request.json()

    // In a real app, you would get the userId from the authenticated session
    const userId = 1
    const date = new Date().toISOString().split("T")[0]
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const newExercise = {
      id: exercises.length + 1,
      userId,
      name,
      category,
      quantity,
      unit,
      caloriesBurned,
      time,
      date,
    }

    exercises.push(newExercise)

    return NextResponse.json({ success: true, data: newExercise })
  } catch (error) {
    console.error("Error adding exercise:", error)
    return NextResponse.json({ success: false, message: "Failed to add exercise" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = Number(url.searchParams.get("id"))

    if (!id) {
      return NextResponse.json({ success: false, message: "Exercise ID is required" }, { status: 400 })
    }

    // In a real app, you would check if the exercise belongs to the authenticated user
    const exerciseIndex = exercises.findIndex((exercise) => exercise.id === id)

    if (exerciseIndex === -1) {
      return NextResponse.json({ success: false, message: "Exercise not found" }, { status: 404 })
    }

    exercises = exercises.filter((exercise) => exercise.id !== id)

    return NextResponse.json({ success: true, message: "Exercise deleted successfully" })
  } catch (error) {
    console.error("Error deleting exercise:", error)
    return NextResponse.json({ success: false, message: "Failed to delete exercise" }, { status: 500 })
  }
}
