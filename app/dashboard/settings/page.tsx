"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Settings() {
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
  })

  const [fitnessGoals, setFitnessGoals] = useState({
    primaryGoal: "lose-weight",
    targetWeight: "",
    weeklyGoal: "0.5",
    activityLevel: "moderate",
  })

  const [nutritionPreferences, setNutritionPreferences] = useState({
    dietType: "balanced",
    calorieGoal: "2000",
    proteinPercentage: "30",
    carbPercentage: "40",
    fatPercentage: "30",
  })

  const [appSettings, setAppSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    dataSharing: true,
    units: "metric",
  })

  // Load user data from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      setPersonalInfo({
        name: userData.name || "",
        email: userData.email || "",
        age: userData.age || "",
        gender: userData.gender || "",
        height: userData.height || "",
        weight: userData.weight || "",
      })

      // Set target weight based on current weight if available
      if (userData.weight) {
        const currentWeight = Number.parseFloat(userData.weight)
        const targetWeight =
          userData.fitnessGoal === "lose-weight"
            ? Math.max(currentWeight - 10, 50).toString()
            : userData.fitnessGoal === "gain-muscle"
              ? (currentWeight + 5).toString()
              : userData.weight

        setFitnessGoals((prev) => ({
          ...prev,
          primaryGoal: userData.fitnessGoal || "lose-weight",
          targetWeight,
        }))
      }
    }
  }, [])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPersonalInfo((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFitnessGoalsChange = (name: string, value: string) => {
    setFitnessGoals((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNutritionChange = (name: string, value: string) => {
    setNutritionPreferences((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAppSettingsChange = (name: string, value: boolean | string) => {
    setAppSettings((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveSettings = () => {
    // Get existing user data
    const storedUserData = localStorage.getItem("userData")
    let userData = storedUserData ? JSON.parse(storedUserData) : {}

    // Update with new values
    userData = {
      ...userData,
      ...personalInfo,
      fitnessGoal: fitnessGoals.primaryGoal,
    }

    // Save back to localStorage
    localStorage.setItem("userData", JSON.stringify(userData))

    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    })
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">Settings</h1>
        <p className="text-slate-600 dark:text-slate-400">Manage your account preferences and application settings</p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="goals">Fitness Goals</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="app">App Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details and profile information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" value={personalInfo.name} onChange={handlePersonalInfoChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={personalInfo.age}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={personalInfo.gender}
                      onValueChange={(value) => setPersonalInfo((prev) => ({ ...prev, gender: value }))}
                    >
                      <SelectTrigger id="gender">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      name="height"
                      type="number"
                      value={personalInfo.height}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                      id="weight"
                      name="weight"
                      type="number"
                      step="0.1"
                      value={personalInfo.weight}
                      onChange={handlePersonalInfoChange}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="goals">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Fitness Goals</CardTitle>
                <CardDescription>Set your fitness objectives and track your progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="primaryGoal">Primary Goal</Label>
                  <Select
                    value={fitnessGoals.primaryGoal}
                    onValueChange={(value) => handleFitnessGoalsChange("primaryGoal", value)}
                  >
                    <SelectTrigger id="primaryGoal">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lose-weight">Lose Weight</SelectItem>
                      <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                      <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                      <SelectItem value="maintain-health">Maintain Health</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="targetWeight">Target Weight (kg)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      step="0.1"
                      value={fitnessGoals.targetWeight}
                      onChange={(e) => handleFitnessGoalsChange("targetWeight", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weeklyGoal">Weekly Goal (kg)</Label>
                    <Select
                      value={fitnessGoals.weeklyGoal}
                      onValueChange={(value) => handleFitnessGoalsChange("weeklyGoal", value)}
                    >
                      <SelectTrigger id="weeklyGoal">
                        <SelectValue placeholder="Select weekly goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0.25">0.25 kg per week</SelectItem>
                        <SelectItem value="0.5">0.5 kg per week</SelectItem>
                        <SelectItem value="0.75">0.75 kg per week</SelectItem>
                        <SelectItem value="1">1 kg per week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activityLevel">Activity Level</Label>
                  <Select
                    value={fitnessGoals.activityLevel}
                    onValueChange={(value) => handleFitnessGoalsChange("activityLevel", value)}
                  >
                    <SelectTrigger id="activityLevel">
                      <SelectValue placeholder="Select activity level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                      <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                      <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                      <SelectItem value="active">Active (hard exercise 6-7 days/week)</SelectItem>
                      <SelectItem value="very-active">Very active (very hard exercise & physical job)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="nutrition">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Nutrition Preferences</CardTitle>
                <CardDescription>Customize your nutrition goals and dietary preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="dietType">Diet Type</Label>
                  <Select
                    value={nutritionPreferences.dietType}
                    onValueChange={(value) => handleNutritionChange("dietType", value)}
                  >
                    <SelectTrigger id="dietType">
                      <SelectValue placeholder="Select diet type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="balanced">Balanced</SelectItem>
                      <SelectItem value="low-carb">Low Carb</SelectItem>
                      <SelectItem value="high-protein">High Protein</SelectItem>
                      <SelectItem value="keto">Ketogenic</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calorieGoal">Daily Calorie Goal</Label>
                  <Input
                    id="calorieGoal"
                    type="number"
                    value={nutritionPreferences.calorieGoal}
                    onChange={(e) => handleNutritionChange("calorieGoal", e.target.value)}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Macronutrient Distribution</h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="proteinPercentage">Protein ({nutritionPreferences.proteinPercentage}%)</Label>
                        <span className="text-sm text-slate-500">
                          {Math.round(
                            (Number.parseInt(nutritionPreferences.calorieGoal) *
                              Number.parseInt(nutritionPreferences.proteinPercentage)) /
                              100 /
                              4,
                          )}
                          g
                        </span>
                      </div>
                      <Slider
                        id="proteinPercentage"
                        min={10}
                        max={60}
                        step={5}
                        value={[Number.parseInt(nutritionPreferences.proteinPercentage)]}
                        onValueChange={(value) => handleNutritionChange("proteinPercentage", value[0].toString())}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="carbPercentage">Carbohydrates ({nutritionPreferences.carbPercentage}%)</Label>
                        <span className="text-sm text-slate-500">
                          {Math.round(
                            (Number.parseInt(nutritionPreferences.calorieGoal) *
                              Number.parseInt(nutritionPreferences.carbPercentage)) /
                              100 /
                              4,
                          )}
                          g
                        </span>
                      </div>
                      <Slider
                        id="carbPercentage"
                        min={10}
                        max={70}
                        step={5}
                        value={[Number.parseInt(nutritionPreferences.carbPercentage)]}
                        onValueChange={(value) => handleNutritionChange("carbPercentage", value[0].toString())}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="fatPercentage">Fat ({nutritionPreferences.fatPercentage}%)</Label>
                        <span className="text-sm text-slate-500">
                          {Math.round(
                            (Number.parseInt(nutritionPreferences.calorieGoal) *
                              Number.parseInt(nutritionPreferences.fatPercentage)) /
                              100 /
                              9,
                          )}
                          g
                        </span>
                      </div>
                      <Slider
                        id="fatPercentage"
                        min={10}
                        max={60}
                        step={5}
                        value={[Number.parseInt(nutritionPreferences.fatPercentage)]}
                        onValueChange={(value) => handleNutritionChange("fatPercentage", value[0].toString())}
                      />
                    </div>
                  </div>
                  {Number.parseInt(nutritionPreferences.proteinPercentage) +
                    Number.parseInt(nutritionPreferences.carbPercentage) +
                    Number.parseInt(nutritionPreferences.fatPercentage) !==
                    100 && (
                    <p className="text-sm text-red-500">
                      Note: Macronutrient percentages should add up to 100%. Current total:
                      {Number.parseInt(nutritionPreferences.proteinPercentage) +
                        Number.parseInt(nutritionPreferences.carbPercentage) +
                        Number.parseInt(nutritionPreferences.fatPercentage)}
                      %
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="app">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Customize your app experience and notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Push Notifications</Label>
                      <p className="text-sm text-slate-500">Receive reminders and updates on your progress</p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={appSettings.notifications}
                      onCheckedChange={(checked) => handleAppSettingsChange("notifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailUpdates">Email Updates</Label>
                      <p className="text-sm text-slate-500">Receive weekly summaries and tips via email</p>
                    </div>
                    <Switch
                      id="emailUpdates"
                      checked={appSettings.emailUpdates}
                      onCheckedChange={(checked) => handleAppSettingsChange("emailUpdates", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dataSharing">Data Sharing</Label>
                      <p className="text-sm text-slate-500">
                        Allow anonymous data sharing to improve app recommendations
                      </p>
                    </div>
                    <Switch
                      id="dataSharing"
                      checked={appSettings.dataSharing}
                      onCheckedChange={(checked) => handleAppSettingsChange("dataSharing", checked)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="units">Measurement Units</Label>
                  <Select value={appSettings.units} onValueChange={(value) => handleAppSettingsChange("units", value)}>
                    <SelectTrigger id="units">
                      <SelectValue placeholder="Select units" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                      <SelectItem value="imperial">Imperial (lb, in)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-4 text-sm font-medium">Account Actions</h3>
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full">
                      Export Your Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    >
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSettings}>Save Changes</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  )
}
