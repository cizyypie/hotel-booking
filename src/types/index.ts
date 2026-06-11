import { t, type Static } from 'elysia';

export const FacilitySchema = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.Nullable(t.String()),
  createdAt: t.Any(),
  updatedAt: t.Any()
});

export const RoomSchema = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.Nullable(t.String()),
  pricePerNight: t.Number(),
  capacity: t.Number(),
  facilities: t.Any(),
  isAvailable: t.Nullable(t.Boolean()),
  roomNumber: t.String(),
  floorNumber: t.String(),
  createdAt: t.Any(),
  updatedAt: t.Any()
});

export const CreateRoomSchema = t.Object({
  name: t.String(),
  description: t.String(),
  pricePerNight: t.Number(),
  capacity: t.Number(),
  facilityIds: t.Array(t.String()),
  roomNumber: t.String(),
  floorNumber: t.String()
});

export const CustomerSchema = t.Object({
  id: t.String(),
  name: t.String(),
  email: t.String(),
  phone: t.Nullable(t.String()),
  address: t.Nullable(t.String()),
  idNumber: t.Nullable(t.String()),
  idType: t.Nullable(t.String()),
  createdAt: t.Any(),
  updatedAt: t.Any()
});

export const CreateCustomerSchema = t.Object({
  name: t.String(),
  email: t.String(),
  phone: t.Optional(t.String()),
  address: t.Optional(t.String()),
  idNumber: t.Optional(t.String()),
  idType: t.Optional(t.String())
});

export const BookingRequestSchema = t.Object({
  roomId: t.String(),
  guestName: t.String(),
  guestEmail: t.String(),
  guestPhone: t.Optional(t.String()),
  checkIn: t.String(),
  checkOut: t.String(),
  numberOfGuests: t.Number(),
  specialRequests: t.Optional(t.String())
});

export type Facility = Static<typeof FacilitySchema>;
export type Room = Static<typeof RoomSchema>;
export type Customer = Static<typeof CustomerSchema>;
export type BookingRequest = Static<typeof BookingRequestSchema>;

export type Booking = {
  id: string;
  roomId: string;
  customerId?: string | null;
  guestName: string;
  guestEmail: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  numberOfGuests: number;
  specialRequests?: string | null;
  paymentStatus?: string | null;
  stripeSessionId?: string | null;
  cancellationReason?: string | null;
  createdAt?: Date | null;
  updatedAt?: Date | null;
};