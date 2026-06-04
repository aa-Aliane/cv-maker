import { Briefcase, PlusCircle, GripVertical } from "lucide-react";

export default function SectionSorter() {
  return (
    <div className="bg-card p-6 border border-border rounded-xl space-y-6 shadow-sm">
      <div className="flex justify-between items-center border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-card-foreground">Work Experience</h3>
        </div>
        <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:underline">
          <PlusCircle className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {/* Dynamic Draggable Item Unit */}
        <div className="p-4 border border-border rounded-lg bg-muted/50 group relative">
          {/* Context Sorting Drag Engine Handle Pin */}
          <div className="absolute left-[-14px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab p-1 bg-card border border-border rounded shadow-sm text-muted-foreground hover:text-foreground">
            <GripVertical className="w-4 h-4" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Company
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="TechNova Systems"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Role</label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Lead UX Designer"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                Start Date
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Jan 2021"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">
                End Date
              </label>
              <input
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none transition-all"
                type="text"
                defaultValue="Present"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-medium text-muted-foreground">
                Key Responsibilities
              </label>
              <textarea
                className="w-full px-3 py-2 border border-input rounded bg-background text-sm focus:ring-2 focus:ring-ring outline-none resize-none leading-relaxed transition-all"
                rows={4}
                defaultValue={`• Spearheaded the redesign of the core SaaS platform, resulting in a 40% increase in user engagement.\n• Collaborated with cross-functional teams to define product vision and roadmap.\n• Managed a team of 4 junior designers and mentored them on design systems.`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
