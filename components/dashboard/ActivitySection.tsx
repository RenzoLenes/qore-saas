import ActivityFeed from './ActivityFeed';
import { getRecentActivity } from '@/lib/queries/dashboard';

export default async function ActivitySection() {
  const activity = await getRecentActivity();

  return (
    <div className="lg:col-span-3">
      <ActivityFeed items={activity} />
    </div>
  );
}
