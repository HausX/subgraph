import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  TicketCreated as TicketCreatedEvent,
  TicketPurchased as TicketPurchasedEvent,
} from "../generated/TicketFactory/TicketFactory";
import { Event, Ticket, User } from "../generated/schema";

export function handleTicketCreated(event: TicketCreatedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }

  entity.maxTickets = event.params.maxTickets;
  entity.ticketPrice = event.params.ticketPrice;

  entity.save();
}

export function handleTicketPurchased(event: TicketPurchasedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  if (entity.currentSold == null) {
    entity.currentSold = BigInt.fromI32(0);
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
