import { Outlet, createRootRoute, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <div>
    <div className="p-2 flex gap-2">{' '}
        <Link to='/' className="[&.active]:font-bold">
            Home
        </Link>
    </div>
        <hr />
        <Outlet />
        <TanStackRouterDevtools />
    </div>
  )
}