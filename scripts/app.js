const products = []

const filters = {
    searchItem: ''
}

const renderProducts = function (products, filters) {
    const filteredProducts = products.filter(function (item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    document.querySelector('#products').innerHTML = ''
    filteredProducts.length === 0 ? emptyProducts() :
        filteredProducts.forEach(function (item) {
            const productEl = document.createElement('p')
            productEl.setAttribute('class', 'product-row')
            productEl.textContent = item.title
            document.querySelector('#products').appendChild(productEl)
        });
}
const emptyProducts = function () {
    const message = document.createElement('div')
    message.setAttribute('class', 'empty-message')
    message.textContent = 'محصولی یافت نشد!'
    document.querySelector('#products').appendChild(message)
}
renderProducts(products, filters)

document.querySelector('#search-products').addEventListener('input', function (e) {
    filters.searchItem = e.target.value
    renderProducts(products, filters)
})

document.querySelector('#add-product-form').addEventListener('submit', function (e) {
    e.preventDefault()
    products.push({
        'title': e.target.elements.productTitle.value,
        'exist': true
    })
    renderProducts(products, filters)
    e.target.elements.productTitle.value = ''
})