let products = []
let jsonProducts = localStorage.getItem('products')
products !== null && JSON.parse(jsonProducts)


const filters = {
    searchItem: '',
    existProduct: false
}

const renderProducts = function (products, filters) {
    let filteredProducts = products.filter(function (item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    filteredProducts = filteredProducts.filter(function(item) {
        return filters.existProduct ? item.exist : true
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
document.querySelector('#existProduct').addEventListener('change', function (e) {
    filters.existProduct = e.target.checked
    renderProducts(products, filters)
})
document.querySelector('#add-product-form').addEventListener('submit', function (e) {
    e.preventDefault()
    products.push({
        'title': e.target.elements.productTitle.value,
        'exist': true
    })
    localStorage.setItem('products',JSON.stringify(products))
    renderProducts(products, filters)
    e.target.elements.productTitle.value = ''
})