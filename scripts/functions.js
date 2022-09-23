const getSaveProducts = function () {
    let productsJSON = localStorage.getItem('products')
    return productsJSON !== null ? JSON.parse(productsJSON) : []
}

const saveProducts = function (products) {
    localStorage.setItem('products', JSON.stringify(products))
}
const sortProducts = function (products, sortBy) {
    if (sortBy === 'byEdited') {
        return products.sort(function (a, b) {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return products.sort(function (a, b) {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return products
    }
}
const renderProducts = function (products, filters) {
    products = sortProducts(products, filters.sortBy)
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
const removeProduct = function (id) {
    const productIndex = products.findIndex(function (item) {
        return item.id === id
    })
    productIndex > -1 && products.splice(productIndex, 1)
}
const toggleExist = function (id) {
    const product = products.find(function (item) {
        return item.id === id
    })
    product !== undefined && (product.exist = !product.exist)
    saveProducts(products)
    renderProducts(products, filters)
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
    checkbox.setAttribute('id', product.id)
    checkbox.setAttribute('class', 'ex')
    checkbox.checked = product.exist
    checkbox.addEventListener('change', function (e) {
        toggleExist(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    const section = document.createElement('section')
    section.setAttribute('class', 'section-product-exist')

    const divSection = document.createElement('div')
    divSection.setAttribute('class', 'div-section')
    const removeButton = document.createElement('button')
    removeButton.setAttribute('class', 'btn remove-btn')
    removeButton.innerHTML = '<i class="fa-sharp fa-solid fa-trash-can"></i>'

    const label = document.createElement('label')
    label.setAttribute('for', product.id)

    const spanCheck = document.createElement('span')
    spanCheck.setAttribute('class', 'span-check')

    const spanText = document.createElement('a')
    spanText.textContent = product.title
    spanText.setAttribute('href', `./edit-product.html#${product.id}`)

    label.appendChild(spanCheck)

    divSection.appendChild(spanText)
    divSection.appendChild(checkbox)
    divSection.appendChild(label)

    section.appendChild(divSection)
    section.appendChild(removeButton)

    productEl.appendChild(section)

    removeButton.addEventListener('click', function () {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    return productEl
}

const lastEditMessage = function (timestamp) {
    return moment(timestamp).locale('fa').fromNow()
}