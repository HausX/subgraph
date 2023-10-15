import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { FundsDistributed } from "../generated/schema"
import { FundsDistributed as FundsDistributedEvent } from "../generated/Distributor/Distributor"
import { handleFundsDistributed } from "../src/distributor"
import { createFundsDistributedEvent } from "./distributor-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let eventId = BigInt.fromI32(234)
    let creator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let creatorAmount = BigInt.fromI32(234)
    let curator = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let curatorAmount = BigInt.fromI32(234)
    let daoAmount = BigInt.fromI32(234)
    let newFundsDistributedEvent = createFundsDistributedEvent(
      eventId,
      creator,
      creatorAmount,
      curator,
      curatorAmount,
      daoAmount
    )
    handleFundsDistributed(newFundsDistributedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FundsDistributed created and stored", () => {
    assert.entityCount("FundsDistributed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eventId",
      "234"
    )
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "creatorAmount",
      "234"
    )
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "curator",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "curatorAmount",
      "234"
    )
    assert.fieldEquals(
      "FundsDistributed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoAmount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
