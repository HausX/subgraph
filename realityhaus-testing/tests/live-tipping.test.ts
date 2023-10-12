import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { LiveTippingCreated } from "../generated/schema"
import { LiveTippingCreated as LiveTippingCreatedEvent } from "../generated/LiveTipping/LiveTipping"
import { handleLiveTippingCreated } from "../src/live-tipping"
import { createLiveTippingCreatedEvent } from "./live-tipping-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let eventId = BigInt.fromI32(234)
    let startTime = BigInt.fromI32(234)
    let baseTip = BigInt.fromI32(234)
    let curatorCut = BigInt.fromI32(234)
    let newLiveTippingCreatedEvent = createLiveTippingCreatedEvent(
      eventId,
      startTime,
      baseTip,
      curatorCut
    )
    handleLiveTippingCreated(newLiveTippingCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LiveTippingCreated created and stored", () => {
    assert.entityCount("LiveTippingCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LiveTippingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "eventId",
      "234"
    )
    assert.fieldEquals(
      "LiveTippingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startTime",
      "234"
    )
    assert.fieldEquals(
      "LiveTippingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "baseTip",
      "234"
    )
    assert.fieldEquals(
      "LiveTippingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "curatorCut",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
