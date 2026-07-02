import { cn } from '@/lib/utils';
import React from 'react'
import prisma from '@/lib/db';

async function Page() {

  const something = true;

  const user = await prisma.user.findMany();

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(user)}
    </div>
  )
}

export default Page
