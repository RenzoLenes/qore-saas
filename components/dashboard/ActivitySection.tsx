import ActivityFeed from './ActivityFeed';
import { getRecentActivity } from '@/lib/queries/dashboard';
import { getTenantTimezone } from '@/lib/timezone';

export default async function ActivitySection() {
  const [activity, timezone] = await Promise.all([
    getRecentActivity(),
    getTenantTimezone(),
  ]);

  return <ActivityFeed items={activity} timezone={timezone} />;
}
