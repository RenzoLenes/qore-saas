'use client';

import { useState, useCallback } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, MapPin, Clock, Radius } from 'lucide-react';
import Breadcrumb from '@/components/ui/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import LocationMap from '@/components/maps/LocationMap';
import { createLocation } from '@/lib/actions/locations';

const DEFAULT_LAT = -12.0464;
const DEFAULT_LNG = -77.0428;

export default function NewLocationPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(createLocation, null);

  const [lat, setLat] = useState(DEFAULT_LAT);
  const [lng, setLng] = useState(DEFAULT_LNG);
  const [gpsRadius, setGpsRadius] = useState(150);
  const [pinPlaced, setPinPlaced] = useState(false);

  const handleMapClick = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
    setPinPlaced(true);
  }, []);

  return (
    <div className="space-y-6 max-w-4xl">
      <Breadcrumb items={[{ label: 'Dashboard', href: '/dashboard' }, { label: 'Sedes', href: '/locations' }, { label: 'Nueva Sede' }]} />

      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Crear Nueva Sede</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Configura la ubicación y parámetros de la nueva sede</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form action={formAction} className="rounded-xl border border-border bg-surface-raised p-6 space-y-5">
          {state?.error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
              {state.error}
            </div>
          )}

          <Input label="Nombre de la Sede" icon={Building2} type="text" id="name" name="name" required placeholder="Ej: Oficina Central" />
          <Input label="Dirección" icon={MapPin} type="text" id="address" name="address" required placeholder="Av. Javier Prado 1234, Lima" />

          <input type="hidden" name="lat" value={lat} />
          <input type="hidden" name="lng" value={lng} />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Radio GPS (metros)" icon={Radius} type="number" id="gps_radius" name="gps_radius" value={gpsRadius} onChange={(e) => setGpsRadius(Number(e.target.value) || 150)} min={50} max={500} />
            <Input label="Horario" icon={Clock} type="text" id="schedule" name="schedule" defaultValue="08:00 - 18:00" />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Días laborales</label>
            <div className="flex gap-2">
              {[['Mon', 'Lun'], ['Tue', 'Mar'], ['Wed', 'Mié'], ['Thu', 'Jue'], ['Fri', 'Vie'], ['Sat', 'Sáb'], ['Sun', 'Dom']].map(([val, label], i) => (
                <label key={val} className="flex-1">
                  <input type="checkbox" name="work_days" value={val} defaultChecked={i < 5} className="peer sr-only" />
                  <div className="text-center text-xs font-medium py-2 rounded-lg border border-border cursor-pointer peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand transition-colors">
                    {label}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Modo de entrada</label>
            <div className="grid grid-cols-2 gap-2">
              {([['', 'Default empresa'], ['gps_only', 'Solo GPS'], ['static_qr', 'QR Estático'], ['dynamic_qr', 'QR Dinámico']] as const).map(([val, label]) => (
                <label key={val} className="flex-1">
                  <input type="radio" name="entry_mode" value={val} defaultChecked={val === ''} className="peer sr-only" />
                  <div className="text-center text-sm font-medium py-2.5 rounded-lg border border-border cursor-pointer peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand transition-colors">{label}</div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Modo de salida</label>
            <div className="grid grid-cols-2 gap-2">
              {([['', 'Default empresa'], ['gps_only', 'Solo GPS'], ['static_qr', 'QR Estático'], ['dynamic_qr', 'QR Dinámico']] as const).map(([val, label]) => (
                <label key={val} className="flex-1">
                  <input type="radio" name="exit_mode" value={val} defaultChecked={val === ''} className="peer sr-only" />
                  <div className="text-center text-sm font-medium py-2.5 rounded-lg border border-border cursor-pointer peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand transition-colors">{label}</div>
                </label>
              ))}
            </div>
          </div>

          <input type="hidden" name="status" value="active" />

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={pending} className="flex-1 h-11">
              {pending ? 'Creando...' : 'Crear Sede'}
            </Button>
            <Button variant="secondary" type="button" onClick={() => router.back()} className="h-11 px-6">
              Cancelar
            </Button>
          </div>
        </form>

        <div className="space-y-2">
          <LocationMap
            className="h-80 lg:h-full lg:min-h-[400px]"
            markers={pinPlaced ? [{
              id: 'new',
              lat,
              lng,
              name: 'Nueva Sede',
              gps_radius: gpsRadius,
            }] : []}
            center={{ lat, lng }}
            onClick={handleMapClick}
          />
          <p className="text-xs text-[var(--text-muted)] text-center">
            {pinPlaced ? 'Haz clic en el mapa para mover la ubicación' : 'Haz clic en el mapa para seleccionar la ubicación'}
          </p>
        </div>
      </div>
    </div>
  );
}
