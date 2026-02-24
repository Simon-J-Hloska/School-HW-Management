import VideoPlayer from "./VideoPlayer"

export default function VideoCard({ video }: any) {
  return (
    <VideoPlayer
      src={`/videos/${video.file}`}
      title={video.title}
    />
  )
}