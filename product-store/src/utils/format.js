export const formatPrice = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value)

export const getDiscountedPrice = (product) => {
  const discount = Number(product.discountPercentage ?? 0)
  return product.price * (1 - discount / 100)
}

export const toTitleCase = (value = "") =>
  value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

export const timeAgo = (timestamp) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)

  if (seconds < 60) {
    return `${seconds} sec ago`
  }

  const minutes = Math.floor(seconds / 60)

  if (minutes < 60) {
    return `${minutes} min ago`
  }

  const hours = Math.floor(minutes / 60)

  return `${hours} hr ago`
}