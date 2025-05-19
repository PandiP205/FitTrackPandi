"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts"
import { Download, ArrowRight, Flame, Apple, Dumbbell } from "lucide-react"

export default function DailySummary() {
  const [userData, setUserData] = useState<any>(null)
  const [loggedMeals, setLoggedMeals] = useState<any[]>([])
  const [loggedExercises, setLoggedExercises] = useState<any[]>([])
  const [weeklyData, setWeeklyData] = useState<any[]>([])

  useEffect(() => {
    // Load user data
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    // Load meals
    const storedMeals = localStorage.getItem("loggedMeals")
    if (storedMeals) {
      setLoggedMeals(JSON.parse(storedMeals))
    }

    // Load exercises
    const storedExercises = localStorage.getItem("loggedExercises")
    if (storedExercises) {
      setLoggedExercises(JSON.parse(storedExercises))
    }

    // Generate empty weekly data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const emptyData = days.map((day) => ({
      day,
      caloriesConsumed: 0,
      caloriesBurned: 0,
      weight: userData?.weight || 0,
    }))
    setWeeklyData(emptyData)
  }, [])

  // Calculate daily stats
  const calculateDailyStats = () => {
    // Calculate calories consumed
    const totalCaloriesConsumed = loggedMeals.reduce((sum, meal) => sum + meal.calories, 0)

    // Calculate calories burned
    const totalCaloriesBurned = loggedExercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0)

    // Calculate macros
    const totalProtein = loggedMeals.reduce((sum, meal) => sum + meal.protein, 0)
    const totalCarbs = loggedMeals.reduce((sum, meal) => sum + meal.carbs, 0)
    const totalFat = loggedMeals.reduce((sum, meal) => sum + meal.fat, 0)

    return {
      calories: {
        consumed: totalCaloriesConsumed,
        burned: totalCaloriesBurned,
        goal: 2000, // Default goal
      },
      macros: {
        protein: Math.round(totalProtein),
        carbs: Math.round(totalCarbs),
        fat: Math.round(totalFat),
      },
    }
  }

  const dailyData = calculateDailyStats()

  // Calculate calorie balance
  const calorieBalance = dailyData.calories.goal - dailyData.calories.consumed + dailyData.calories.burned

  // Calculate macronutrient percentages
  const totalCaloriesFromMacros =
    dailyData.macros.protein * 4 + dailyData.macros.carbs * 4 + dailyData.macros.fat * 9 || 1 // Avoid division by zero

  const macroPercentages = [
    { name: "Protein", value: Math.round(((dailyData.macros.protein * 4) / totalCaloriesFromMacros) * 100) || 0 },
    { name: "Carbs", value: Math.round(((dailyData.macros.carbs * 4) / totalCaloriesFromMacros) * 100) || 0 },
    { name: "Fat", value: Math.round(((dailyData.macros.fat * 9) / totalCaloriesFromMacros) * 100) || 0 },
  ]

  // Colors for the pie chart
  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"]

  // Calculate goal achievement grade
  const getGrade = () => {
    if (dailyData.calories.consumed === 0 && dailyData.calories.burned === 0) {
      return { grade: "N/A", description: "No data available yet. Start logging your meals and exercises!" }
    }

    const proteinGoal = 140
    const burnGoal = 500

    const score =
      ((dailyData.macros.protein / proteinGoal) * 0.3 +
        (dailyData.calories.burned / burnGoal) * 0.3 +
        (calorieBalance > 0 ? 1 : calorieBalance / -500) * 0.4) *
      100

    if (score >= 90) return { grade: "A", description: "Excellent! You're crushing your goals." }
    if (score >= 80) return { grade: "B", description: "Great job! Keep up the good work." }
    if (score >= 70) return { grade: "C", description: "Good effort. Room for improvement." }
    if (score >= 60) return { grade: "D", description: "You're making progress, but try harder tomorrow." }
    return { grade: "F", description: "You're far from your goals. Let's refocus." }
  }

  const gradeInfo = getGrade()

  // Generate suggestions based on the data
  const generateSuggestions = () => {
    if (dailyData.calories.consumed === 0 && dailyData.calories.burned === 0) {
      return [
        "Start by logging your meals to track your calorie and nutrient intake.",
        "Add your exercises to monitor your activity level and calories burned.",
        "Complete your profile in settings to get personalized recommendations.",
      ]
    }

    const suggestions = []

    if (dailyData.macros.protein < 100) {
      suggestions.push(
        "Try to increase your protein intake. Consider adding lean meats, eggs, or protein shakes to your diet.",
      )
    }

    if (dailyData.calories.burned < 300) {
      suggestions.push(
        "Your activity level is a bit low today. Try to incorporate more movement or a short workout tomorrow.",
      )
    }

    if (dailyData.calories.consumed > dailyData.calories.goal) {
      suggestions.push(
        "You've exceeded your calorie goal. Consider adjusting your portions or choosing lower-calorie options tomorrow.",
      )
    }

    if (suggestions.length === 0) {
      suggestions.push("You're doing great! Keep maintaining your current habits for continued success.")
    }

    return suggestions
  }

  const noDataDisplay = (
    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed text-slate-500 dark:text-slate-400">
      <p className="text-center">No data available yet. Start logging your meals and exercises!</p>
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Daily Summary</h1>
          <p className="text-slate-600 dark:text-slate-400">Your health and fitness overview for today</p>
        </div>
        <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
          <Download className="mr-2 h-4 w-4" /> Download Report
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Calorie Intake</CardTitle>
              <Apple className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyData.calories.consumed}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{dailyData.calories.goal} daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${Math.min(100, (dailyData.calories.consumed / dailyData.calories.goal) * 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Calories Burned</CardTitle>
              <Flame className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyData.calories.burned}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">500 daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-orange-500"
                  style={{ width: `${Math.min(100, (dailyData.calories.burned / 500) * 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
              <Dumbbell className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dailyData.macros.protein}g</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">140g daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${Math.min(100, (dailyData.macros.protein / 140) * 100)}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent>
              <div className="text-2xl font-bold">{gradeInfo.grade}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Based on today's activity</p>
              <div className="mt-3 flex items-center">
                <span className="text-xs font-medium">F</span>
                <div className="mx-2 h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div
                    className={`h-2 rounded-full ${
                      gradeInfo.grade === "A"
                        ? "bg-green-500"
                        : gradeInfo.grade === "B"
                          ? "bg-blue-500"
                          : gradeInfo.grade === "C"
                            ? "bg-yellow-500"
                            : gradeInfo.grade === "D"
                              ? "bg-orange-500"
                              : gradeInfo.grade === "N/A"
                                ? "bg-slate-300"
                                : "bg-red-500"
                    }`}
                    style={{
                      width: `${
                        gradeInfo.grade === "A"
                          ? 100
                          : gradeInfo.grade === "B"
                            ? 80
                            : gradeInfo.grade === "C"
                              ? 60
                              : gradeInfo.grade === "D"
                                ? 40
                                : gradeInfo.grade === "N/A"
                                  ? 0
                                  : 20
                      }%`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium">A</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Calorie Balance</CardTitle>
              <CardDescription>Your calorie intake vs. expenditure</CardDescription>
            </CardHeader>
            <CardContent>
              {dailyData.calories.consumed === 0 && dailyData.calories.burned === 0 ? (
                noDataDisplay
              ) : (
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold">
                      {calorieBalance > 0 ? "+" : ""}
                      {calorieBalance}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {calorieBalance > 0
                        ? "Calorie deficit (good for weight loss)"
                        : "Calorie surplus (good for muscle gain)"}
                    </p>
                  </div>

                  <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: "Consumed", value: dailyData.calories.consumed },
                          { name: "Burned", value: dailyData.calories.burned },
                          { name: "Goal", value: dailyData.calories.goal },
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="Calories">
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f97316" />
                          <Cell fill="#6366f1" />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Macronutrient Breakdown</CardTitle>
              <CardDescription>Distribution of your protein, carbs, and fat intake</CardDescription>
            </CardHeader>
            <CardContent>
              {totalCaloriesFromMacros <= 1 ? (
                noDataDisplay
              ) : (
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="h-[200px] w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroPercentages}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {macroPercentages.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="grid w-full grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Protein</div>
                      <div className="text-lg font-bold">{dailyData.macros.protein}g</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Carbs</div>
                      <div className="text-lg font-bold">{dailyData.macros.carbs}g</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">Fat</div>
                      <div className="text-lg font-bold">{dailyData.macros.fat}g</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Trends</CardTitle>
          <CardDescription>Your progress over the past week</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {weeklyData.every((day) => day.caloriesConsumed === 0 && day.caloriesBurned === 0) ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">
                No weekly data available yet. Continue logging your meals and exercises!
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="caloriesConsumed"
                  stroke="#3b82f6"
                  name="Calories Consumed"
                />
                <Line yAxisId="left" type="monotone" dataKey="caloriesBurned" stroke="#f97316" name="Calories Burned" />
                {userData?.weight && (
                  <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#6366f1" name="Weight (kg)" />
                )}
              </LineChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Assessment</CardTitle>
          <CardDescription>Analysis of your daily performance and suggestions for improvement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
            <h3 className="mb-2 text-lg font-medium">Today's Grade: {gradeInfo.grade}</h3>
            <p className="text-slate-600 dark:text-slate-400">{gradeInfo.description}</p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">Suggestions for Improvement</h3>
            <ul className="space-y-2">
              {generateSuggestions().map((suggestion, index) => (
                <li key={index} className="flex items-start">
                  <ArrowRight className="mr-2 mt-1 h-4 w-4 text-blue-600" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
            <Download className="mr-2 h-4 w-4" /> Download Full Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
