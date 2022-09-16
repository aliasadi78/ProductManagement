const getSaveProducts = function () {
    let productsJSON = localStorage.getItem('products')
    return productsJSON !== null ? JSON.parse(productsJSON) : []
}

const saveProducts = function (products) {
    localStorage.setItem('products', JSON.stringify(products))
}

const renderProducts = function (products, filters) {
    let filteredProducts = products.filter(function (item) {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    filteredProducts = filteredProducts.filter(function (item) {
        return filters.existProduct ? item.exist : true
    })
    document.querySelector('#products').innerHTML = ''
    filteredProducts.length === 0 ? emptyProducts() :
        filteredProducts.forEach(function (product) {
            document.querySelector('#products').appendChild(createProductDOM(product))
        });
}
const emptyProducts = function () {
    const message = document.createElement('div')
    message.setAttribute('class', 'empty-message')
    message.textContent = 'محصولی یافت نشد!'
    document.querySelector('#products').appendChild(message)
}

const createProductDOM = function (product) {
    const productEl = document.createElement('div')
    productEl.setAttribute('class', 'product-row')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', product.title)

    const section = document.createElement('section')
    section.setAttribute('class', 'section-product-exist')

    const divSection = document.createElement('div')

    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'btn remove-btn')
    removeButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash-can"></i>'

    const label = document.createElement('label')
    label.setAttribute('for', product.title)

    const spanCheck = document.createElement('span')
    spanCheck.setAttribute('class', 'span-check')
    const spanText = document.createElement('span')
    spanText.setAttribute('class', 'span-text')
    spanText.textContent = product.title

    const ins = document.createElement('ins')
    const i = document.createElement('i')
    i.textContent = product.title
    ins.appendChild(i)

    label.appendChild(spanCheck)
    label.appendChild(spanText)
    label.appendChild(ins)

    divSection.appendChild(checkbox)
    divSection.appendChild(label)

    section.appendChild(divSection)
    section.appendChild(removeButton)

    productEl.appendChild(section)

    return productEl
}