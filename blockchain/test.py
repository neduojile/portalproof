from substrateinterface import SubstrateInterface, Keypair

portaldot = SubstrateInterface(
    url="wss://mainnet.portaldot.io",
    ss58_format=42,
    type_registry={
        "types": {
            "Address": "MultiAddress",
            "LookupSource": "MultiAddress"
        }
    }
)

print("Connected to:", portaldot.chain)

Keypair.create_from_mnemonic("YOUR_MNEMONIC")

call = portaldot.compose_call(
    call_module='Balances',
    call_function='transfer_keep_alive',
    call_params={
        'dest': '5FHneW46xGXgs5mUiveU4sbTyGBzmstUspZC92UhjJM694ty',
        'value': 1 * 10 ** 12
    }
)

payment_info = portaldot.get_payment_info(
    call=call,
    keypair=keypair
)

print("Fee info:", payment_info)

extrinsic = portaldot.create_signed_extrinsic(
    call=call,
    keypair=keypair
)

receipt = portaldot.submit_extrinsic(
    extrinsic,
    wait_for_inclusion=True
)

print("Transaction Hash:", receipt.extrinsic_hash)
print("Block Hash:", receipt.block_hash)