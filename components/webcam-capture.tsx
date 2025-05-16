"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CameraIcon, CameraOffIcon } from "lucide-react"

interface WebcamCaptureProps {
  isActive: boolean
  setIsActive: (active: boolean) => void
  onTextExtracted: (text: string) => void
  addDebugMessage: (message: string) => void
}

export function WebcamCapture({ isActive, setIsActive, onTextExtracted, addDebugMessage }: WebcamCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Process frame for OCR every 5 seconds
  const processInterval = useRef<NodeJS.Timeout | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsActive(true)
        setError(null)
        addDebugMessage("Camera started successfully")

        // Start processing frames for OCR
        processInterval.current = setInterval(() => {
          processFrameForOCR()
        }, 5000)
      }
    } catch (err) {
      setError("Could not access camera. Please check permissions.")
      addDebugMessage(`Camera error: ${err}`)
      setIsActive(false)
    }
  }, [setIsActive, addDebugMessage])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null

      if (videoRef.current) {
        videoRef.current.srcObject = null
      }

      setIsActive(false)
      addDebugMessage("Camera stopped")

      // Clear processing interval
      if (processInterval.current) {
        clearInterval(processInterval.current)
        processInterval.current = null
      }
    }
  }, [setIsActive, addDebugMessage])

  // Process frame for OCR
  const processFrameForOCR = useCallback(() => {
    if (!videoRef.current || !isActive) return

    try {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")

      if (!context) return

      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      // In a real implementation, this would send the image to Azure Vision API
      // For now, we'll simulate a response
      addDebugMessage("Processing frame for OCR...")

      // Simulate OCR processing delay
      setTimeout(() => {
        const simulatedText =
          "This is simulated OCR text.\nIn a real implementation, this would be the text extracted from the camera feed using Azure Vision API."
        onTextExtracted(simulatedText)
        addDebugMessage("OCR processing complete")
      }, 1000)
    } catch (err) {
      addDebugMessage(`Error processing frame: ${err}`)
    }
  }, [isActive, onTextExtracted, addDebugMessage])

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="space-y-4">
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        {isActive ? (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        ) : (
          <div className="text-center p-8">
            <CameraIcon size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="text-gray-500">Camera is inactive. Click 'Start Camera' to begin.</p>
          </div>
        )}

        {error && <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white p-2 text-sm">{error}</div>}
      </div>

      <div className="flex justify-center">
        {isActive ? (
          <Button variant="destructive" onClick={stopCamera} className="flex items-center">
            <CameraOffIcon size={16} className="mr-2" />
            Stop Camera
          </Button>
        ) : (
          <Button className="bg-[#0078D4] hover:bg-[#0063B1] flex items-center" onClick={startCamera}>
            <CameraIcon size={16} className="mr-2" />
            Start Camera
          </Button>
        )}
      </div>
    </div>
  )
}
