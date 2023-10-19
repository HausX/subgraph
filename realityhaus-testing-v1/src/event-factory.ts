import { BigInt } from "@graphprotocol/graph-ts";
import {
  EventCreated as EventCreatedEvent,
  EventEnded as EventEndedEvent,
  Transfer as TransferEvent,
} from "../generated/EventFactory/EventFactory";

import { Creator, Curator, Event, User } from "../generated/schema";

export function handleEventCreated(event: EventCreatedEvent): void {
  let creator = Creator.load(event.params.creator.toHexString());
  if (creator == null) {
    creator = new Creator(event.params.creator.toHexString());
  }
  creator.creator = event.params.creator;
  creator.save();
  let curator = Curator.load(event.params.curator.toHexString());
  if (curator == null) {
    curator = new Curator(event.params.curator.toHexString());
  }
  curator.curator = event.params.curator;
  curator.save();

  let entity = new Event(event.params.eventId.toHexString());

  entity.creator = creator.id;
  entity.curator = curator.id;
  entity.startTime = event.params.startTime;
  entity.metadata = event.params.metadata;
  entity.save();
}

export function handleEventEnded(event: EventEndedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());

  if (entity != null) {
    entity.owner = event.params.owner.toHexString();
    entity.pieceCid = event.params.pieceCid;
    entity.streamURI = event.params.streamURI;
    entity.save();
  }

  let user = User.load(event.params.owner.toHexString());
  if (user == null) {
    user = new User(event.params.owner.toHexString());
    user.user = event.params.owner;
  }
  user.save();
}

export function handleTransfer(event: TransferEvent): void {
  let entity = Event.load(event.params.tokenId.toHexString());
  if (entity != null) {
    entity.owner = event.params.to.toHexString();
    entity.save();
  }
}
