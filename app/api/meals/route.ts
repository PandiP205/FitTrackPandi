import { NextResponse } from "next/server"

// Mock database for meals
let meals = [
  {
    id: 1,
    userId: 1,
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    quantity: 1,
    mealType: "Lunch",
    time: "12:30 PM",
    date: "2023-05-19",
  },
  {
    id: 2,
    userId: 1,
    name: "Brown Rice",
    calories: 112,
    protein: 2.6,
    carbs: 23.5,
    fat: 0.9,
    quantity: 1,
    mealType: "Lunch",
    time: "12:30 PM",
    date: "2023-05-19",
  },
]

export async function GET(request: Request) {
  try {
    // In a real app, you would get the userId from the authenticated session
    const userId = 1
    const url = new URL(request.url)
    const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0]

    const userMeals = meals.filter((meal) => meal.userId === userId && meal.date === date)

    return NextResponse.json({ success: true, data: userMeals })
  } catch (error) {
    console.error("Error fetching meals:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch meals" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { name, calories, protein, carbs, fat, quantity, mealType } = await request.json()

    // In a real app, you would get the userId from the authenticated session
    const userId = 1
    const date = new Date().toISOString().split("T")[0]
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    const newMeal = {
      id: meals.length + 1,
      userId,
      name,
      calories,
      protein,
      carbs,
      fat,
      quantity,
      mealType,
      time,
      date,
    }

    meals.push(newMeal)

    return NextResponse.json({ success: true, data: newMeal })
  } catch (error) {
    console.error("Error adding meal:", error)
    return NextResponse.json({ success: false, message: "Failed to add meal" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url)
    const id = Number(url.searchParams.get("id"))

    if (!id) {
      return NextResponse.json({ success: false, message: "Meal ID is required" }, { status: 400 })
    }

    // In a real app, you would check if the meal belongs to the authenticated user
    const mealIndex = meals.findIndex((meal) => meal.id === id)

    if (mealIndex === -1) {
      return NextResponse.json({ success: false, message: "Meal not found" }, { status: 404 })
    }

    meals = meals.filter((meal) => meal.id !== id)

    return NextResponse.json({ success: true, message: "Meal deleted successfully" })
  } catch (error) {
    console.error("Error deleting meal:", error)
    return NextResponse.json({ success: false, message: "Failed to delete meal" }, { status: 500 })
  }
}
