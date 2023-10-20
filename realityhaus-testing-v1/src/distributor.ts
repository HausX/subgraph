import { BigInt } from "@graphprotocol/graph-ts";
import { FundsDistributed as FundsDistributedEvent } from "../generated/Distributor/Distributor";
import { Creator, Curator } from "../generated/schema";

export function handleFundsDistributed(event: FundsDistributedEvent): void {
  let creator = Creator.load(event.params.creator.toHexString());
  if (creator == null) {
    creator = new Creator(event.params.creator.toHexString());
  }
  let curator = Curator.load(event.params.curator.toHexString());
  if (curator == null) {
    curator = new Curator(event.params.curator.toHexString());
  }
  creator.income = creator.income.plus(event.params.creatorAmount);
  curator.income = curator.income.plus(event.params.curatorAmount);
  creator.save();
  curator.save();
}
