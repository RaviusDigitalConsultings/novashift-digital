import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useBooking } from "@/hooks/useBooking";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, CheckCircle2, Video, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Booking } from "@/types/booking";

const DURATION_OPTIONS = [
  { label: "30 min", value: 30 },
  { label: "1 hora", value: 60 },
  { label: "1h30", value: 90 },
  { label: "2 horas", value: 120 },
];

const BookingPage = () => {
  const {
    selectedDate,
    selectedTime,
    setSelectedTime,
    isLoading,
    fetchAvailableSlots,
    createBooking,
    getFilteredSlots,
  } = useBooking();

  const [step, setStep] = useState<"calendar" | "form" | "confirmed">("calendar");
  const [duration, setDuration] = useState(30);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      fetchAvailableSlots(date);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const booking = await createBooking({ ...formData, duration });
    if (booking) {
      setConfirmedBooking(booking);
      setStep("confirmed");
    }
  };

  const filteredSlots = getFilteredSlots();

  const disabledDays = { before: new Date() };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-accent transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span className="font-heading font-bold text-lg">
              Ravius <span className="text-gradient">Consultorias</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="container max-w-4xl py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
            Agende sua Reunião
          </h1>
          <p className="text-muted-foreground">
            Escolha a melhor data e horário para a sua chamada estratégica.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* STEP 1: Calendar + Time Slots */}
          {step === "calendar" && (
            <motion.div
              key="calendar"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Calendar */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
                  <CalendarDays className="h-4 w-4 text-accent" />
                  Selecione uma data
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={disabledDays}
                    className="pointer-events-auto"
                  />
                </div>

                {/* Duration selector */}
                <div className="mt-6 w-full">
                  <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-accent" />
                    Duração da reunião
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {DURATION_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setDuration(opt.value)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                          duration === opt.value
                            ? "bg-accent text-accent-foreground border-accent shadow-md"
                            : "bg-card text-foreground border-border hover:border-accent/40"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-sm font-medium text-foreground">
                  <Clock className="h-4 w-4 text-accent" />
                  {selectedDate
                    ? `Horários disponíveis — ${selectedDate.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}`
                    : "Selecione uma data primeiro"}
                </div>

                {!selectedDate && (
                  <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-10 text-center text-muted-foreground text-sm">
                    Escolha uma data no calendário para ver os horários disponíveis.
                  </div>
                )}

                {selectedDate && isLoading && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-6 w-6 animate-spin text-accent" />
                  </div>
                )}

                {selectedDate && !isLoading && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto pr-1">
                    {filteredSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeSelect(time)}
                        className={`px-3 py-3 rounded-xl text-sm font-medium transition-all border ${
                          selectedTime === time
                            ? "bg-accent text-accent-foreground border-accent"
                            : "bg-card text-foreground border-border hover:border-accent hover:bg-accent/5"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                    {filteredSlots.length === 0 && (
                      <p className="col-span-full text-center text-muted-foreground py-10 text-sm">
                        Nenhum horário disponível nesta data.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* STEP 2: Booking Form */}
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto"
            >
              <button
                onClick={() => setStep("calendar")}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
              >
                <ArrowLeft className="h-3 w-3" /> Voltar
              </button>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6 p-3 rounded-xl bg-muted/50">
                  <CalendarDays className="h-5 w-5 text-accent" />
                  <div className="text-sm">
                    <p className="font-medium text-foreground">
                      {selectedDate?.toLocaleDateString("pt-BR", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-muted-foreground">
                      {selectedTime} • {duration} minutos
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Nome</label>
                    <Input
                      required
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                    <Input
                      required
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">
                      Assunto da reunião
                    </label>
                    <Textarea
                      required
                      placeholder="Descreva brevemente o assunto..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="cta"
                    className="w-full py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    Confirmar Agendamento
                  </Button>
                </form>
              </div>
            </motion.div>
          )}

          {/* STEP 3: Confirmation */}
          {step === "confirmed" && confirmedBooking && (
            <motion.div
              key="confirmed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-xl font-heading font-bold text-foreground mb-2">
                  Reunião Agendada!
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  Sua reunião foi agendada com sucesso.
                </p>

                <div className="space-y-3 text-left bg-muted/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Data</span>
                    <span className="font-medium text-foreground">
                      {new Date(confirmedBooking.date).toLocaleDateString("pt-BR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Horário</span>
                    <span className="font-medium text-foreground">{confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duração</span>
                    <span className="font-medium text-foreground">{confirmedBooking.duration} min</span>
                  </div>
                  {confirmedBooking.meet_link && (
                    <div className="flex justify-between text-sm items-center">
                      <span className="text-muted-foreground">Google Meet</span>
                      <a
                        href={confirmedBooking.meet_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-accent hover:underline font-medium"
                      >
                        <Video className="h-3 w-3" />
                        Entrar
                      </a>
                    </div>
                  )}
                </div>

                <Link to="/">
                  <Button variant="heroOutline" className="w-full">
                    Voltar ao site
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BookingPage;
