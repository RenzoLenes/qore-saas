import ActivityFeed from './ActivityFeed';
import { getRecentActivity } from '@/lib/queries/dashboard';

export default async function ActivitySection() {
  const activity = await getRecentActivity();

  return <ActivityFeed items={activity} />;
}
