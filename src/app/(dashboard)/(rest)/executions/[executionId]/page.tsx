import { requireAuth } from "@/lib/auth-utils";

interface PageProps{
    params: Promise<{
        executionId: string;
    }>
}

async function Page({params}: PageProps) {
      await requireAuth();
    const {executionId} = await params;
  return (
   <>
      <p>
        execution id: {executionId}
      </p>
  </>
  )
}

export default Page
