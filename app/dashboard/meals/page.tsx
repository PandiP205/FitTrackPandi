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

// Food database
const foodDatabase = [
  { id: 1, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: "100g" },
  { id: 2, name: "Brown Rice", calories: 112, protein: 2.6, carbs: 23.5, fat: 0.9, serving: "100g" },
  { id: 3, name: "Broccoli", calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6, serving: "100g" },
  { id: 4, name: "Salmon", calories: 208, protein: 20, carbs: 0, fat: 13, serving: "100g" },
  { id: 5, name: "Sweet Potato", calories: 86, protein: 1.6, carbs: 20.1, fat: 0.1, serving: "100g" },
  { id: 6, name: "Avocado", calories: 160, protein: 2, carbs: 8.5, fat: 14.7, serving: "100g" },
  { id: 7, name: "Egg", calories: 78, protein: 6.3, carbs: 0.6, fat: 5.3, serving: "1 large" },
  { id: 8, name: "Greek Yogurt", calories: 59, protein: 10, carbs: 3.6, fat: 0.4, serving: "100g" },
  { id: 9, name: "Banana", calories: 89, protein: 1.1, carbs: 22.8, fat: 0.3, serving: "1 medium" },
  { id: 10, name: "Oatmeal", calories: 68, protein: 2.4, carbs: 12, fat: 1.4, serving: "100g" },
]

// Meal types
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

export default function MealLogger() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState<typeof foodDatabase>([])
  const [selectedFood, setSelectedFood] = useState<(typeof foodDatabase)[0] | null>(null)
  const [quantity, setQuantity] = useState("1")
  const [mealType, setMealType] = useState(mealTypes[0])
  const [loggedMeals, setLoggedMeals] = useState<
    Array<{
      id: number
      name: string
      calories: number
      protein: number
      carbs: number
      fat: number
      quantity: number
      mealType: string
      time: string
    }>
  >([])
  const [isSearching, setIsSearching] = useState(false)

  // Load meals from localStorage on component mount
  useEffect(() => {
    const savedMeals = localStorage.getItem("loggedMeals")
    if (savedMeals) {
      setLoggedMeals(JSON.parse(savedMeals))
    }
  }, [])

  // Save meals to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("loggedMeals", JSON.stringify(loggedMeals))
  }, [loggedMeals])

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
      return
    }

    setIsSearching(true)

    // Simulate API call with setTimeout
    setTimeout(() => {
      const results = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const handleFoodSelect = (food: (typeof foodDatabase)[0]) => {
    setSelectedFood(food)
    setSearchResults([])
    setSearchTerm(food.name)
  }

  const handleAddMeal = () => {
    if (!selectedFood) {
      toast({
        title: "No food selected",
        description: "Please search and select a food item first.",
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

    const newMeal = {
      id: Date.now(),
      name: selectedFood.name,
      calories: Math.round(selectedFood.calories * parsedQuantity),
      protein: Math.round(selectedFood.protein * parsedQuantity * 10) / 10,
      carbs: Math.round(selectedFood.carbs * parsedQuantity * 10) / 10,
      fat: Math.round(selectedFood.fat * parsedQuantity * 10) / 10,
      quantity: parsedQuantity,
      mealType,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setLoggedMeals([...loggedMeals, newMeal])
    setSelectedFood(null)
    setSearchTerm("")
    setQuantity("1")

    toast({
      title: "Meal logged successfully",
      description: `Added ${newMeal.name} to your ${mealType.toLowerCase()}.`,
    })
  }

  const handleDeleteMeal = (id: number) => {
    setLoggedMeals(loggedMeals.filter((meal) => meal.id !== id))
    toast({
      title: "Meal removed",
      description: "The meal has been removed from your log.",
    })
  }

  // Calculate totals
  const totalCalories = loggedMeals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = loggedMeals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = loggedMeals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = loggedMeals.reduce((sum, meal) => sum + meal.fat, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Meal Logger</h1>
        <p className="text-slate-600 dark:text-slate-400">Track your food intake and nutrition</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Add Food</CardTitle>
              <CardDescription>Search for food items and log them to your daily intake</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search for food (e.g., chicken breast)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    />
                    {searchResults.length > 0 && (
                      <div className="absolute z-10 mt-1 w-full rounded-md border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800">
                        <ul className="max-h-60 overflow-auto py-1">
                          {searchResults.map((food) => (
                            <li
                              key={food.id}
                              className="cursor-pointer px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700"
                              onClick={() => handleFoodSelect(food)}
                            >
                              <div className="font-medium">{food.name}</div>
                              <div className="text-xs text-slate-500 dark:text-slate-400">
                                {food.calories} cal | {food.protein}g protein | {food.serving}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (servings)</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="0.25"
                    step="0.25"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mealType">Meal Type</Label>
                  <Select value={mealType} onValueChange={setMealType}>
                    <SelectTrigger id="mealType">
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedFood && (
                <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800">
                  <h3 className="mb-2 font-medium">{selectedFood.name}</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Calories: </span>
                      <span className="font-medium">
                        {Math.round(selectedFood.calories * Number.parseFloat(quantity || "0"))}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Protein: </span>
                      <span className="font-medium">
                        {(selectedFood.protein * Number.parseFloat(quantity || "0")).toFixed(1)}g
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Carbs: </span>
                      <span className="font-medium">
                        {(selectedFood.carbs * Number.parseFloat(quantity || "0")).toFixed(1)}g
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 dark:text-slate-400">Fat: </span>
                      <span className="font-medium">
                        {(selectedFood.fat * Number.parseFloat(quantity || "0")).toFixed(1)}g
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleAddMeal}
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
              <CardDescription>Your nutrition intake for today</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="rounded-lg bg-blue-50 p-3 text-center dark:bg-blue-900/30">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Calories</div>
                  <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">{totalCalories}</div>
                </div>
                <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/30">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Protein</div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {totalProtein.toFixed(1)}g
                  </div>
                </div>
                <div className="rounded-lg bg-amber-50 p-3 text-center dark:bg-amber-900/30">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Carbs</div>
                  <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{totalCarbs.toFixed(1)}g</div>
                </div>
                <div className="rounded-lg bg-red-50 p-3 text-center dark:bg-red-900/30">
                  <div className="text-sm text-slate-600 dark:text-slate-400">Fat</div>
                  <div className="text-2xl font-bold text-red-700 dark:text-red-400">{totalFat.toFixed(1)}g</div>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Macronutrient Breakdown</h3>
                <div className="space-y-2">
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Protein ({Math.round(((totalProtein * 4) / (totalCalories || 1)) * 100)}%)</span>
                      <span>{totalProtein.toFixed(1)}g</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${Math.round(((totalProtein * 4) / (totalCalories || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Carbs ({Math.round(((totalCarbs * 4) / (totalCalories || 1)) * 100)}%)</span>
                      <span>{totalCarbs.toFixed(1)}g</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full bg-amber-500"
                        style={{ width: `${Math.round(((totalCarbs * 4) / (totalCalories || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between text-xs">
                      <span>Fat ({Math.round(((totalFat * 9) / (totalCalories || 1)) * 100)}%)</span>
                      <span>{totalFat.toFixed(1)}g</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                      <div
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${Math.round(((totalFat * 9) / (totalCalories || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Food Log</CardTitle>
          <CardDescription>All meals and snacks logged today</CardDescription>
        </CardHeader>
        <CardContent>
          {loggedMeals.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-slate-500 dark:text-slate-400">
              <p>No meals logged today. Add your first meal above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Meal Type</TableHead>
                    <TableHead>Food</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Calories</TableHead>
                    <TableHead>Protein</TableHead>
                    <TableHead>Carbs</TableHead>
                    <TableHead>Fat</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loggedMeals.map((meal) => (
                    <TableRow key={meal.id}>
                      <TableCell>{meal.time}</TableCell>
                      <TableCell>{meal.mealType}</TableCell>
                      <TableCell className="font-medium">{meal.name}</TableCell>
                      <TableCell>{meal.quantity}</TableCell>
                      <TableCell>{meal.calories}</TableCell>
                      <TableCell>{meal.protein}g</TableCell>
                      <TableCell>{meal.carbs}g</TableCell>
                      <TableCell>{meal.fat}g</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMeal(meal.id)}
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
