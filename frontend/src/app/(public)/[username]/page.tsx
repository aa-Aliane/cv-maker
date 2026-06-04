import { CvRenderEngine } from "@/features/cv-viewer/components/cv-render-engine";

export default function PublicProfilePage({ params }: { params: { username: string } }) {
  return <CvRenderEngine username={params.username} />;
}
