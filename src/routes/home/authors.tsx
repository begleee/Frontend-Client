import { createFileRoute } from '@tanstack/react-router'
import AddSingerForm from '../../components/AddAuthorForm'
import Authors from '../../components/Authrors'

export const Route = createFileRoute('/home/authors')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className='grid grid-cols-3'>
    <AddSingerForm/>
    <Authors/>
  </div>
}
