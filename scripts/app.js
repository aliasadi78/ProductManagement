let products = getSaveProducts()

const filters = {
    searchItem: '',
    existProduct: true,
    sortBy: 'byEdited'
}

renderProducts(products, filters)

document.querySelector('#existProduct').setAttribute('checked', filters.existProduct)
document.querySelector('#search-products').addEventListener('input', (e) => {
    filters.searchItem = e.target.value
    renderProducts(products, filters)
})
document.querySelector('#existProduct').addEventListener('change', (e) => {
    filters.existProduct = e.target.checked
    renderProducts(products, filters)
})
document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const timestamp = moment().valueOf()
    products.push({
        'id': uuidv4(),
        'title': e.target.elements.productTitle.value,
        'price': e.target.elements.productPrice.value,
        'exist': true,
        'created': timestamp,
        'updated': timestamp
    })
    saveProducts(products)
    renderProducts(products, filters)
    e.target.elements.productTitle.value = ''
    e.target.elements.productPrice.value = ''
})

window.addEventListener('storage', (e) => {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        renderProducts(products, filters)
    }
})

document.querySelector("#sort").addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderProducts(products, filters)
})