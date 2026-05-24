from substrateinterface import SubstrateInterface, Keypair
import json

try:

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

    keypair = Keypair.create_from_uri('//Alice')

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

    result = {
        "success": True,
        "chain": str(portaldot.chain),
        "fee": str(payment_info["partialFee"]),
        "weight": str(payment_info["weight"]),
        "class": str(payment_info["class"])
    }

    print(json.dumps(result))

except Exception as e:

    result = {
        "success": False,
        "error": str(e)
    }

    print(json.dumps(result))