const titleProduct = document.querySelector('#product-title')
const priceProduct = document.querySelector('#product-price')
const dateProduct = document.querySelector('#last-edit')

const productId = location.hash.substring(1)
let products = getSaveProducts()
let product = products.find(item => item.id === productId)

product === undefined && location.assign('/index.html')

titleProduct.value = product.title
priceProduct.value = product.price
dateProduct.textContent = lastEditMessage(product.updated)

titleProduct.addEventListener('input', (e) => {
    product.title = e.target.value
    product.updated = moment().valueOf()
    dateProduct.textContent = lastEditMessage(product.updated)
    saveProducts(products)
})

priceProduct.addEventListener('input', (e) => {
    product.price = e.target.value
    product.updated = moment().valueOf()
    dateProduct.textContent = lastEditMessage(product.updated)
    saveProducts(products)
})

document.querySelector('#remove-btn').addEventListener('click', (e) => {
    removeProduct(product.id)
    saveProducts(products)
    location.assign('/index.html')
})
window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        product = products.find(item => item.id = productId)
        product === undefined && location.assign('/index.html')
        titleProduct.value = product.title
        priceProduct.value = product.price
        dateProduct.textContent = lastEditMessage(product.updated)
    }
})