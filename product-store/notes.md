# Notes

## 1. Notification badge

When I removed position relative from the avatar wrapper, the badge moved away from the avatar and appeared near the page corner. This happened because the absolute badge could no longer use the avatar wrapper as its containing block. It started positioning itself relative to the nearest positioned ancestor, or the page when there was no positioned ancestor.

## 2. Stacking context

The card stayed behind the other card even after I increased its z-index to 9999. The wrapper had transform scale set on it, which created a new stacking context. Because of that, the card's z-index was only being compared with elements inside that wrapper. Increasing the card's z-index could not make it escape that stacking context.

## 3. Wrong-row bug

I gave the list items key={index}, increased the quantity of the last product and then sorted the products by price. The quantity stayed in the same screen position instead of staying with the product I changed. After changing the key to product.id, the quantity stayed attached to the correct product after sorting. The stable id gives React a real identity for each product.

## 4. URL filter state

Keeping the filters in the URL means I can copy the product page URL and open the same filtered view in another tab. It also means the browser back and forward buttons can move between different filter states. The selected search, category and sorting options are therefore not lost when the URL is shared.

## 5. Local state

I kept the selected gallery image in local useState instead of putting it in Zustand. Only the product detail page needs that value, so making it global would add unnecessary shared state. Zustand is more useful for data such as cart items that are needed by different parts of the application.

## 6. What I am least confident about

The part I am least confident about is combining different product filters while keeping the API requests and URL state in sync. I understand how the search parameters work, but I still want more practice with handling multiple filters together. I also want to become faster at debugging React state and routing issues without depending on trial and error.