# reward-program

- Code conciderations

- When creating customers, a single customer can be on multiple companies. However, we chose not to allow the same customer to be on two comapnies by setting "unique: true" in the customer.js model. We will need to take this out and add a "unique: true" based on the combination of email/company combination.

- Controllers and Models naming convention got out of hand. We will need to identify a convention that works better. I have notes in the code on how I think I should have named these.
