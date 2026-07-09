import { requireAuth } from '@/lib/auth-utils'

async function Page() {
  await requireAuth();

  return (
    <div>
      Workflow
    </div>
  )
}

export default Page
