let products = getSaveProducts()

const filters = {
    searchItem: '',
    existProduct: false
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
    saveProducts(products)
    renderProducts(products, filters)
    e.target.elements.productTitle.value = ''
})