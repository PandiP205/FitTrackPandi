"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Download, Flame, Apple, Dumbbell, Trophy } from "lucide-react"

export default function Dashboard() {
  const [greeting, setGreeting] = useState("")
  const [mounted, setMounted] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [weeklyData, setWeeklyData] = useState<any[]>([])

  useEffect(() => {
    setMounted(true)
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Get user data from localStorage
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }

    // Generate empty weekly data
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const emptyData = days.map((day) => ({
      day,
      calories: 0,
      burned: 0,
      protein: 0,
    }))
    setWeeklyData(emptyData)
  }, [])

  if (!mounted) return null

  // Default values if no data is available
  const todayStats = {
    calories: 0,
    burned: 0,
    protein: 0,
  }

  const calorieGoal = 2000
  const calorieBalance = calorieGoal - todayStats.calories + todayStats.burned
  const proteinGoal = 140
  const proteinPercentage = Math.round((todayStats.protein / proteinGoal) * 100)

  // Calculate goal achievement grade
  const getGrade = () => {
    // Since we have no data, return a neutral grade
    return "N/A"
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            {greeting}, {userData?.name || "User"}!
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Here's an overview of your fitness journey</p>
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
              <div className="text-2xl font-bold">{todayStats.calories}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{calorieGoal} daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${Math.min(100, (todayStats.calories / calorieGoal) * 100)}%` }}
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
              <div className="text-2xl font-bold">{todayStats.burned}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">500 daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-orange-500"
                  style={{ width: `${Math.min(100, (todayStats.burned / 500) * 100)}%` }}
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
              <div className="text-2xl font-bold">{todayStats.protein}g</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{proteinGoal}g daily goal</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${Math.min(100, proteinPercentage)}%` }}
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
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Goal Achievement</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{getGrade()}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">Based on today's activity</p>
              <div className="mt-3 flex items-center">
                <span className="text-xs font-medium">F</span>
                <div className="mx-2 h-2 flex-1 rounded-full bg-slate-100 dark:bg-slate-800">
                  <div className="h-2 rounded-full bg-slate-300" style={{ width: "0%" }} />
                </div>
                <span className="text-xs font-medium">A</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="weekly" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="weekly">Weekly Overview</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="weekly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress</CardTitle>
              <CardDescription>Your calorie intake and calories burned over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              {weeklyData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    No data available yet. Start logging your meals and exercises!
                  </p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="calories"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                      name="Calories Consumed"
                    />
                    <Line type="monotone" dataKey="burned" stroke="#f97316" name="Calories Burned" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protein Intake</CardTitle>
              <CardDescription>Your daily protein consumption over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
              {weeklyData.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">No data available yet. Start logging your meals!</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={weeklyData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="protein" fill="#22c55e" name="Protein (g)" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly data coming soon</CardTitle>
              <CardDescription>This feature will be available in the next update</CardDescription>
            </CardHeader>
            <CardContent className="flex h-[300px] w-full items-center justify-center">
              <p className="text-slate-500 dark:text-slate-400">Monthly data visualization will be available soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
