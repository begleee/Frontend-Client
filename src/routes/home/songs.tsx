import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home/songs')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
      Songs
  </div>
}
