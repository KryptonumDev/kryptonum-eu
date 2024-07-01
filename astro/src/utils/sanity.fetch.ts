import type { QueryParams } from 'sanity'
import { createClient } from '@sanity/client';
import { isPreviewDeployment } from '@/utils/is-preview-deployment';

const projectId = '672hifzl';
const token = import.meta.env.SANITY_API_TOKEN;
const dataset = 'production';
const apiVersion = '2024-06-26';

if (isPreviewDeployment && !token) {
  throw new Error('The `SANITY_API_TOKEN` environment variable is required.');
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: isPreviewDeployment ? 'previewDrafts' : 'published',
  ...(isPreviewDeployment && { token }),
});

export default async function sanityFetch<QueryResponse>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<QueryResponse> {
  return await client.fetch<QueryResponse>(query, params);
}
