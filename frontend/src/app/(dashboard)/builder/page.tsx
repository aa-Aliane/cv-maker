import FormWizard from "@/features/cv-builder/components/form-wizard";
import ResumeSections from "@/features/cv-builder/components/resume-sections";
import CvRenderEngine from "@/features/cv-viewer/components/cv-render-engine";

export default function BuilderPage() {
  return (
    <div className="flex h-[calc(100vh-64px)] w-full bg-muted/50 overflow-hidden">
      {/* LEFT COLUMN */}
      <main className="flex-1 overflow-y-auto">
        <FormWizard>
          <ResumeSections />
        </FormWizard>
      </main>

      {/* RIGHT COLUMN: Just render the engine directly! */}
      <CvRenderEngine />
    </div>
  );
}
