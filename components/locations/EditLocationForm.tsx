'use client';

import { useState, useCallback } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, MapPin, Clock, Radius } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { updateLocation } from '@/lib/actions/locations';
import LocationMap from '@/components/maps/LocationMap';
import type { Location } from '@/lib/types';

export default function EditLocationForm({ location }: { location: Location }) {
  const router = useRouter();
  const updateLocationWithId = updateLocation.bind(null, location.id);
  const [state, formAction, pending] = useActionState(updateLocationWithId, null);

  const [lat, setLat] = useState(location.lat);
  const [lng, setLng] = useState(location.lng);
  const [gpsRadius, setGpsRadius] = useState(location.gps_radius);

  const handleMapClick = useCallback((newLat: number, newLng: number) => {
    setLat(newLat);
    setLng(newLng);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <form action={formAction} className="rounded-xl border border-border bg-surface-raised p-6 space-y-5">
        {state?.error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-500">
            {state.error}
          </div>
        )}

        <Input label="Nombre de la Sede" icon={Building2} type="text" id="name" name="name" defaultValue={location.name} />
        <Input label="Dirección" icon={MapPin} type="text" id="address" name="address" defaultValue={location.address} />

        <input type="hidden" name="lat" value={lat} />
        <input type="hidden" name="lng" value={lng} />

        <div className="grid grid-cols-2 gap-4">
          <Input label="Radio GPS (metros)" icon={Radius} type="number" id="gps_radius" name="gps_radius" value={gpsRadius} onChange={(e) => setGpsRadius(Number(e.target.value) || 150)} min={50} max={500} />
          <Input label="Horario" icon={Clock} type="text" id="schedule" name="schedule" defaultValue={location.schedule} />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Días laborales</label>
          <div className="flex gap-2">
            {[['Mon', 'Lun'], ['Tue', 'Mar'], ['Wed', 'Mié'], ['Thu', 'Jue'], ['Fri', 'Vie'], ['Sat', 'Sáb'], ['Sun', 'Dom']].map(([val, label]) => (
              <label key={val} className="flex-1">
                <input type="checkbox" name="work_days" value={val} defaultChecked={location.work_days?.includes(val)} className="peer sr-only" />
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
                <input type="radio" name="entry_mode" value={val} defaultChecked={val === (location.entry_mode ?? '')} className="peer sr-only" />
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
                <input type="radio" name="exit_mode" value={val} defaultChecked={val === (location.exit_mode ?? '')} className="peer sr-only" />
                <div className="text-center text-sm font-medium py-2.5 rounded-lg border border-border cursor-pointer peer-checked:bg-brand/10 peer-checked:border-brand/30 peer-checked:text-brand transition-colors">{label}</div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Estado</label>
          <div className="flex gap-3">
            <label className="flex-1">
              <input type="radio" name="status" value="active" defaultChecked={location.status === 'active'} className="peer sr-only" />
              <div className="text-center text-sm font-medium py-2.5 rounded-lg border border-border cursor-pointer peer-checked:bg-emerald-500/10 peer-checked:border-emerald-500/30 peer-checked:text-emerald-500 transition-colors">Activa</div>
            </label>
            <label className="flex-1">
              <input type="radio" name="status" value="inactive" defaultChecked={location.status === 'inactive'} className="peer sr-only" />
              <div className="text-center text-sm font-medium py-2.5 rounded-lg border border-border cursor-pointer peer-checked:bg-red-500/10 peer-checked:border-red-500/30 peer-checked:text-red-500 transition-colors">Inactiva</div>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" loading={pending} className="flex-1 h-11">
            {pending ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
          <Button variant="secondary" type="button" onClick={() => router.back()} className="h-11 px-6">
            Cancelar
          </Button>
        </div>
      </form>

      <div className="space-y-2">
        <LocationMap
          className="h-80 lg:h-full lg:min-h-[400px]"
          markers={[{
            id: location.id,
            lat,
            lng,
            name: location.name,
            gps_radius: gpsRadius,
          }]}
          center={{ lat, lng }}
          zoom={15}
          onClick={handleMapClick}
        />
        <p className="text-xs text-[var(--text-muted)] text-center">Haz clic en el mapa para mover la ubicación</p>
      </div>
    </div>
  );
}
