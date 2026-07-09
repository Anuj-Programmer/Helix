import { requireAuth } from "@/lib/auth-utils"


async function Page() {

  await requireAuth();

  return (
    <div>
      <p>
        executions
      </p>
    </div>
  )
}

export default Page
