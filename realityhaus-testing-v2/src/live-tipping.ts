import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  LiveTippingCreated as LiveTippingCreatedEvent,
  Tipped as TippedEvent,
} from "../generated/LiveTipping/LiveTipping";
import { Event, User, Tip } from "../generated/schema";

export function handleLiveTippingCreated(event: LiveTippingCreatedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }

  entity.baseTip = event.params.baseTip;
  entity.curatorCut = event.params.curatorCut;

  entity.save();
}

export function handleTipped(event: TippedEvent): void {
  let tip = new Tip(event.transaction.hash.toHexString());
  tip.amount = event.params.amount;

  let user = User.load(event.params.tipper.toHexString());
  if (user == null) {
    user = new User(event.params.tipper.toHexString());
    user.user = event.params.tipper;
  }
  tip.tipper = user.id;
  user.save();

  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  tip.eventId = entity.id;

  if (event.params.isHighestTip) {
    entity.highestTip = event.params.amount;
    entity.highestTipper = event.params.tipper.toHexString();
  }

  tip.save();
  entity.save();
}
