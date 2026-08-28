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






# Day 2

## 1. Nullish coalescing

The stockLabel drill showed me that ?? and || are not the same. When stock was 0, ?? kept the value as 0 while || treated it as false and used the fallback. Using || would have made a product with zero stock look like it had the fallback value instead of showing the actual zero.

## 2. ES6 drill

The grouping exercises using reduce took me the longest because I had to understand what the accumulator should contain. Once I started thinking of the accumulator as the object being built one item at a time, the logic became easier. Object.entries also helped when I needed to turn the grouped object back into an array.

## 3. Sort mutation

Using sort directly on an array can change the original array. In a React component this could change the state array itself and cause unexpected ordering or rendering problems. Copying the array with [...items] before sorting gives a new array and keeps the original state untouched.

## 4. Boolean comparator

The comparator (a, b) => a.price > b.price does not give sort the three possible results it needs. It only returns true or false, which JavaScript converts into numbers but does not correctly describe whether a should come before or after b. My drill showed that the result could look partly sorted but still be in the wrong order.

## 5. Redundant state

I removed redundant state that could be calculated from existing data. The main example was values such as the cart total and item count. They did not need their own state because they can always be calculated directly from the cart items.

## 6. URL filters

Putting the filters in the URL made the product view shareable and bookmarkable. Refreshing the page also keeps the selected filters instead of resetting them. The browser Back button can also move between deliberate filter and page changes.

## 7. Custom hooks

The useDebounce hook removed repeated timer logic from the product search. The useFetch hook also made the data-loading pattern easier to reuse because loading, error, data and retry are handled in one place.

## 8. Still unfinished or shaky

The part I still want more practice with is the analytics calculations and joining data from different API responses. The dashboard works, but I want to become faster at checking whether calculated numbers are correct before working on the UI. I also want more practice with URL state when several filters and sorting values are changed together.