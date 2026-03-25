import { Studio } from 'sanity'
import config from '../../sanity.config'

export default function AdminPage() {
  // This takes your config file and turns it into a full editor
  return (
    <div className="h-screen w-full">
      <Studio config={config} />
    </div>
  )
}
