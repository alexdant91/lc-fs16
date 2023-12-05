# sistema carrello

## struttura dati

- [x] users
- [x] admin
- [x] products
- [x] categories
- [x] carts
- [x] cart products
- [x] promo codes
- [x] shippings
- [x] ratings
- [ ] wishlists
- [ ] wishlist products
- [ ] orders

step
1.creo modello su db
2.registro index db
3creo route api
4.registro route index api
5.creo controller - uno per una singola recensione - uno per tutte le recensioni impaginate per uno specifico prodotto - una per creare una recensione 6. inserisco controller nella route di api subito dopo authUser.

rating: 4
ratingCount: 90

newRating = ((ratingCount \* rating) + addedRating) / (ratingCount + 1)
