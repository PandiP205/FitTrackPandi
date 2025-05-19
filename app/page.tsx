"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { ArrowRight, Moon, Sun, CheckCircle, Heart, BarChart2, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800">
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
            />
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">FitTrack</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={toggleTheme} className="rounded-full p-2">
              {mounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="flex flex-col items-center justify-center py-12 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-blue-900 dark:text-white sm:text-5xl md:text-6xl">
              Track Your Health Journey
            </h2>
            <p className="mb-8 max-w-2xl text-xl text-slate-600 dark:text-slate-300">
              Monitor your diet, physical activity, and progress toward fitness goals all in one place.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-4xl"
          >
            <div className="relative mx-auto h-[400px] w-full overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-slate-800 sm:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-violet-100 opacity-50 dark:from-blue-900 dark:to-violet-900"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=500&width=800"
                  alt="Dashboard Preview"
                  className="h-auto max-w-full"
                />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-12"
          >
            <Link href="/signup">
              <Button
                size="lg"
                className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700"
              >
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </section>

        <section className="py-16">
          <h3 className="mb-12 text-center text-3xl font-bold text-blue-900 dark:text-white">Key Features</h3>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                className="rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-slate-800"
              >
                <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h4 className="mb-2 text-xl font-semibold text-blue-900 dark:text-white">{feature.title}</h4>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h3 className="mb-12 text-center text-3xl font-bold text-blue-900 dark:text-white">How It Works</h3>
          <div className="grid gap-8 md:grid-cols-4">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.5 }}
                className="relative rounded-xl bg-white p-6 shadow-md transition-all hover:shadow-lg dark:bg-slate-800"
              >
                <div className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white">
                  {index + 1}
                </div>
                <div className="mb-4 mt-4 text-center">
                  <step.icon className="mx-auto h-10 w-10 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="mb-2 text-center text-lg font-semibold text-blue-900 dark:text-white">{step.title}</h4>
                <p className="text-center text-sm text-slate-600 dark:text-slate-300">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-16">
          <h3 className="mb-12 text-center text-3xl font-bold text-blue-900 dark:text-white">Why Choose FitTrack?</h3>

          <Tabs defaultValue="easy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="easy">Easy to Use</TabsTrigger>
              <TabsTrigger value="personalized">Personalized</TabsTrigger>
              <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
            </TabsList>
            <TabsContent value="easy" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex h-full items-center">
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-blue-900 dark:text-white">
                          Simple & Intuitive Interface
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          FitTrack is designed to be easy to use, with a clean and intuitive interface that makes
                          tracking your health and fitness effortless.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Quick meal and exercise logging",
                            "Intuitive dashboard with key metrics",
                            "Mobile-friendly design for on-the-go tracking",
                            "Visual charts and graphs for easy progress monitoring",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 p-6 dark:bg-slate-700">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Easy to use interface"
                        className="max-h-[300px] rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="personalized" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex h-full items-center">
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-blue-900 dark:text-white">Tailored to Your Goals</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          FitTrack adapts to your specific fitness goals and preferences, providing personalized
                          recommendations and insights.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Custom nutrition targets based on your goals",
                            "Personalized workout suggestions",
                            "Adaptive calorie goals based on your activity",
                            "Progress tracking specific to your objectives",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 p-6 dark:bg-slate-700">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Personalized dashboard"
                        className="max-h-[300px] rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="comprehensive" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex h-full items-center">
                      <div className="space-y-4">
                        <h4 className="text-2xl font-bold text-blue-900 dark:text-white">All-in-One Solution</h4>
                        <p className="text-slate-600 dark:text-slate-300">
                          FitTrack combines all the tools you need for complete health and fitness tracking in one
                          convenient application.
                        </p>
                        <ul className="space-y-2">
                          {[
                            "Track nutrition, exercise, and progress in one place",
                            "Comprehensive food and exercise database",
                            "Detailed analytics and reporting",
                            "Goal setting and achievement tracking",
                          ].map((item, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-center rounded-xl bg-slate-100 p-6 dark:bg-slate-700">
                      <img
                        src="/placeholder.svg?height=300&width=400"
                        alt="Comprehensive tracking"
                        className="max-h-[300px] rounded-lg shadow-md"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-16">
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-center text-white shadow-lg">
            <h3 className="mb-4 text-3xl font-bold">Ready to start your fitness journey?</h3>
            <p className="mb-8 text-lg">Join thousands of users who have transformed their lives with FitTrack.</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="w-full rounded-full sm:w-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full rounded-full bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16">
          <h3 className="mb-8 text-center text-3xl font-bold text-blue-900 dark:text-white">
            Frequently Asked Questions
          </h3>
          <div className="mx-auto max-w-3xl space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <h4 className="mb-2 text-lg font-semibold text-blue-900 dark:text-white">{faq.question}</h4>
                <p className="text-slate-600 dark:text-slate-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-slate-100 py-12 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">FitTrack</h3>
              </div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">
                Your all-in-one solution for tracking health and fitness goals.
              </p>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Features</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>Meal Tracking</li>
                <li>Exercise Logging</li>
                <li>Progress Monitoring</li>
                <li>Personalized Goals</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Resources</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>Help Center</li>
                <li>Blog</li>
                <li>Nutrition Guide</li>
                <li>Workout Library</li>
              </ul>
            </div>

            <div>
              <h4 className="mb-4 text-lg font-semibold text-slate-900 dark:text-white">Contact</h4>
              <ul className="space-y-2 text-slate-600 dark:text-slate-400">
                <li>support@fittrack.example</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Fitness Street</li>
                <li>Health City, HC 12345</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <p>© {new Date().getFullYear()} FitTrack. All rights reserved.</p>
            <p className="mt-2 text-sm">Created for Web Development Course Assignment</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Meal Tracking",
    description: "Log your meals and track your nutrition intake with our comprehensive database of foods and recipes.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
        <line x1="6" y1="1" x2="6" y2="4"></line>
        <line x1="10" y1="1" x2="10" y2="4"></line>
        <line x1="14" y1="1" x2="14" y2="4"></line>
      </svg>
    ),
  },
  {
    title: "Exercise Logging",
    description: "Record your workouts, track your progress, and see estimated calories burned for each activity.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M18 8a5 5 0 0 0-10 0v7h10V8z"></path>
        <line x1="13" y1="15" x2="13" y2="20"></line>
        <line x1="16" y1="17" x2="10" y2="17"></line>
      </svg>
    ),
  },
  {
    title: "Progress Tracking",
    description: "Visualize your progress with interactive charts and detailed reports to stay motivated and on track.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
  },
]

const howItWorks = [
  {
    title: "Create Account",
    description: "Sign up and set your personal goals and preferences.",
    icon: Users,
  },
  {
    title: "Track Daily",
    description: "Log your meals and exercises throughout the day.",
    icon: Clock,
  },
  {
    title: "Monitor Progress",
    description: "View detailed analytics and track your improvements.",
    icon: BarChart2,
  },
  {
    title: "Achieve Goals",
    description: "Reach your fitness targets and maintain a healthy lifestyle.",
    icon: Heart,
  },
]

const faqs = [
  {
    question: "Is FitTrack free to use?",
    answer:
      "Yes, FitTrack offers a free basic plan with all essential features. Premium features may be available in future updates.",
  },
  {
    question: "How accurate is the calorie tracking?",
    answer:
      "FitTrack uses a comprehensive database of foods and exercises to provide accurate calorie estimates. For best results, we recommend measuring portions and being consistent with your logging.",
  },
  {
    question: "Can I use FitTrack on my mobile device?",
    answer:
      "Yes, FitTrack is fully responsive and works on all devices including smartphones, tablets, and desktop computers.",
  },
  {
    question: "How do I set my fitness goals?",
    answer:
      "During signup, you'll be asked about your fitness goals. You can also update these anytime in the Settings section of your dashboard.",
  },
  {
    question: "Is my data secure?",
    answer:
      "We take data security seriously. All your personal information and health data is encrypted and stored securely. We never share your data with third parties without your consent.",
  },
]
