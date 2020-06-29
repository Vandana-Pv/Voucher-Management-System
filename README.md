# Voucher-Management-System
The voucher management system generates a voucher and sends an email to the user regarding the voucher details. Users can redeem the voucher 5 times based on voucher worth.

*Voucher Format*

Type: String, Prefix - “VCD”, Suffix- 10 Random strings and numbers

*Voucher PIN*

Type: String, Format: 5 randomly generated strings

### Voucher Redemption Rule

1. A voucher can be redeemed only by the assigned email id.
2. A voucher code should be submitted along with the PIN to redeem it.
3. A voucher code is only valid for 24 hours from the time of generation.
4. A voucher code can only be utilised partially upto 5 times. Ex: Voucher code
worth Rs 1000 can be used 5 times(400, 100, 200, 200, 100)

### Voucher Generation API 

1. Authentication(JWT) should be provided to consume the API.
2. A Voucher code should be generated along with a PIN.
3. A Voucher Code is generated for an email ID. On successful generation of the
voucher, an email should be sent to the respective email address.
4. Manage a voucher log, where all the details of the voucher should be
stored(Code, PIN(encrypted), email, generation time, usage activity, status).
5. A response has to be sent containing the voucher details.

### Voucher Redeem API

1. A Voucher can only be redeemed by the assigned email id.
2. A Voucher can be redeemed only if a correct pin has been sent.
3. Voucher Redemption should follow all the Redemption Rules mentioned above.
4. Update the voucher logs.
5. A response has to be sent containing the redemption details and voucher
details.

