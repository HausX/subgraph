import { BigInt } from "@graphprotocol/graph-ts";
import {
  TicketCreated as TicketCreatedEvent,
  TicketPurchased as TicketPurchasedEvent,
  TransferSingle as TransferSingleEvent,
} from "../generated/TicketFactory/TicketFactory";
import { Event, Ticket, User } from "../generated/schema";

export function handleTicketCreated(event: TicketCreatedEvent): void {
  let entity = new Event(event.params.eventId.toHexString());
  entity.maxTickets = event.params.maxTickets;
  entity.ticketPrice = event.params.ticketPrice;

  entity.save();
}

export function handleTicketPurchased(event: TicketPurchasedEvent): void {
  let entity = new Event(event.params.eventId.toHexString());
  entity.currentSold = entity.currentSold.plus(BigInt.fromI32(1));
  entity.save();

  let user = User.load(event.params.purchaser.toHexString());
  if (user == null) {
    user = new User(event.params.purchaser.toHexString());
  }
  user.save();

  let ticket = new Ticket(event.params.eventId.toHexString());
  ticket.owner = user.id;
  ticket.event = entity.id;
  ticket.save();
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let ticket = Ticket.load(event.params.id.toHexString());
  if (ticket != null) {
    ticket.owner = event.params.to.toHexString();
    ticket.save();
  }
}
