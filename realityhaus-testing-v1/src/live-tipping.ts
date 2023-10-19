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
  entity.highestTip = BigInt.fromI32(0);
  entity.highestTipper = Bytes.empty().toHexString();

  entity.save();
}

export function handleTipped(event: TippedEvent): void {
  let tip = new Tip(event.transaction.hash.toHexString());
  tip.eventId = event.params.eventId.toHexString();
  tip.tipper = event.params.tipper.toHexString();
  tip.amount = event.params.amount;
  tip.save();

  let user = User.load(event.params.tipper.toHexString());
  if (user == null) {
    user = new User(event.params.tipper.toHexString());
  }
  user.save();

  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  if (event.params.isHighestTip) {
    entity.highestTip = event.params.amount;
    entity.highestTipper = event.params.tipper.toHexString();
  }
  entity.save();
}
