import { usePrograms } from '../api/dashboard.ts'
import { ProgramCard } from './ProgramCard.tsx'

export function ProgramsSection() {
  const { data: programs, isLoading } = usePrograms()

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">Programas</h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {isLoading || !programs
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse rounded-2xl bg-border/60" />
            ))
          : programs.map((program) => <ProgramCard key={program.id} program={program} />)}
      </div>
    </section>
  )
}
