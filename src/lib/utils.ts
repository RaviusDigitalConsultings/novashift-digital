import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Booking } from "@/types/booking";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Simula o envio de um e-mail de notificação para o administrador.
 * Em um cenário real, isso chamaria uma API (como SendGrid, Resend, ou Supabase Edge Function).
 */
export async function sendAdminBookingNotification(booking: Booking) {
  const adminEmail = "clearlinestrategy@gmail.com";
  
  console.log(`[Email Simulation] Enviando notificação para ${adminEmail}`);
  console.log(`
    Nova Reunião Agendada!
    ----------------------
    Nome: ${booking.name}
    E-mail: ${booking.email}
    Data: ${new Date(booking.date).toLocaleDateString("pt-BR")}
    Hora: ${booking.time}
    Duração: ${booking.duration} min
    Mensagem: ${booking.message}
    Link do Meet: ${booking.meet_link || "N/A"}
  `);

  // Simula uma chamada de API para envio de e-mail
  // Em produção, você usaria algo como:
  // await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(booking) });
  
  return Promise.resolve(true);
}
