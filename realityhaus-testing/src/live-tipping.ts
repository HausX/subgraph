import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  LiveTippingCreated as LiveTippingCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Tipped as TippedEvent,
} from "../generated/LiveTipping/LiveTipping";
import { Event, User, Tip } from "../generated/schema";

export function handleLiveTippingCreated(event: LiveTippingCreatedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  entity.startTime = event.params.startTime;
  entity.baseTip = event.params.baseTip;
  entity.curatorCut = event.params.curatorCut;
  entity.highestTip = BigInt.fromI32(0);
  entity.highestTipper = Bytes.empty();

  entity.save();
}

export function handleTipped(event: TippedEvent): void {
  let entity = Event.load(event.params.eventId.toHexString());
  let tip = new Tip(event.transaction.hash.toHexString());
  tip.eventId = event.params.eventId;
  tip.tipper = event.params.tipper;
  tip.amount = event.params.amount;
  tip.save();
  if (entity == null) {
    entity = new Event(event.params.eventId.toHexString());
  }
  let tempTips = entity.tips;
  if (tempTips == null) {
    tempTips = [];
  }
  let index = tempTips.indexOf(tip.id);
  if (index == -1) {
    tempTips.push(tip.id);
  }
  entity.tips = tempTips;
  if (event.params.isHighestTip) {
    entity.highestTip = event.params.amount;
    entity.highestTipper = event.params.tipper;
  }
  entity.save();
  entity.eventId = event.params.eventId;
  entity.tipper = event.params.tipper;
  entity.amount = event.params.amount;
  entity.isHighestTip = event.params.isHighestTip;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
