import {
  LiveTippingCreated as LiveTippingCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Tipped as TippedEvent
} from "../generated/LiveTipping/LiveTipping"
import {
  LiveTippingCreated,
  OwnershipTransferred,
  Tipped
} from "../generated/schema"

export function handleLiveTippingCreated(event: LiveTippingCreatedEvent): void {
  let entity = new LiveTippingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.eventId = event.params.eventId
  entity.startTime = event.params.startTime
  entity.baseTip = event.params.baseTip
  entity.curatorCut = event.params.curatorCut

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTipped(event: TippedEvent): void {
  let entity = new Tipped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.eventId = event.params.eventId
  entity.tipper = event.params.tipper
  entity.amount = event.params.amount
  entity.isHighestTip = event.params.isHighestTip

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
