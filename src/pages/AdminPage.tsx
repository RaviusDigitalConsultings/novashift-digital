import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar, Trash2, ExternalLink, Lock, Video, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Booking } from "@/types/booking";

// Credenciais de Admin
const ADMIN_CREDENTIALS = {
  user: "RaviusAdmin",
  pass: "ravius123",
};

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingMeetId, setEditingMeetId] = useState<string | null>(null);
  const [tempMeetLink, setTempMeetLink] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const session = localStorage.getItem("ravius_admin_session");
    if (session === "true") {
      setIsLoggedIn(true);
      fetchBookings();
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("date", { ascending: true })
        .order("time", { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (error: any) {
      console.error("Erro ao carregar agendamentos:", error.message);
      toast.error("Não foi possível carregar as reuniões.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.user && password === ADMIN_CREDENTIALS.pass) {
      setIsLoggedIn(true);
      localStorage.setItem("ravius_admin_session", "true");
      toast.success("Login realizado com sucesso!");
      fetchBookings();
    } else {
      toast.error("Usuário ou senha incorretos.");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("ravius_admin_session");
  };

  const handleCancelBooking = async (id: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", id);

      if (error) throw error;

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: "cancelled" as const } : b))
      );
      toast.success("Reunião cancelada.");
    } catch (error: any) {
      toast.error("Erro ao cancelar reunião.");
    }
  };

  const handleMeetClick = (booking: Booking) => {
    if (booking.meet_link) {
      window.open(booking.meet_link, "_blank");
    } else {
      setEditingMeetId(booking.id);
      setTempMeetLink("");
    }
  };

  const saveMeetLink = async (id: string) => {
    if (editingMeetId !== id) return;

    if (!tempMeetLink.trim()) {
      setEditingMeetId(null);
      return;
    }

    let finalLink = tempMeetLink.trim();
    if (!finalLink.startsWith("http")) {
      finalLink = `https://${finalLink}`;
    }

    try {
      const { error } = await supabase
        .from("bookings")
        .update({ meet_link: finalLink })
        .eq("id", id);

      if (error) throw error;

      setBookings(prev => prev.map(b => b.id === id ? { ...b, meet_link: finalLink } : b));
      setEditingMeetId(null);
      toast.success("Link do Meet salvo!");
    } catch (error: any) {
      toast.error("Erro ao salvar link do Meet.");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-accent transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar para o site</span>
            </Link>
            <h1 className="text-3xl font-heading font-bold text-foreground">
              Ravius <span className="text-gradient">Admin</span>
            </h1>
            <p className="text-muted-foreground mt-2">Acesso restrito para administradores</p>
          </div>

          <form onSubmit={handleLogin} className="rounded-2xl border border-border bg-card p-8 shadow-card space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <Input
                id="username"
                type="text"
                placeholder="Seu usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 text-lg">
              Entrar
              <Lock className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </motion.div>
      </div>
    );
  }

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
          <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted-foreground hover:text-destructive">
            Sair
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl py-10">
        <h1 className="text-2xl font-heading font-bold text-foreground mb-8">Painel Administrativo</h1>

        {/* Upcoming Meetings */}
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-accent" />
          Próximas Reuniões
        </h2>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="h-8 w-8 text-accent animate-spin" />
            <p className="text-sm text-muted-foreground">Carregando reuniões...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground text-sm">
            Nenhuma reunião agendada.
          </div>
        ) : (
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
                        year: "numeric"
                      })}{" "}
                      às {booking.time} • {booking.duration} min
                    </p>
                    <p className="text-sm text-foreground/70 mt-1 truncate">{booking.message}</p>
                    {booking.status === "cancelled" && (
                      <span className="text-xs text-destructive font-medium mt-1 inline-block">Cancelada</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {booking.status !== "cancelled" && (
                      <div className="flex items-center gap-2">
                        {editingMeetId === booking.id ? (
                          <div className="flex items-center gap-1 animate-in fade-in slide-in-from-right-2 duration-200">
                            <Input
                              ref={inputRef}
                              className="h-8 w-40 text-xs"
                              placeholder="Link do Meet..."
                              value={tempMeetLink}
                              onChange={(e) => setTempMeetLink(e.target.value)}
                              onBlur={() => saveMeetLink(booking.id)}
                              onKeyDown={(e) => e.key === "Enter" && saveMeetLink(booking.id)}
                              autoFocus
                            />
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-accent"
                              onClick={() => saveMeetLink(booking.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant={booking.meet_link ? "default" : "outline"}
                            size="sm"
                            className="h-8 px-3 text-xs gap-1.5"
                            onClick={() => handleMeetClick(booking)}
                          >
                            <Video className="h-3.5 w-3.5" />
                            Meet
                            {booking.meet_link && <ExternalLink className="h-3 w-3 ml-0.5" />}
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
