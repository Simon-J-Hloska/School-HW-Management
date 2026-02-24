import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

type Props = {
  src: string
  title: string
}

export default function VideoPlayer({ src, title }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [sessionId, setSessionId] = useState<number | null>(null)
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null)

  const user = localStorage.getItem("user_name")

  const startSession = async () => {
    if (!user) return

    const res = await fetch("http://localhost:8000/api/session/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: user,
        service_name: "VideoPlatform",
        video_name: title,
      }),
    })

    const data = await res.json()
    setSessionId(data.session_id)

    heartbeatRef.current = setInterval(sendHeartbeat, 5000)
  }

  const sendHeartbeat = async () => {
    if (!sessionId) return

    await fetch("http://localhost:8000/api/session/heartbeat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })
  }

  const endSession = async () => {
    if (!sessionId) return

    if (heartbeatRef.current) clearInterval(heartbeatRef.current)

    await fetch("http://localhost:8000/api/session/end", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId }),
    })

    setSessionId(null)
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => {
      if (!sessionId) startSession()
    }

    const handlePause = () => {
      endSession()
    }

    const handleEnded = () => {
      endSession()
    }

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)
    video.addEventListener("ended", handleEnded)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
      video.removeEventListener("ended", handleEnded)
      endSession()
    }
  }, [sessionId])

  return (
    <Card className="max-w-xl mx-auto mt-6">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>

        <video
          ref={videoRef}
          controls
          className="w-full rounded-lg"
        >
          <source src={src} type="video/mp4" />
        </video>
      </CardContent>
    </Card>
  )
}