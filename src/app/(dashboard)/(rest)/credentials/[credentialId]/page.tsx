import { requireAuth } from "@/lib/auth-utils";

interface PageProps{
    params: Promise<{
        credentialId: string;
    }>
}

async function Page({params}: PageProps) {
      await requireAuth();

    const {credentialId} = await params;
  return (
   <>
      <p>
        credentials id: {credentialId}
      </p>
  </>
  )
}

export default Page
