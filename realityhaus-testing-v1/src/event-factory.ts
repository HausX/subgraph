import { BigInt } from "@graphprotocol/graph-ts";
import {
  EventCreated as EventCreatedEvent,
  EventEnded as EventEndedEvent,
  Transfer as TransferEvent,
} from "../generated/EventFactory/EventFactory";

import { Creator, Curator, Event, User } from "../generated/schema";

export function handleEventCreated(event: EventCreatedEvent): void {
  let entity = new Event(event.params.eventId.toHexString());
  let creator = Creator.load(event.params.creator.toHexString());
  if (creator == null) {
    creator = new Creator(event.params.creator.toHexString());
  }
  let tempEvents = creator.events;
  if (tempEvents == null) {
    tempEvents = [];
  }
  let index = tempEvents.indexOf(event.params.eventId.toHexString());
  if (index == -1) {
    tempEvents.push(event.params.eventId.toHexString());
  }
  creator.events = tempEvents;
  creator.creator = event.params.creator;
  creator.save();
  let curator = Curator.load(event.params.curator.toHexString());
  if (curator == null) {
    curator = new Curator(event.params.curator.toHexString());
  }
  tempEvents = curator.events;
  if (tempEvents == null) {
    tempEvents = [];
  }
  index = tempEvents.indexOf(event.params.eventId.toHexString());
  if (index == -1) {
    tempEvents.push(event.params.eventId.toHexString());
  }
  curator.events = tempEvents;
  curator.curator = event.params.curator;
  curator.save();
  entity.creator = creator.id;
  entity.curator = curator.id;
  entity.startTime = event.params.startTime;
  entity.metadata = event.params.metadata;
  entity.save();
}

export function handleEventEnded(event: EventEndedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());

  if (entity != null) {
    entity.owner = event.params.owner;
    entity.pieceCid = event.params.pieceCid;
    entity.streamURI = event.params.streamURI;
    let user = User.load(event.params.owner.toHexString());
    if (user == null) {
      user = new User(event.params.owner.toHexString());
      user.user = event.params.owner;
    }
    let tempNfts = user.nfts;
    if (tempNfts == null) {
      tempNfts = [];
    }
    let index = tempNfts.indexOf(event.params.eventId.toHexString());
    if (index == -1) {
      tempNfts.push(event.params.eventId.toHexString());
    }

    user.nfts = tempNfts;
    user.save();
    entity.save();
  }
}

export function handleTransfer(event: TransferEvent): void {
  let entity = Event.load(event.params.tokenId.toHexString());
  if (entity != null) {
    entity.owner = event.params.to;
    let from = User.load(event.params.from.toHexString());
    if (from != null) {
      let tempNfts = from.nfts;
      if (tempNfts != null) {
        from.nfts = tempNfts.filter((value) => {
          return value != event.params.tokenId.toHexString();
        });
      }
      from.save();
    }
    let to = User.load(event.params.to.toHexString());
    if (to != null) {
      let tempNfts = to.nfts;
      if (tempNfts == null) {
        tempNfts = [];
      }
      let index = tempNfts.indexOf(event.params.tokenId.toHexString());
      if (index == -1) {
        tempNfts.push(event.params.tokenId.toHexString());
      }
      to.nfts = tempNfts;
      to.save();
    }

    entity.save();
  }
}
