import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Trash2, ExternalLink, ShieldCheck, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Booking } from "@/types/booking";

// Mock data — replace with Supabase queries
const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    date: "2026-03-20",
    time: "10:00",
    duration: 30,
    message: "Consultoria sobre automação",
    meet_link: "https://meet.google.com/abc-defg-hij",
    status: "confirmed",
    created_at: "2026-03-16T10:00:00Z",
  },
  {
    id: "2",
    name: "Maria Souza",
    email: "maria@email.com",
    date: "2026-03-21",
    time: "14:00",
    duration: 60,
    message: "Planejamento de marketing digital",
    meet_link: "https://meet.google.com/xyz-abcd-efg",
    status: "confirmed",
    created_at: "2026-03-16T11:00:00Z",
  },
];

const AdminPage = () => {
  const [googleConnected, setGoogleConnected] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleGoogleConnect = async () => {
    setIsConnecting(true);
    // TODO: Implement Google OAuth flow via Supabase Edge Function
    // 1. Redirect to Google OAuth consent screen
    // 2. Handle callback with auth code
    // 3. Exchange for tokens and store in Supabase
    await new Promise((r) => setTimeout(r, 1500));
    setGoogleConnected(true);
    setIsConnecting(false);
  };

  const handleCancelBooking = async (id: string) => {
    // TODO: Replace with Supabase update + Google Calendar event deletion
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-heading font-bold text-lg">
              Ravius <span className="text-gradient">Admin</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="container max-w-3xl py-10">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Painel Administrativo</h1>

        {/* Google Connect */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${googleConnected ? "bg-accent/10" : "bg-muted"}`}>
                <ShieldCheck className={`h-5 w-5 ${googleConnected ? "text-accent" : "text-muted-foreground"}`} />
              </div>
              <div>
                <p className="font-medium text-foreground">Google Calendar</p>
                <p className="text-sm text-muted-foreground">
                  {googleConnected ? "Conectado" : "Conecte para sincronizar eventos"}
                </p>
              </div>
            </div>
            <Button
              variant={googleConnected ? "heroOutline" : "cta"}
              size="sm"
              onClick={handleGoogleConnect}
              disabled={isConnecting || googleConnected}
            >
              {isConnecting && <Loader2 className="h-4 w-4 animate-spin mr-1" />}
              {googleConnected ? "Conectado ✓" : "Conectar Google"}
            </Button>
          </div>
        </motion.div>

        {/* Upcoming Meetings */}
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          Próximas Reuniões
        </h2>

        {bookings.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground text-sm">
            Nenhuma reunião agendada.
          </div>
        )}

        <div className="space-y-3">
          {bookings.map((booking, i) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border bg-card p-5 shadow-card ${
                booking.status === "cancelled" ? "opacity-50 border-destructive/30" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground">{booking.name}</p>
                  <p className="text-sm text-muted-foreground">{booking.email}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(booking.date).toLocaleDateString("pt-BR", {
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    às {booking.time} • {booking.duration} min
                  </p>
                  <p className="text-sm text-foreground/70 mt-1 truncate">{booking.message}</p>
                  {booking.status === "cancelled" && (
                    <span className="text-xs text-destructive font-medium mt-1 inline-block">Cancelada</span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {booking.meet_link && booking.status !== "cancelled" && (
                    <a href={booking.meet_link} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="icon" className="text-accent">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </a>
                  )}
                  {booking.status !== "cancelled" && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
