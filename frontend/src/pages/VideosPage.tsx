import { videos } from "../videos"
import VideoCard from "../components/VideoCard"

export default function VideosPage() {
  const user = localStorage.getItem("user_name")

  if (!user) {
    window.location.href = "/"
    return null
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Videos</h1>

      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}