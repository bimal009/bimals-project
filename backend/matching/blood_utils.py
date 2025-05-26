def is_compatible(recipient_blood, donor_blood):
    compatible = {
        "O+": ["O+", "O-"],
        "A+": ["A+", "A-", "O+", "O-"],
        "B+": ["B+", "B-", "O+", "O-"],
        "AB+": ["A+", "B+", "AB+", "O+", "A-", "B-", "AB-", "O-"]
    }
    return donor_blood in compatible.get(recipient_blood, [])
