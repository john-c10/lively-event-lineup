import { Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";
import { type EventItem, formatDate, minPrice } from "@/data/events";

export function EventCard({ e, i = 0 }: { e: EventItem; i?: number }) {
  return (
    <Link to="/events/$id" params={{ id: e.id }} className="group card-event reveal" style={{ animationDelay: `${i * 80}ms` }}>
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={e.image} alt={e.title} loading="lazy" width={1024} height={768} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <span className="chip absolute left-3 top-3">{e.category}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
        <p className="absolute bottom-3 left-4 font-display text-lg font-bold">From <span className="text-primary">K{minPrice(e)}</span></p>
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-bold group-hover:text-primary transition-colors">{e.title}</h3>
        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground"><Calendar size={14} /> {formatDate(e.date)} · {e.time}</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><MapPin size={14} /> {e.venue}, {e.city}</p>
      </div>
    </Link>
  );
}
