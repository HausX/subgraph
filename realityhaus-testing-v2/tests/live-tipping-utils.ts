import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  LiveTippingCreated,
  OwnershipTransferred,
  Tipped
} from "../generated/LiveTipping/LiveTipping"

export function createLiveTippingCreatedEvent(
  eventId: BigInt,
  startTime: BigInt,
  baseTip: BigInt,
  curatorCut: BigInt
): LiveTippingCreated {
  let liveTippingCreatedEvent = changetype<LiveTippingCreated>(newMockEvent())

  liveTippingCreatedEvent.parameters = new Array()

  liveTippingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  liveTippingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "startTime",
      ethereum.Value.fromUnsignedBigInt(startTime)
    )
  )
  liveTippingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "baseTip",
      ethereum.Value.fromUnsignedBigInt(baseTip)
    )
  )
  liveTippingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "curatorCut",
      ethereum.Value.fromUnsignedBigInt(curatorCut)
    )
  )

  return liveTippingCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTippedEvent(
  eventId: BigInt,
  tipper: Address,
  amount: BigInt,
  isHighestTip: boolean
): Tipped {
  let tippedEvent = changetype<Tipped>(newMockEvent())

  tippedEvent.parameters = new Array()

  tippedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  tippedEvent.parameters.push(
    new ethereum.EventParam("tipper", ethereum.Value.fromAddress(tipper))
  )
  tippedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tippedEvent.parameters.push(
    new ethereum.EventParam(
      "isHighestTip",
      ethereum.Value.fromBoolean(isHighestTip)
    )
  )

  return tippedEvent
}
