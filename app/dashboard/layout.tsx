"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { Home, Utensils, Activity, BarChart2, Settings, LogOut, Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Meal Logger", href: "/dashboard/meals", icon: Utensils },
    { name: "Exercise Logger", href: "/dashboard/exercises", icon: Activity },
    { name: "Daily Summary", href: "/dashboard/summary", icon: BarChart2 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const NavLinks = () => (
    <>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-50"
                : "text-slate-600 hover:bg-blue-50 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-50"
            }`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        )
      })}
    </>
  )

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-900">
      {/* Sidebar for desktop */}
      <div className="hidden border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col px-6">
          <div className="flex h-16 items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
              <span className="ml-2 text-xl font-bold text-blue-700 dark:text-blue-400">FitTrack</span>
            </Link>
          </div>
          <div className="mt-6 flex flex-1 flex-col space-y-1">
            <NavLinks />
          </div>
          <div className="mb-4 mt-auto space-y-4 py-4">
            <Button
              variant="ghost"
              onClick={toggleTheme}
              className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-50"
            >
              {isMounted && theme === "dark" ? <Sun className="mr-3 h-5 w-5" /> : <Moon className="mr-3 h-5 w-5" />}
              {isMounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
            </Button>
            <Link
              href="/"
              className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-900 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 flex items-center border-b border-slate-200 bg-white px-4 py-2 dark:border-slate-800 dark:bg-slate-950 md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-2">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex h-full flex-col">
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-6 dark:border-slate-800">
                <Link href="/dashboard" className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                  <span className="ml-2 text-xl font-bold text-blue-700 dark:text-blue-400">FitTrack</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-auto px-6 py-4">
                <nav className="flex flex-col space-y-1">
                  <NavLinks />
                </nav>
              </div>
              <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                <div className="space-y-4">
                  <Button
                    variant="ghost"
                    onClick={toggleTheme}
                    className="flex w-full items-center justify-start rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-blue-50 hover:text-blue-900 dark:text-slate-300 dark:hover:bg-blue-900/20 dark:hover:text-blue-50"
                  >
                    {isMounted && theme === "dark" ? (
                      <Sun className="mr-3 h-5 w-5" />
                    ) : (
                      <Moon className="mr-3 h-5 w-5" />
                    )}
                    {isMounted && theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                  <Link
                    href="/"
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-900 dark:text-slate-300 dark:hover:bg-red-900/20 dark:hover:text-red-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="flex flex-1 items-center justify-center">
          <span className="text-lg font-bold text-blue-700 dark:text-blue-400">FitTrack</span>
        </Link>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isMounted && theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
      </div>

      <Toaster />
    </div>
  )
}
