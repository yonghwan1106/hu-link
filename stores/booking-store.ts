import { create } from 'zustand';
import { Facility } from '@/lib/data/facilities';
import { RecommendedRoute } from '@/lib/data/routes';

interface BookingState {
  selectedFacility: Facility | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  participants: number;
  selectedRoute: RecommendedRoute | null;
  requireAccessible: boolean;

  setSelectedFacility: (facility: Facility | null) => void;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
  setParticipants: (count: number) => void;
  setSelectedRoute: (route: RecommendedRoute | null) => void;
  setRequireAccessible: (required: boolean) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedFacility: null,
  selectedDate: null,
  selectedTime: null,
  participants: 1,
  selectedRoute: null,
  requireAccessible: false,

  setSelectedFacility: (facility) => set({ selectedFacility: facility }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setSelectedTime: (time) => set({ selectedTime: time }),
  setParticipants: (count) => set({ participants: count }),
  setSelectedRoute: (route) => set({ selectedRoute: route }),
  setRequireAccessible: (required) => set({ requireAccessible: required }),
  resetBooking: () => set({
    selectedFacility: null,
    selectedDate: null,
    selectedTime: null,
    participants: 1,
    selectedRoute: null,
    requireAccessible: false,
  }),
}));
