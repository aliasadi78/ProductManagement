const getSaveProducts = () => {
    let productsJSON = localStorage.getItem('products')
    try {
        return productsJSON !== null ? JSON.parse(productsJSON) : []
    } catch (error) {
        return []
    }
    
}

const saveProducts = products => localStorage.setItem('products', JSON.stringify(products))

const sortProducts = (products, sortBy) => {
    if (sortBy === 'byEdited') {
        return products.sort((a, b) => {
            if (a.updated > b.updated) {
                return -1
            } else if (a.updated < b.updated) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return products.sort((a, b) => {
            if (a.created > b.created) {
                return -1
            } else if (a.created < b.created) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byPrice') {
        return products.sort((a, b) => {
            if (parseInt(a.price) > parseInt(b.price)) {
                return -1
            } else if (parseInt(a.price) < parseInt(b.price)) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return products
    }
}
const renderProducts = (products, filters) => {
    products = sortProducts(products, filters.sortBy)
    let filteredProducts = products.filter((item) => {
        return item.title.toLowerCase().includes(filters.searchItem.toLowerCase())
    })
    filteredProducts = filteredProducts.filter((item) => {
        return filters.existProduct ? item.exist : true
    })
    document.querySelector('#products').innerHTML = ''
    filteredProducts.length === 0 ? emptyProducts() :
        filteredProducts.forEach((product) => {
            document.querySelector('#products').appendChild(createProductDOM(product))
        });
}
const removeProduct = (id) => {
    const productIndex = products.findIndex(item => item.id === id)
    productIndex > -1 && products.splice(productIndex, 1)
}
const toggleExist = (id) => {
    const product = products.find(item => item.id === id)
    product !== undefined && (product.exist = !product.exist)
    saveProducts(products)
    renderProducts(products, filters)
}
const emptyProducts = () => {
    const message = document.createElement('div')
    message.setAttribute('class', 'empty-message')
    message.textContent = 'محصولی یافت نشد!'
    document.querySelector('#products').appendChild(message)
}

const createProductDOM = (product) => {
    const productEl = document.createElement('div')

    productEl.setAttribute('class', 'product-row')

    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('id', product.id)
    checkbox.setAttribute('class', 'ex')
    checkbox.checked = product.exist
    checkbox.addEventListener('change', () => {
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

    const spanPrice = document.createElement('span')
    spanPrice.textContent = `قیمت : ${product.price}`

    label.appendChild(spanCheck)
    const spanProduct = document.createElement('span')
    spanProduct.setAttribute('class', 'span-product')

    spanProduct.appendChild(spanText)
    spanProduct.appendChild(spanPrice)
    divSection.appendChild(spanProduct)
    divSection.appendChild(checkbox)
    divSection.appendChild(label)

    section.appendChild(divSection)
    section.appendChild(removeButton)

    productEl.appendChild(section)

    removeButton.addEventListener('click', () => {
        removeProduct(product.id)
        saveProducts(products)
        renderProducts(products, filters)
    })

    return productEl
}

const lastEditMessage = timestamp => moment(timestamp).locale('fa').fromNow()