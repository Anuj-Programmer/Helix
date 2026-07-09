import { requireAuth } from '@/lib/auth-utils';


async function Page() {

  await requireAuth();
  
  return (
    <div>
      <p>
        credentials
      </p>
    </div>
  )
}

export default Page
