import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  FundsDistributed,
  OwnershipTransferred
} from "../generated/Distributor/Distributor"

export function createFundsDistributedEvent(
  eventId: BigInt,
  creator: Address,
  creatorAmount: BigInt,
  curator: Address,
  curatorAmount: BigInt,
  daoAmount: BigInt
): FundsDistributed {
  let fundsDistributedEvent = changetype<FundsDistributed>(newMockEvent())

  fundsDistributedEvent.parameters = new Array()

  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "eventId",
      ethereum.Value.fromUnsignedBigInt(eventId)
    )
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAmount",
      ethereum.Value.fromUnsignedBigInt(creatorAmount)
    )
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam("curator", ethereum.Value.fromAddress(curator))
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "curatorAmount",
      ethereum.Value.fromUnsignedBigInt(curatorAmount)
    )
  )
  fundsDistributedEvent.parameters.push(
    new ethereum.EventParam(
      "daoAmount",
      ethereum.Value.fromUnsignedBigInt(daoAmount)
    )
  )

  return fundsDistributedEvent
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
