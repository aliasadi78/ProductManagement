let products = getSaveProducts()

const filters = {
    searchItem: '',
    existProduct: true,
    sortBy: 'byEdited'
}


renderProducts(products, filters)
document.querySelector('#existProduct').setAttribute('checked',filters.existProduct)
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
})

window.addEventListener('storage',function(e) {
    if (e.key === 'products') {
        products = JSON.parse(e.newValue)
        renderProducts(products, filters)
    }
})

document.querySelector("#sort").addEventListener('change', function(e){
    filters.sortBy = e.target.value
    renderProducts(products,filters)
})