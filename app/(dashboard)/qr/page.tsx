import QRGeneratorClient from '@/components/qr/QRGeneratorClient';
import { getLocations } from '@/lib/queries/locations';
import { getActiveQRForLocation } from '@/lib/queries/qr';

export default async function QRPage() {
  const locations = await getLocations();
  const activeLocations = locations.filter((l) => l.status === 'active');

  // Fetch QR for the first location (pre-load)
  const initialQR = activeLocations[0]
    ? await getActiveQRForLocation(activeLocations[0].id)
    : null;

  return <QRGeneratorClient locations={activeLocations} initialQR={initialQR} />;
}
