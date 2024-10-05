import { BigInt } from "@graphprotocol/graph-ts"
import { Transfer as TransferEvent } from "../generated/ERC20/ERC20"
import { Token, User, Transfer } from "../generated/schema"

export function handleTransfer(event: TransferEvent): void {
  let token = Token.load(event.address.toHexString())
  if (!token) {
    token = new Token(event.address.toHexString())
    token.symbol = "TOKEN" 
    token.name = "Token Name" 
    token.decimals = 18 
    token.totalSupply = BigInt.fromI32(0)
  }

  
  let fromUser = User.load(event.params.from.toHexString())
  if (!fromUser) {
    fromUser = new User(event.params.from.toHexString())
    fromUser.address = event.params.from
    fromUser.balance = BigInt.fromI32(0)
  }

  // Ensure the user has enough balance before transferring
  if (fromUser.balance.ge(event.params.value)) {
    fromUser.balance = fromUser.balance.minus(event.params.value)
  } else {
   
    fromUser.balance = BigInt.fromI32(0) 
  }
  fromUser.save()

  // To User (Receiver)
  let toUser = User.load(event.params.to.toHexString())
  if (!toUser) {
    toUser = new User(event.params.to.toHexString())
    toUser.address = event.params.to
    toUser.balance = BigInt.fromI32(0)
  }
  toUser.balance = toUser.balance.plus(event.params.value)
  toUser.save()

 
  let transfer = new Transfer(event.transaction.hash.toHexString() + "-" + event.logIndex.toString())
  transfer.from = fromUser.id
  transfer.to = toUser.id
  transfer.value = event.params.value
  transfer.timestamp = event.block.timestamp
  transfer.block = event.block.number
  transfer.save()
}
