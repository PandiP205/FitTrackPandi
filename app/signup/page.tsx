"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SignUp() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    fitnessGoal: "",
  })

  const validateStep1 = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      isValid = false
    } else {
      newErrors.name = ""
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
      isValid = false
    } else {
      newErrors.email = ""
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters with 1 uppercase letter and 1 number"
      isValid = false
    } else {
      newErrors.password = ""
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep2 = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required"
      isValid = false
    } else if (Number(formData.age) < 13 || Number(formData.age) > 100) {
      newErrors.age = "Age must be between 13 and 100"
      isValid = false
    } else {
      newErrors.age = ""
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required"
      isValid = false
    } else {
      newErrors.gender = ""
    }

    // Height validation
    if (!formData.height) {
      newErrors.height = "Height is required"
      isValid = false
    } else if (Number(formData.height) < 100 || Number(formData.height) > 250) {
      newErrors.height = "Height must be between 100 and 250 cm"
      isValid = false
    } else {
      newErrors.height = ""
    }

    // Weight validation
    if (!formData.weight) {
      newErrors.weight = "Weight is required"
      isValid = false
    } else if (Number(formData.weight) < 30 || Number(formData.weight) > 300) {
      newErrors.weight = "Weight must be between 30 and 300 kg"
      isValid = false
    } else {
      newErrors.weight = ""
    }

    setErrors(newErrors)
    return isValid
  }

  const validateStep3 = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Fitness goal validation
    if (!formData.fitnessGoal) {
      newErrors.fitnessGoal = "Please select a fitness goal"
      isValid = false
    } else {
      newErrors.fitnessGoal = ""
    }

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 3 && !validateStep3()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage for this demo
      localStorage.setItem("userData", JSON.stringify(formData))

      toast({
        title: "Account created!",
        description: "You've successfully signed up for FitTrack.",
      })

      // Redirect to dashboard after successful signup
      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem creating your account.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <Button variant="ghost" onClick={toggleTheme} className="rounded-full p-2">
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <div className="mx-auto mt-12 max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800"
          >
            <div className="p-8">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-blue-900 dark:text-white">Create an Account</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {step === 1
                    ? "Step 1: Basic Information"
                    : step === 2
                      ? "Step 2: Physical Information"
                      : "Step 3: Fitness Goals"}
                </p>
              </div>

              <div className="mb-6 flex justify-between">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      s === step
                        ? "bg-blue-600 text-white"
                        : s < step
                          ? "bg-green-500 text-white"
                          : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {s}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "border-red-500" : ""}
                      />
                      {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={handleChange}
                        className={errors.age ? "border-red-500" : ""}
                      />
                      {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender</Label>
                      <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                        <SelectTrigger id="gender" className={errors.gender ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                          <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        name="height"
                        type="number"
                        placeholder="175"
                        value={formData.height}
                        onChange={handleChange}
                        className={errors.height ? "border-red-500" : ""}
                      />
                      {errors.height && <p className="text-sm text-red-500">{errors.height}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        step="0.1"
                        placeholder="70.5"
                        value={formData.weight}
                        onChange={handleChange}
                        className={errors.weight ? "border-red-500" : ""}
                      />
                      {errors.weight && <p className="text-sm text-red-500">{errors.weight}</p>}
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="fitnessGoal">Fitness Goal</Label>
                      <Select
                        value={formData.fitnessGoal}
                        onValueChange={(value) => handleSelectChange("fitnessGoal", value)}
                      >
                        <SelectTrigger className={errors.fitnessGoal ? "border-red-500" : ""}>
                          <SelectValue placeholder="Select your fitness goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lose-weight">Lose Weight</SelectItem>
                          <SelectItem value="gain-muscle">Gain Muscle</SelectItem>
                          <SelectItem value="improve-endurance">Improve Endurance</SelectItem>
                          <SelectItem value="maintain-health">Maintain Health</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.fitnessGoal && <p className="text-sm text-red-500">{errors.fitnessGoal}</p>}
                    </div>

                    <div className="rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20">
                      <h3 className="mb-2 font-medium text-blue-800 dark:text-blue-300">Your Information</h3>
                      <ul className="space-y-1 text-sm text-slate-700 dark:text-slate-300">
                        <li>
                          <span className="font-medium">Name:</span> {formData.name}
                        </li>
                        <li>
                          <span className="font-medium">Email:</span> {formData.email}
                        </li>
                        <li>
                          <span className="font-medium">Age:</span> {formData.age}
                        </li>
                        <li>
                          <span className="font-medium">Gender:</span>{" "}
                          {formData.gender === "prefer-not-to-say" ? "Prefer not to say" : formData.gender}
                        </li>
                        <li>
                          <span className="font-medium">Height:</span> {formData.height} cm
                        </li>
                        <li>
                          <span className="font-medium">Weight:</span> {formData.weight} kg
                        </li>
                      </ul>
                    </div>
                  </>
                )}

                <div className="flex justify-between space-x-4">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={handlePrevStep}>
                      Back
                    </Button>
                  )}

                  {step < 3 ? (
                    <Button
                      type="button"
                      className={`${
                        step === 1 && "ml-auto"
                      } bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700`}
                      onClick={handleNextStep}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating Account..." : "Sign Up"}
                    </Button>
                  )}
                </div>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-slate-600 dark:text-slate-300">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
