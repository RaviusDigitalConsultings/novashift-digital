import { useState, useCallback } from 'react';
import type { Booking } from '@/types/booking';
import { sendAdminBookingNotification } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

// Simulated available slots - replace with Supabase + Google Calendar API
const generateTimeSlots = (start: number, end: number, interval: number): string[] => {
  const slots: string[] = [];
  for (let hour = start; hour < end; hour++) {
    for (let min = 0; min < 60; min += interval) {
      if (hour === end - 1 && min + interval > 60) break;
      slots.push(`${String(hour).padStart(2, '0')}:${String(min).padStart(2, '0')}`);
    }
  }
  return slots;
};

export const useBooking = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  const availableSlots = generateTimeSlots(8, 20, 30);

  const fetchAvailableSlots = useCallback(async (date: Date) => {
    setIsLoading(true);
    setSelectedTime(null);
    
    try {
      const dateStr = date.toISOString().split('T')[0];
      const { data, error } = await supabase
        .from('bookings')
        .select('time')
        .eq('date', dateStr)
        .eq('status', 'confirmed');

      if (error) throw error;
      
      const booked = data?.map(b => b.time) || [];
      setBookedSlots(booked);
      setSelectedDate(date);
    } catch (error: any) {
      console.error('Erro ao buscar slots:', error.message);
      setBookedSlots([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (data: {
    name: string;
    email: string;
    message: string;
    duration: number;
  }): Promise<Booking | null> => {
    if (!selectedDate || !selectedTime) return null;
    
    setIsLoading(true);
    
    try {
      const bookingData = {
        name: data.name,
        email: data.email,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        duration: data.duration,
        message: data.message,
        status: 'confirmed' as const,
      };

      const { data: result, error } = await supabase
        .from('bookings')
        .insert([bookingData])
        .select()
        .single();

      if (error) throw error;

      const booking: Booking = result;
      
      // Notifica o administrador sobre o novo agendamento
      await sendAdminBookingNotification(booking);
      
      return booking;
    } catch (error: any) {
      console.error('Erro ao criar agendamento:', error.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [selectedDate, selectedTime]);

  const getFilteredSlots = () => {
    return availableSlots.filter(slot => !bookedSlots.includes(slot));
  };

  return {
    selectedDate,
    selectedTime,
    setSelectedTime,
    isLoading,
    fetchAvailableSlots,
    createBooking,
    getFilteredSlots,
  };
};
