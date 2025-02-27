"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart,
  Bell,
  CreditCard,
  DollarSign,
  Home,
  LifeBuoy,
  LogOut,
  MessageSquare,
  PieChart,
  Search,
  Settings,
  Shield,
  Trophy,
  User,
  Wallet,
} from "lucide-react"
import { BalanceChart } from "@/components/balance-chart"
import { CreditCardComponent } from "@/components/credit-card"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-muted/40">
      {/* Sidebar */}
      <div className="hidden md:flex w-16 flex-col bg-indigo-600 text-white">
        <div className="flex h-16 items-center justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-indigo-600">
            <Wallet className="h-5 w-5" />
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-4 p-2">
          <Button variant="ghost" size="icon" className="rounded-full bg-white text-indigo-600">
            <Home className="h-5 w-5" />
            <span className="sr-only">Home</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500">
            <CreditCard className="h-5 w-5" />
            <span className="sr-only">Cards</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500">
            <PieChart className="h-5 w-5" />
            <span className="sr-only">Analytics</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500">
            <Trophy className="h-5 w-5" />
            <span className="sr-only">Achievements</span>
          </Button>
        </nav>
        <div className="p-2">
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500">
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-indigo-500 mt-2">
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="flex-1">
            <h1 className="text-xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Good Morning!</p>
          </div>
          <div className="flex items-center gap-4">
            <form className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-48 rounded-full bg-background pl-8 md:w-64 lg:w-80"
              />
            </form>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" alt="James Smith" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="hidden md:block">
              <div className="text-sm font-medium">James Smith</div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="grid flex-1 items-start gap-4 p-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:p-6">
          <div className="grid auto-rows-max gap-4 md:gap-6 lg:col-span-2">
            {/* Financial Summary Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Contract balance</CardTitle>
                  <CreditCard className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$597</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">No of Donors</CardTitle>
                  <Shield className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">15</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">% of donors approval</CardTitle>
                  <Shield className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                </CardContent>
              </Card>
              {/* <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Paid Education & Hobbies</CardTitle>
                  <LifeBuoy className="h-4 w-4 text-indigo-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1200</div>
                </CardContent>
              </Card> */}
            </div>

            {/* Transaction History */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Details</CardTitle>
                <p className="text-sm text-muted-foreground">Last 5 transactions</p>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[80px]"></TableHead>
                      <TableHead>Name</TableHead>
                      
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>James Smith</TableCell>
                      
                      <TableCell>28/04/23</TableCell>
                      <TableCell>$258.50</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>RW</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>Robert Williams</TableCell>
                      
                      <TableCell>26/04/23</TableCell>
                      <TableCell>$450.00</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-100 text-red-800">
                          Reviewed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>LB</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>Linda Brown</TableCell>
                      
                      <TableCell>21/04/23</TableCell>
                      <TableCell>$374.00</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Avatar>
                          <AvatarFallback>MB</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>Michael Brown</TableCell>
                      
                      <TableCell>17/04/23</TableCell>
                      <TableCell>$842.00</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-100 text-green-800">
                          Completed
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Balance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Balance</CardTitle>
                <p className="text-sm text-muted-foreground">Last 12 Months</p>
              </CardHeader>
              <CardContent className="h-[300px]">
                <BalanceChart />
              </CardContent>
            </Card>
          </div>

          <div className="grid auto-rows-max gap-4 md:gap-6">
            {/* Credit Card */}
            {/* <CreditCardComponent /> */}
            <Button className="px-12 bg-indigo-600 py-3 mt-8">Create Campaign</Button>

            {/* Schedule Payments */}
            <Card>
              <CardHeader>
                <CardTitle>Campaigns</CardTitle>
                <p className="text-sm text-muted-foreground">February 2025</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Home className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Cancer patients</p>
                    <p className="text-xs text-muted-foreground">3 hrs • Pending</p>
                  </div>
                  <div className="font-medium">$487</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <User className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Orphan Education</p>
                    <p className="text-xs text-muted-foreground">2 days • Pending</p>
                  </div>
                  <div className="font-medium">$138</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Shield className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Handicapped children</p>
                    <p className="text-xs text-muted-foreground">3 days • Pending</p>
                  </div>
                  <div className="font-medium">$258</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Payments */}
            {/*<Card>
              <CardHeader>
                <CardTitle>Recent Payments</CardTitle>
                <p className="text-sm text-muted-foreground">Last 30 Days</p>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <BarChart className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Electric Bill</p>
                    <p className="text-xs text-muted-foreground">04/01/23 • Completed</p>
                  </div>
                  <div className="font-medium">$231</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <LifeBuoy className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Water Bill</p>
                    <p className="text-xs text-muted-foreground">02/01/23 • Completed</p>
                  </div>
                  <div className="font-medium">$189</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    <Wallet className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Home Internet Bill</p>
                    <p className="text-xs text-muted-foreground">01/01/23 • Completed</p>
                  </div>
                  <div className="font-medium">$75</div>
                </div>
              </CardContent>
            </Card>*/}
          </div>
        </main>
      </div>
    </div>
  )
}

