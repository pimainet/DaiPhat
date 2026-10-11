import { createFileRoute } from '@tanstack/react-router'
import { AuthPanel } from '~/components/auth-panel'

export const Route = createFileRoute('/login')({
  component: LoginPage,
})

function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AuthPanel />
    </div>
  )
}
