"use client"

import type React from "react"
import { useState, useRef, useCallback } from "react"
import type { JSX } from "react" // Import JSX to fix the undeclared variable error

interface WorkflowNode {
  id: string
  name: string
  status: "completed" | "running" | "pending" | "failed"
  duration: string
  x: number
  y: number
  connections: string[]
}

interface Connection {
  from: string
  to: string
}

const initialNodes: WorkflowNode[] = [
  {
    id: "start",
    name: "Start",
    status: "completed",
    duration: "0.1s",
    x: 50,
    y: 100,
    connections: ["pageload", "auth"],
  },
  {
    id: "pageload",
    name: "Page Load",
    status: "completed",
    duration: "1.2s",
    x: 200,
    y: 50,
    connections: ["datafetch"],
  },
  { id: "auth", name: "Auth Check", status: "completed", duration: "0.8s", x: 200, y: 150, connections: ["datafetch"] },
  {
    id: "datafetch",
    name: "Data Fetch",
    status: "running",
    duration: "2.1s",
    x: 350,
    y: 100,
    connections: ["render", "validate"],
  },
  { id: "render", name: "Render UI", status: "pending", duration: "-", x: 500, y: 50, connections: ["end"] },
  { id: "validate", name: "Validate", status: "pending", duration: "-", x: 500, y: 150, connections: ["end"] },
  { id: "end", name: "End", status: "pending", duration: "-", x: 650, y: 100, connections: [] },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "#10b981"
    case "running":
      return "#f59e0b"
    case "failed":
      return "#ef4444"
    default:
      return "#6b7280"
  }
}

const getStatusBgColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-500"
    case "running":
      return "bg-yellow-500"
    case "failed":
      return "bg-red-500"
    default:
      return "bg-gray-400"
  }
}

export function WorkflowCanvas() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(initialNodes)
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, nodeId: string) => {
      e.preventDefault()
      const node = nodes.find((n) => n.id === nodeId)
      if (!node) return

      const rect = e.currentTarget.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setDraggedNode(nodeId)
    },
    [nodes],
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!draggedNode || !canvasRef.current) return

      const canvasRect = canvasRef.current.getBoundingClientRect()
      const newX = e.clientX - canvasRect.left - dragOffset.x
      const newY = e.clientY - canvasRect.top - dragOffset.y

      setNodes((prev) =>
        prev.map((node) =>
          node.id === draggedNode
            ? { ...node, x: Math.max(0, Math.min(newX, 700)), y: Math.max(0, Math.min(newY, 300)) }
            : node,
        ),
      )
    },
    [draggedNode, dragOffset],
  )

  const handleMouseUp = useCallback(() => {
    setDraggedNode(null)
  }, [])

  const renderConnections = () => {
    const connections: JSX.Element[] = []

    nodes.forEach((fromNode) => {
      fromNode.connections.forEach((toNodeId) => {
        const toNode = nodes.find((n) => n.id === toNodeId)
        if (!toNode) return

        const fromX = fromNode.x + 40 // Center of node (80px width / 2)
        const fromY = fromNode.y + 25 // Center of node (50px height / 2)
        const toX = toNode.x + 40
        const toY = toNode.y + 25

        // Calculate arrow direction
        const angle = Math.atan2(toY - fromY, toX - fromX)
        const arrowLength = 8
        const arrowAngle = Math.PI / 6

        connections.push(
          <g key={`${fromNode.id}-${toNodeId}`}>
            {/* Connection line */}
            <line
              x1={fromX}
              y1={fromY}
              x2={toX - 15} // Stop before the target node
              y2={toY}
              stroke={getStatusColor(fromNode.status)}
              strokeWidth="2"
              strokeDasharray={fromNode.status === "pending" ? "5,5" : "none"}
            />
            {/* Arrow head */}
            <polygon
              points={`${toX - 15},${toY} ${toX - 15 - arrowLength * Math.cos(angle - arrowAngle)},${toY - arrowLength * Math.sin(angle - arrowAngle)} ${toX - 15 - arrowLength * Math.cos(angle + arrowAngle)},${toY - arrowLength * Math.sin(angle + arrowAngle)}`}
              fill={getStatusColor(fromNode.status)}
            />
          </g>,
        )
      })
    })

    return connections
  }

  return (
    <div className="relative">
      <div
        ref={canvasRef}
        className="relative w-full h-80 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* SVG for connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">{renderConnections()}</svg>

        {/* Workflow Nodes */}
        {nodes.map((node) => (
          <div
            key={node.id}
            className={`absolute cursor-move select-none transition-transform hover:scale-105 ${
              draggedNode === node.id ? "z-10 scale-105" : "z-0"
            }`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
            }}
            onMouseDown={(e) => handleMouseDown(e, node.id)}
          >
            <div
              className={`w-20 h-12 ${getStatusBgColor(node.status)} text-white rounded-lg flex items-center justify-center font-semibold text-xs shadow-lg relative border-2 border-white`}
            >
              <div className="text-center">
                <div className="leading-tight">{node.name}</div>
              </div>
              {node.status === "running" && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></div>
              )}
            </div>
            <div className="text-xs text-gray-600 mt-1 text-center">{node.duration}</div>
          </div>
        ))}

        {/* Instructions */}
        <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
          Drag nodes to reposition • Connections show workflow flow
        </div>
      </div>

      {/* Status Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-500 rounded relative">
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
          </div>
          <span>Running</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Failed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Pending</span>
        </div>
      </div>
    </div>
  )
}
