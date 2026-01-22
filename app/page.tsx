import { headers } from 'next/headers';

import HomeClient from '@/components/main/home-client';
import { getVisitorStats } from '@/app/actions/visitors';
import { getBlogPosts } from '@/lib/blog';
import {
  getClientIpFromHeaders,
  getLocationFromIp,
  getWeatherFromCoords,
} from '@/lib/location';
import { getNewsData } from '@/lib/server-data';

export default async function Home() {
  const headerList = await headers();
  const clientIp = getClientIpFromHeaders(headerList);
  const locationPromise = getLocationFromIp(clientIp); // Start fetching location in parallel with others

  const [newsResult, blogResult, visitorResult, locationResult] =
    await Promise.allSettled([
      getNewsData(),
      getBlogPosts(),
      getVisitorStats(),
      locationPromise, // Resolve location here
    ]);

  const news = newsResult.status === 'fulfilled' ? newsResult.value : [];
  const blogData =
    blogResult.status === 'fulfilled'
      ? blogResult.value
      : { posts: [], lastUpdated: undefined };
  const visitorStats =
    visitorResult.status === 'fulfilled' ? visitorResult.value : null;
  const location =
    locationResult.status === 'fulfilled' ? locationResult.value : null;

  let weather = null;
  if (location && location.latitude && location.longitude) {
    try {
      weather = await getWeatherFromCoords(
        location.latitude,
        location.longitude
      );
    } catch {
      weather = null;
    }
  }

  return (
    <HomeClient
      news={news}
      blogPosts={blogData.posts}
      blogLastUpdated={blogData.lastUpdated}
      location={location}
      weather={weather}
      visitorStats={visitorStats}
    />
  );
}
