import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  TicketCreated as TicketCreatedEvent,
  TicketPurchased as TicketPurchasedEvent,
  TicketTransferred as TicketTransferredEvent,
} from "../generated/TicketFactory/TicketFactory";
import { Event, Ticket, User } from "../generated/schema";

export function handleTicketCreated(event: TicketCreatedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }

  entity.maxTickets = event.params.maxTickets;
  entity.ticketPrice = event.params.ticketPrice;
  entity.currentSold = BigInt.fromI32(0);
  entity.save();
}

export function handleTicketPurchased(event: TicketPurchasedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }

  entity.currentSold = entity.currentSold.plus(BigInt.fromI32(1));
  entity.save();
  let user = User.load(event.params.purchaser.toHexString());
  if (user == null) {
    user = new User(event.params.purchaser.toHexString());
    user.user = event.params.purchaser;
  }
  user.save();
  let ticket = new Ticket(event.params.ticketId.toHexString());
  ticket.owner = user.id;
  ticket.event = entity.id;
  ticket.save();
}

export function handleTicketTransferred(event: TicketTransferredEvent): void {
  let ticket = Ticket.load(event.params.ticketId.toHexString());
  let entity = Event.load(event.params.eventId.toHexString());
  let user = User.load(event.params.to.toHexString());
  if (user == null) {
    user = new User(event.params.to.toHexString());
    user.user = event.params.to;
    user.save();
  }

  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  if (ticket == null) {
    ticket = new Ticket(event.params.ticketId.toHexString());
  }
  ticket.event = entity.id;
  ticket.owner = user.id;
  ticket.owner = user.id;
  ticket.save();
  entity.save();
}
