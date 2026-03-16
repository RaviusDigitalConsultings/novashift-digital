import { useState, useCallback } from 'react';
import type { Booking } from '@/integrations/supabase/types';

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
    
    // TODO: Replace with actual Supabase query + Google Calendar API check
    // 1. Query bookings table for this date
    // 2. Query Google Calendar events via edge function
    // 3. Remove overlapping slots
    
    // Simulating some booked slots for demo
    const dateStr = date.toISOString().split('T')[0];
    const mockBooked = dateStr === new Date().toISOString().split('T')[0] 
      ? ['09:00', '09:30', '14:00'] 
      : [];
    
    setBookedSlots(mockBooked);
    setSelectedDate(date);
    setIsLoading(false);
  }, []);

  const createBooking = useCallback(async (data: {
    name: string;
    email: string;
    message: string;
    duration: number;
  }): Promise<Booking | null> => {
    if (!selectedDate || !selectedTime) return null;
    
    setIsLoading(true);
    
    // TODO: Replace with actual Supabase insert + Edge Function call
    // 1. Insert booking into Supabase
    // 2. Call edge function to create Google Calendar event
    // 3. Edge function creates Meet link and sends invite
    // 4. Trigger webhook
    
    const booking: Booking = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      duration: data.duration,
      message: data.message,
      meet_link: 'https://meet.google.com/xxx-xxxx-xxx', // placeholder
      status: 'confirmed',
      created_at: new Date().toISOString(),
    };
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    
    setIsLoading(false);
    return booking;
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
