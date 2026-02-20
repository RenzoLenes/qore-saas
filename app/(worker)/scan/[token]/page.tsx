import { redirect } from 'next/navigation';

export default async function ScanPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  redirect(`/worker?qr_token=${token}`);
}
