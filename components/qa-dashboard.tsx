"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Clock, Globe, CheckCircle, XCircle, ExternalLink, Play, Settings, Filter } from "lucide-react"

// Mock data
const performanceData = [
  { time: "00:00", responseTime: 120, requests: 45, errors: 2 },
  { time: "00:05", responseTime: 150, requests: 52, errors: 1 },
  { time: "00:10", responseTime: 95, requests: 38, errors: 0 },
  { time: "00:15", responseTime: 180, requests: 61, errors: 3 },
  { time: "00:20", responseTime: 110, requests: 47, errors: 1 },
  { time: "00:25", responseTime: 140, requests: 55, errors: 2 },
]

const networkRequests = [
  { url: "/api/users", method: "GET", status: 200, duration: "120ms", size: "2.1KB" },
  { url: "/api/products", method: "POST", status: 201, duration: "340ms", size: "1.8KB" },
  { url: "/api/analytics", method: "GET", status: 500, duration: "2.1s", size: "0KB" },
  { url: "/api/auth", method: "POST", status: 200, duration: "89ms", size: "512B" },
  { url: "/api/images", method: "GET", status: 404, duration: "45ms", size: "0KB" },
]

const statusData = [
  { name: "Success", value: 85, color: "#10b981" },
  { name: "Failed", value: 12, color: "#ef4444" },
  { name: "Pending", value: 3, color: "#f59e0b" },
]

const workflowSteps = [
  { id: 1, name: "Page Load", status: "completed", duration: "1.2s" },
  { id: 2, name: "Authentication", status: "completed", duration: "0.8s" },
  { id: 3, name: "Data Fetch", status: "running", duration: "2.1s" },
  { id: 4, name: "Render UI", status: "pending", duration: "-" },
  { id: 5, name: "User Interaction", status: "pending", duration: "-" },
]

function WorkflowCanvas() {
  return (
    <div>
      {/* Placeholder for interactive workflow canvas */}
      <p className="text-center text-gray-500">Interactive workflow canvas will be rendered here.</p>
    </div>
  )
}

export function QADashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QA Testing Dashboard</h1>
          <p className="text-gray-600">Performance monitoring and session analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter Duration
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Session Recording Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="w-5 h-5 text-blue-600" />
            Session Recording
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Duration:</span>
              <p className="font-semibold">4m 32s</p>
            </div>
            <div>
              <span className="text-gray-600">Region:</span>
              <p className="font-semibold">US-East-1</p>
            </div>
            <div>
              <span className="text-gray-600">Status:</span>
              <Badge variant="default" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </div>
            <div>
              <span className="text-gray-600">BrowserBase Session:</span>
              <Button variant="link" className="p-0 h-auto text-blue-600">
                <ExternalLink className="w-3 h-3 mr-1" />
                bb_session_123
              </Button>
            </div>
            <div>
              <span className="text-gray-600">Date:</span>
              <p className="font-semibold">2024-01-15</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Avg Response Time</p>
                <p className="text-3xl font-bold">142ms</p>
              </div>
              <Clock className="w-8 h-8 text-blue-200" />
            </div>
            <div className="mt-4 h-16">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData.slice(-4)}>
                  <Area type="monotone" dataKey="responseTime" stroke="#ffffff" fill="#ffffff" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Requests</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <Globe className="w-6 h-6 text-gray-400" />
            </div>
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.slice(-6)}>
                  <Bar dataKey="requests" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Success Rate</p>
                <p className="text-2xl font-bold">94.2%</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData.slice(-6)}>
                  <Line type="monotone" dataKey="requests" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Error Count</p>
                <p className="text-2xl font-bold">23</p>
              </div>
              <XCircle className="w-6 h-6 text-red-500" />
            </div>
            <div className="mt-2 h-8">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData.slice(-6)}>
                  <Bar dataKey="errors" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section - Interactive Workflow Graph with Video */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Video Section */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Session Recording</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
              <video className="w-full h-full object-cover" controls poster="/placeholder.svg?height=200&width=300">
                <source src="#" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                Live Session
              </div>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-semibold">4:32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quality:</span>
                <span className="font-semibold">1080p</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <Badge variant="default" className="bg-red-100 text-red-800">
                  Recording
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Workflow Canvas */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Interactive Test Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkflowCanvas />
          </CardContent>
        </Card>

        {/* Status Distribution - Keep unchanged */}
        <Card>
          <CardHeader>
            <CardTitle>Request Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2 mt-4">
              {statusData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Performance Chart and Network Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Over Time */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="responseTime" stroke="#3b82f6" name="Response Time (ms)" />
                  <Line type="monotone" dataKey="requests" stroke="#10b981" name="Requests" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Network Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Network Console Logs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {networkRequests.map((request, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {request.method}
                      </Badge>
                      <span className="text-sm font-medium truncate">{request.url}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600">
                      <span>Duration: {request.duration}</span>
                      <span>Size: {request.size}</span>
                    </div>
                  </div>
                  <Badge variant={request.status === 200 || request.status === 201 ? "default" : "destructive"}>
                    {request.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
