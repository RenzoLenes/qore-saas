-- Allow tenant owners to update their own tenant
CREATE POLICY "Owners can update their tenant"
  ON public.tenants FOR UPDATE
  USING (
    id IN (
      SELECT tenant_id FROM public.users
      WHERE id = auth.uid() AND role = 'owner'
    )
  );
