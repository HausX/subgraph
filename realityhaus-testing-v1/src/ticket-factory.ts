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
  let ticket = new Ticket(event.params.eventId.toHexString());
  let user = User.load(event.params.purchaser.toHexString());
  if (user == null) {
    user = new User(event.params.purchaser.toHexString());
  }
  let temptickets = user.tickets;
  if (temptickets == null) {
    temptickets = [];
  }
  temptickets.push(ticket.id);
  user.tickets = temptickets;
  user.save();
  ticket.owner = user.id;
  ticket.event = entity.id;
  ticket.save();
  temptickets = entity.tickets;
  if (temptickets == null) {
    temptickets = [];
  }
  temptickets.push(ticket.id);
  entity.tickets = temptickets;
  entity.currentSold = entity.currentSold.plus(BigInt.fromI32(1));
  entity.save();
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let fromUser = User.load(event.params.from.toHexString());
  let toUser = User.load(event.params.to.toHexString());
  let ticket = Ticket.load(event.params.id.toHexString());
  if (ticket != null) {
    ticket.owner = event.params.to.toHexString();
    ticket.save();
  }
  if (fromUser != null) {
    let temptickets = fromUser.tickets;
    if (temptickets != null) {
      fromUser.tickets = temptickets.filter((value) => {
        return value != event.params.id.toHexString();
      });
    }
    fromUser.save();
  }

  if (toUser != null) {
    let temptickets = toUser.tickets;
    if (temptickets == null) {
      temptickets = [];
    }
    let index = temptickets.indexOf(event.params.id.toHexString());
    if (index == -1) {
      temptickets.push(event.params.id.toHexString());
    }
    toUser.tickets = temptickets;
    toUser.save();
  }
}
