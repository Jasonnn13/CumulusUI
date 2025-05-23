"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  CameraIcon,
  MicIcon,
  SparklesIcon,
  SendIcon,
  SettingsIcon,
  CameraOffIcon,
  MicOffIcon,
  PlayIcon,
  MoveIcon,
} from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function Home() {
  // Webcam state
  const [webcamActive, setWebcamActive] = useState(false)
  const [extractedText, setExtractedText] = useState("")

  // Speech recognition state
  const [micActive, setMicActive] = useState(false)
  const [speechText, setSpeechText] = useState("")

  // Summary state
  const [summaryText, setSummaryText] = useState("")
  const [audioData, setAudioData] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Cumulus, your AI assistant. I can see through your camera, listen to your voice, and help answer your questions. How can I assist you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Settings state
  const [voice, setVoice] = useState("en-US-JennyNeural")
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(150)
  const [voiceSuccess, setVoiceSuccess] = useState(false)
  const [aiSuccess, setAiSuccess] = useState(false)

  // Debug state
  const [showDebug, setShowDebug] = useState(false)
  const [debugMessages, setDebugMessages] = useState<string[]>([])

  // Draggable button state - Initialize with default values
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Initialize button position after component mounts (client-side only)
  useEffect(() => {
    // Set initial position based on window dimensions
    setButtonPosition({
      x: window.innerWidth - 80,
      y: window.innerHeight - 120,
    })
  }, [])

  // Add debug message
  const addDebugMessage = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setDebugMessages((prev) => [...prev.slice(-19), `[${timestamp}] ${message}`])
  }

  // Generate summary
  const generateSummary = async () => {
    try {
      addDebugMessage("Generating summary...")

      // In a real implementation, this would call the Azure OpenAI service
      // For now, we'll simulate a response
      setTimeout(() => {
        const summary =
          "This is a simulated summary of the detected text and speech. In a real implementation, this would be generated by Azure OpenAI based on the OCR and speech recognition results."
        setSummaryText(summary)
        addDebugMessage("Summary generated successfully")

        // Simulate TTS audio generation
        setAudioData("data:audio/mp3;base64,AAAAFGZ0eXBtcDQyAAAAAG1wNDJtcDQxAAAA")
      }, 1500)
    } catch (error) {
      addDebugMessage(`Error generating summary: ${error}`)
    }
  }

  // Play audio
  const playAudio = () => {
    setIsPlaying(true)
    setTimeout(() => setIsPlaying(false), 3000) // Simulate audio playback
  }

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Send chat message
  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: input }])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, this would call the Azure OpenAI service
      // For now, we'll simulate a response
      setTimeout(() => {
        const responses = [
          "I've analyzed the information from your camera and microphone. Based on what I can see and hear, I'd recommend focusing on the main subject in better lighting.",
          "From what I can gather through the camera and your speech, it seems like you're asking about data processing. The best approach would be to use Azure's cognitive services for this task.",
          "Based on the visual and audio input, I understand you're looking for information on this topic. Let me summarize what I've detected and provide a helpful response.",
          "I've processed the visual and audio data. The text I detected appears to be about technology, and your question seems related to implementation details. Let me help clarify that for you.",
        ]

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: responses[Math.floor(Math.random() * responses.length)],
          },
        ])
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your request. Please try again.",
        },
      ])
      setIsLoading(false)
    }
  }

  // Save settings
  const handleVoiceSubmit = () => {
    setVoiceSuccess(true)
    addDebugMessage(`Voice set to ${voice}`)
    setTimeout(() => setVoiceSuccess(false), 3000)
  }

  const handleAISubmit = () => {
    setAiSuccess(true)
    addDebugMessage(`AI settings updated: Temperature=${temperature}, Max Tokens=${maxTokens}`)
    setTimeout(() => setAiSuccess(false), 3000)
  }

  // Add more messages for testing scrolling
  const addTestMessages = () => {
    const newMessages = [
      { role: "user" as const, content: "Can you tell me more about Azure AI services?" },
      {
        role: "assistant" as const,
        content:
          "Azure AI services provide a comprehensive suite of tools for building intelligent applications. They include services for vision, speech, language, and decision-making.",
      },
      { role: "user" as const, content: "How can I use Azure Vision API for OCR?" },
      {
        role: "assistant" as const,
        content:
          "Azure Vision API provides OCR capabilities through its Read API. You can send images to the API and it will extract text from them. The API can handle printed text in multiple languages as well as handwritten text.",
      },
      { role: "user" as const, content: "What about speech recognition?" },
      {
        role: "assistant" as const,
        content:
          "Azure Speech Services offers speech-to-text capabilities with high accuracy. You can use it for real-time transcription, batch processing, or custom speech models tailored to your specific vocabulary and acoustic environment.",
      },
    ]

    setMessages((prev) => [...prev, ...newMessages])
    addDebugMessage("Added test messages")
  }

  // Generate test OCR text
  const generateTestOCR = () => {
    const longText = `
Azure Computer Vision OCR
--------------------------
The Azure Computer Vision service provides developers with access to advanced algorithms that process images and return information. Computer Vision can analyze images to detect and extract printed or handwritten text.

Key Features:
• Extract printed and handwritten text from images
• Support for multiple languages
• Detect text orientation and language
• Convert images to structured text output
• Analyze text layout and relationships

Technical Specifications:
- API Version: 3.2
- Supported image formats: JPEG, PNG, GIF, BMP
- Maximum image size: 4MB
- Maximum dimensions: 10000 x 10000 pixels
- Minimum dimensions: 50 x 50 pixels

Sample Response:
{
  "language": "en",
  "textAngle": 0,
  "orientation": "Up",
  "regions": [
    {
      "boundingBox": "67,51,433,309",
      "lines": [
        {
          "boundingBox": "67,51,433,39",
          "words": [
            {
              "boundingBox": "67,51,94,39",
              "text": "Azure"
            },
            {
              "boundingBox": "176,51,133,39",
              "text": "Computer"
            },
            {
              "boundingBox": "325,51,175,39",
              "text": "Vision"
            }
          ]
        }
      ]
    }
  ]
}
    `.trim()

    setExtractedText(longText)
    addDebugMessage("Generated test OCR text")
  }

  // Generate test speech text
  const generateTestSpeech = () => {
    const longText = `
I'm currently testing the speech recognition capabilities of Azure Speech Services. This service provides real-time transcription of spoken language into text. It supports multiple languages and can be customized for specific vocabularies and acoustic environments.

When using speech recognition in applications, it's important to consider factors like background noise, microphone quality, and speaker clarity. The service can handle various accents and speaking styles, but optimal conditions will always yield the best results.

For this demonstration, I'm generating a lengthy speech transcription to test the scrolling functionality of the speech recognition results box. This will help ensure that the user interface properly handles large amounts of text while maintaining readability and accessibility.

Azure Speech Services also supports features like intent recognition, speaker identification, and sentiment analysis when combined with other Azure AI services. This makes it a powerful tool for building voice-enabled applications and natural user interfaces.
    `.trim()

    setSpeechText(longText)
    addDebugMessage("Generated test speech text")
  }

  // Draggable button handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
      addDebugMessage("Started dragging settings button")
    }
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      // Calculate new position
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Ensure button stays within viewport bounds
      const buttonWidth = buttonRef.current?.offsetWidth || 50
      const buttonHeight = buttonRef.current?.offsetHeight || 50

      const boundedX = Math.max(0, Math.min(window.innerWidth - buttonWidth, newX))
      const boundedY = Math.max(0, Math.min(window.innerHeight - buttonHeight, newY))

      setButtonPosition({ x: boundedX, y: boundedY })
    }
  }

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false)
      addDebugMessage(
        `Moved settings button to position: x=${Math.round(buttonPosition.x)}, y=${Math.round(buttonPosition.y)}`,
      )
    }
  }

  // Add and remove event listeners for dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, dragOffset])

  // Update button position on window resize
  useEffect(() => {
    const handleResize = () => {
      setButtonPosition((prev) => {
        const buttonWidth = buttonRef.current?.offsetWidth || 50
        const buttonHeight = buttonRef.current?.offsetHeight || 50

        return {
          x: Math.min(prev.x, window.innerWidth - buttonWidth),
          y: Math.min(prev.y, window.innerHeight - buttonHeight),
        }
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className="bg-white">
      <Header />

      {/* Main content */}
      <div className="flex flex-col md:flex-row">
        {/* Left Column - Camera */}
        <div className="w-full md:w-1/2 border-r border-gray-200 p-4">
          <h2 className="text-xl font-semibold text-[#0078D4] mb-4">Camera Feed</h2>

          <div className="flex flex-col">
            {/* Camera Feed */}
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center mb-4">
              {webcamActive ? (
                <video id="webcam" autoPlay playsInline muted className="w-full h-full object-cover"></video>
              ) : (
                <div className="text-center p-8">
                  <CameraIcon size={48} className="mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">Camera is inactive</p>
                  <p className="text-gray-400 text-sm mt-2">Click 'Start Camera' to begin</p>
                </div>
              )}
            </div>

            {/* Camera Controls */}
            <div className="flex justify-between items-center mb-4">
              <Button
                onClick={() => {
                  setWebcamActive(!webcamActive)
                  addDebugMessage(webcamActive ? "Camera stopped" : "Camera started")
                }}
                className={webcamActive ? "bg-red-500 hover:bg-red-600" : "bg-[#0078D4] hover:bg-[#0063B1]"}
              >
                {webcamActive ? (
                  <>
                    <CameraOffIcon size={16} className="mr-2" />
                    Stop Camera
                  </>
                ) : (
                  <>
                    <CameraIcon size={16} className="mr-2" />
                    Start Camera
                  </>
                )}
              </Button>

              <Button
                onClick={() => {
                  setMicActive(!micActive)
                  addDebugMessage(micActive ? "Microphone stopped" : "Microphone started")
                }}
                className={micActive ? "bg-red-500 hover:bg-red-600" : "bg-[#0078D4] hover:bg-[#0063B1]"}
              >
                {micActive ? (
                  <>
                    <MicOffIcon size={16} className="mr-2" />
                    Stop Mic
                  </>
                ) : (
                  <>
                    <MicIcon size={16} className="mr-2" />
                    Start Mic
                  </>
                )}
              </Button>
            </div>

            {/* OCR Results */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">OCR Results:</h3>
                <Button onClick={generateTestOCR} variant="ghost" size="sm" className="h-6 text-xs">
                  Generate Test OCR
                </Button>
              </div>
              <div
                className="bg-gray-50 rounded-md p-3 border border-gray-200 overflow-y-auto font-mono text-xs"
                style={{ height: "200px" }}
              >
                {extractedText ? (
                  <div className="whitespace-pre-line">{extractedText}</div>
                ) : (
                  <p className="text-gray-400 italic">No text detected yet...</p>
                )}
              </div>
            </div>

            {/* Speech Recognition Results */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Speech Recognition:</h3>
                <Button onClick={generateTestSpeech} variant="ghost" size="sm" className="h-6 text-xs">
                  Generate Test Speech
                </Button>
              </div>
              <div
                className="bg-gray-50 rounded-md p-3 border border-gray-200 overflow-y-auto font-mono text-xs"
                style={{ height: "200px" }}
              >
                {speechText ? (
                  <div className="whitespace-pre-line">{speechText}</div>
                ) : (
                  <p className="text-gray-400 italic">Waiting for speech input...</p>
                )}
              </div>
            </div>

            {/* Test button for adding messages (for demo purposes) */}
            <Button onClick={addTestMessages} variant="outline" className="mt-4">
              Add Test Chat Messages
            </Button>
          </div>
        </div>

        {/* Right Column - Chat */}
        <div className="w-full md:w-1/2 p-4 relative">
          <h2 className="text-xl font-semibold text-[#0078D4] mb-4">Chat</h2>

          {/* Chat Messages */}
          <div className="overflow-y-auto mb-4 border border-gray-100 rounded-md p-4" style={{ height: "500px" }}>
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[90%] p-3 rounded-2xl ${
                    message.role === "user"
                      ? "ml-auto bg-[#50A0DC] text-white rounded-br-sm"
                      : "mr-auto bg-gray-100 text-gray-800 rounded-bl-sm"
                  }`}
                >
                  {message.content}
                </div>
              ))}
              {isLoading && (
                <div className="mr-auto bg-gray-100 text-gray-800 rounded-2xl rounded-bl-sm max-w-[90%] p-3">
                  <div className="flex space-x-2">
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Chat Input */}
          <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-md">
            <Input
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-[#0078D4] hover:bg-[#0063B1]"
            >
              <SendIcon size={18} />
            </Button>
          </div>

          {/* Settings Button - Draggable */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                ref={buttonRef}
                onMouseDown={handleMouseDown}
                style={{
                  position: "fixed",
                  left: `${buttonPosition.x}px`,
                  top: `${buttonPosition.y}px`,
                  cursor: isDragging ? "grabbing" : "grab",
                  transition: isDragging ? "none" : "box-shadow 0.2s, transform 0.2s",
                  transform: isDragging ? "scale(1.1)" : "scale(1)",
                  zIndex: 50,
                }}
                className={`flex items-center justify-center bg-[#0078D4] text-white rounded-full p-3 shadow-lg hover:bg-[#0063B1] ${
                  isDragging ? "shadow-xl" : ""
                }`}
              >
                {isDragging ? <MoveIcon size={24} /> : <SettingsIcon size={24} />}
              </button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="text-[#0078D4]">Cumulus AI Assistant</SheetTitle>
                <SheetDescription>Configure settings and view additional information</SheetDescription>
              </SheetHeader>

              <Tabs defaultValue="summary" className="mt-6">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="debug">Debug</TabsTrigger>
                  <TabsTrigger value="system">System</TabsTrigger>
                </TabsList>

                {/* Summary Tab */}
                <TabsContent value="summary" className="space-y-4">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#0078D4]">AI Summary</h3>
                    <div
                      className="bg-gray-50 rounded-md p-4 border border-gray-200 overflow-y-auto font-mono text-sm"
                      style={{ minHeight: "150px" }}
                    >
                      {summaryText ? (
                        <div className="whitespace-pre-line">{summaryText}</div>
                      ) : (
                        <p className="text-gray-400 italic">Click 'Generate Summary' to analyze detected content</p>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={generateSummary} className="bg-[#0078D4] hover:bg-[#0063B1] flex-1">
                        <SparklesIcon size={16} className="mr-2" />
                        Generate Summary
                      </Button>

                      {audioData && (
                        <Button
                          onClick={playAudio}
                          variant="outline"
                          className="border-[#0078D4] text-[#0078D4]"
                          disabled={isPlaying}
                        >
                          <PlayIcon size={16} className="mr-2" />
                          {isPlaying ? "Playing..." : "Play Audio"}
                        </Button>
                      )}
                    </div>
                  </div>
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#0078D4]">Voice Settings</h3>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">TTS Voice</label>
                      <Select value={voice} onValueChange={setVoice}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a voice" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US-JennyNeural">en-US-JennyNeural</SelectItem>
                          <SelectItem value="en-US-GuyNeural">en-US-GuyNeural</SelectItem>
                          <SelectItem value="en-GB-SoniaNeural">en-GB-SoniaNeural</SelectItem>
                          <SelectItem value="en-AU-NatashaNeural">en-AU-NatashaNeural</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      onClick={handleVoiceSubmit}
                      className="bg-[#0078D4] hover:bg-[#0063B1] w-full"
                      disabled={voiceSuccess}
                    >
                      {voiceSuccess ? "Voice Updated ✓" : "Apply Voice Setting"}
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-[#0078D4]">AI Settings</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">AI Temperature: {temperature.toFixed(1)}</label>
                        </div>
                        <Slider
                          value={[temperature]}
                          min={0}
                          max={1}
                          step={0.1}
                          onValueChange={(value) => setTemperature(value[0])}
                        />
                        <p className="text-xs text-gray-500">
                          Lower values produce more focused responses. Higher values produce more creative responses.
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">Max Tokens: {maxTokens}</label>
                        </div>
                        <Slider
                          value={[maxTokens]}
                          min={50}
                          max={500}
                          step={50}
                          onValueChange={(value) => setMaxTokens(value[0])}
                        />
                        <p className="text-xs text-gray-500">Controls the maximum length of AI-generated responses.</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleAISubmit}
                      className="bg-[#0078D4] hover:bg-[#0063B1] w-full"
                      disabled={aiSuccess}
                    >
                      {aiSuccess ? "AI Settings Updated ✓" : "Apply AI Settings"}
                    </Button>
                  </div>
                </TabsContent>

                {/* Debug Tab */}
                <TabsContent value="debug" className="space-y-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <Checkbox
                      id="debug"
                      checked={showDebug}
                      onCheckedChange={(checked) => setShowDebug(checked as boolean)}
                    />
                    <label
                      htmlFor="debug"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Debug Console
                    </label>
                  </div>

                  <div
                    className="bg-gray-900 text-gray-100 rounded-md p-4 font-mono text-xs overflow-y-auto"
                    style={{ height: "300px" }}
                  >
                    {debugMessages.length > 0 ? (
                      debugMessages.map((message, index) => {
                        const parts = message.split("]")
                        const timestamp = parts[0].replace("[", "")
                        const content = parts.slice(1).join("]")

                        return (
                          <div key={index} className="mb-1">
                            <span className="text-[#00B7C3]">{timestamp}</span>
                            <span>{content}</span>
                          </div>
                        )
                      })
                    ) : (
                      <p className="text-gray-500 italic">No debug messages yet...</p>
                    )}
                  </div>
                </TabsContent>

                {/* System Tab */}
                <TabsContent value="system" className="space-y-4">
                  <h3 className="text-lg font-medium text-[#0078D4]">System Information</h3>
                  <div className="bg-gray-50 rounded-md p-4 border border-gray-200">
                    <div className="space-y-2">
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium">Version:</span>
                        <span>Cumulus AI v1.0.0</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium">Azure Vision:</span>
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Connected
                        </span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-gray-100">
                        <span className="font-medium">Azure Speech:</span>
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Connected
                        </span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="font-medium">Azure OpenAI:</span>
                        <span className="flex items-center">
                          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                          Connected
                        </span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
