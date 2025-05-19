"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { Search, Plus, Trash2 } from "lucide-react"

// Exercise database
const exerciseDatabase = [
  { id: 1, name: "Running", category: "Cardio", caloriesPerMinute: 10, unit: "minutes" },
  { id: 2, name: "Walking", category: "Cardio", caloriesPerMinute: 5, unit: "minutes" },
  { id: 3, name: "Cycling", category: "Cardio", caloriesPerMinute: 8, unit: "minutes" },
  { id: 4, name: "Swimming", category: "Cardio", caloriesPerMinute: 9, unit: "minutes" },
  { id: 5, name: "Push-ups", category: "Strength", caloriesPerRep: 0.5, unit: "reps" },
  { id: 6, name: "Pull-ups", category: "Strength", caloriesPerRep: 1, unit: "reps" },
  { id: 7, name: "Squats", category: "Strength", caloriesPerRep: 0.5, unit: "reps" },
  { id: 8, name: "Bench Press", category: "Strength", caloriesPerRep: 0.8, unit: "reps" },
  { id: 9, name: "Deadlift", category: "Strength", caloriesPerRep: 1.2, unit: "reps" },
  { id: 10, name: "Yoga", category: "Flexibility", caloriesPerMinute: 4, unit: "minutes" },
  { id: 11, name: "Pilates", category: "Flexibility", caloriesPerMinute: 5, unit: "minutes" },
  { id: 12, name: "Jumping Jacks", category: "Cardio", caloriesPerMinute: 8, unit: "minutes" },
]

// Exercise categories
const exerciseCategories = ["All", "Cardio", "Strength", "Flexibility"]

export default function ExerciseLogger() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof exerciseDatabase>([])
  const [selectedExercise, setSelectedExercise] = useState<(typeof exerciseDatabase)[0] | null>(null)
  const [quantity, setQuantity] = useState("30")
  const [selectedCategory, setSelectedCategory] = useState(exerciseCategories[0])
  const [loggedExercises, setLoggedExercises] = useState<
    Array<{
      id: number
      name: string
      category: string
      quantity: number
      unit: string
      caloriesBurned: number
      time: string
    }>
  >([])
  const [isSearching, setIsSearching] = useState(false)

  // Load exercises from localStorage on component mount
  useEffect(() => {
    const savedExercises = localStorage.getItem("loggedExercises")
    if (savedExercises) {
      setLoggedExercises(JSON.parse(savedExercises))
    }
  }, [])

  // Save exercises to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("loggedExercises", JSON.stringify(loggedExercises))
  }, [loggedExercises])

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      let results = exerciseDatabase.filter((exercise) =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      // Filter by category if not "All"
      if (selectedCategory !== "All") {
        results = results.filter((exercise) => exercise.category === selectedCategory)
      }

      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleExerciseSelect = (exercise: (typeof exerciseDatabase)[0]) => {
    setSelectedExercise(exercise)
    setSearchResults([])
    setSearchTerm(exercise.name)

    // Set default quantity based on exercise type
    if (exercise.unit === "minutes") {
      setQuantity("30")
    } else {
      setQuantity("10")
    }
  }

  const calculateCaloriesBurned = (exercise: (typeof exerciseDatabase)[0], qty: number) => {
    if (exercise.unit === "minutes") {
      return Math.round(exercise.caloriesPerMinute * qty)
    } else {
      return Math.round(exercise.caloriesPerRep * qty)
    }
  }

  const handleAddExercise = () => {
    if (!selectedExercise) {
      toast({
        title: "No exercise selected",
        description: "Please search and select an exercise first.",
        variant: "destructive",
      })
      return
    }

    const parsedQuantity = Number.parseFloat(quantity)
    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Please enter a valid quantity greater than 0.",
        variant: "destructive",
      })
      return
    }

    const caloriesBurned = calculateCaloriesBurned(selectedExercise, parsedQuantity)

    const newExercise = {
      id: Date.now(),
      name: selectedExercise.name,
      category: selectedExercise.category,
      quantity: parsedQuantity,
      unit: selectedExercise.unit,
      caloriesBurned,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setLoggedExercises([...loggedExercises, newExercise])
    setSelectedExercise(null)
    setSearchTerm("")
    setQuantity(selectedExercise.unit === "minutes" ? "30" : "10")

    toast({
      title: "Exercise logged successfully",
      description: `Added ${newExercise.name} to your workout log.`,
    })
  }

  const handleDeleteExercise = (id: number) => {
    setLoggedExercises(loggedExercises.filter((exercise) => exercise.id !== id))
    toast({
      title: "Exercise removed",
      description: "The exercise has been removed from your log.",
    })
  }

  // Calculate total calories burned
  const totalCaloriesBurned = loggedExercises.reduce((sum, exercise) => sum + exercise.caloriesBurned, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Exercise Logger</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your workouts and physical activity</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Add Exercise</CardTitle>
              <CardDescription>Search for exercises and log them to your daily activity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="category">Exercise Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {exerciseCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search for exercise (e.g., running)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                        <ul className="max-h-60 overflow-auto py-1">
                          {searchResults.map((exercise) => (
                            <li
                              key={exercise.id}
                              className="cursor-pointer px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                              onClick={() => handleExerciseSelect(exercise)}
                            >
                              <div className="font-medium">{exercise.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {exercise.category} |{" "}
                                {exercise.unit === "minutes"
                                  ? `${exercise.caloriesPerMinute} cal/min`
                                  : `${exercise.caloriesPerRep} cal/rep`}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <Button onClick={handleSearch} disabled={isSearching}>
                    {isSearching ? "Searching..." : <Search className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="quantity">
                  {selectedExercise ? `Quantity (${selectedExercise.unit})` : "Quantity"}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  step="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              {selectedExercise && (
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <h3 className="mb-2 font-medium">{selectedExercise.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Category: </span>
                      <span className="font-medium">{selectedExercise.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Unit: </span>
                      <span className="font-medium">{selectedExercise.unit}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-slate-500 dark:text-slate-400">Estimated Calories Burned: </span>
                      <span className="font-medium">
                        {calculateCaloriesBurned(selectedExercise, Number.parseFloat(quantity || "0"))}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAddExercise}
                className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                <Plus className="mr-2 h-4 w-4" /> Add to Log
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Daily Summary</CardTitle>
              <CardDescription>Your exercise activity for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-orange-50 p-6 text-center dark:bg-orange-900/30">
                <div className="text-sm text-slate-600 dark:text-slate-400">Total Calories Burned</div>
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">{totalCaloriesBurned}</div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-4 font-medium">Exercise Breakdown</h3>
                <div className="space-y-4">
                  {exerciseCategories.slice(1).map((category) => {
                    const categoryExercises = loggedExercises.filter((ex) => ex.category === category)
                    const categoryCalories = categoryExercises.reduce((sum, ex) => sum + ex.caloriesBurned, 0)
                    const percentage = totalCaloriesBurned
                      ? Math.round((categoryCalories / totalCaloriesBurned) * 100)
                      : 0

                    return (
                      <div key={category}>
                        <div className="mb-1 flex justify-between text-xs">
                          <span>
                            {category} ({percentage}%)
                          </span>
                          <span>{categoryCalories} calories</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                          <div
                            className={`h-2 rounded-full ${
                              category === "Cardio"
                                ? "bg-red-500"
                                : category === "Strength"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Exercise Log</CardTitle>
          <CardDescription>All workouts and activities logged today</CardDescription>
        </CardHeader>
        <CardContent>
          {loggedExercises.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-slate-500 dark:text-slate-400">
              <p>No exercises logged today. Add your first workout above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Exercise</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Duration/Reps</TableHead>
                    <TableHead>Calories Burned</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loggedExercises.map((exercise) => (
                    <TableRow key={exercise.id}>
                      <TableCell>{exercise.time}</TableCell>
                      <TableCell className="font-medium">{exercise.name}</TableCell>
                      <TableCell>{exercise.category}</TableCell>
                      <TableCell>
                        {exercise.quantity} {exercise.unit}
                      </TableCell>
                      <TableCell>{exercise.caloriesBurned}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteExercise(exercise.id)}
                          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      <Toaster />
    </div>
  )
}
