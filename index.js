class Book {
  constructor(_title, _author, _maxPages) {
    (this.title = _title),
      (this.author = _author),
      (this.maxPages = _maxPages),
      (this.onPage = 0)
  }

  setOnPage = function (pageNumber) {
    this.onPage = pageNumber
  }
}
let list1 = document.querySelector(`#list1`)
let list2 = document.querySelector(`#list2`)

let table = document.querySelector(`.table`)

let books = []

function progress(total, completed) {
  return Math.floor((completed * 100) / total)
}

function transformArrayToBooks(arrayObj) {
  let tempBooks = []
  arrayObj.forEach((book) => {
    let tempBook = new Book(book.title, book.author, book.maxPages)
    tempBook.setOnPage(book.onPage)
    tempBooks.push(tempBook)
  })

  return tempBooks
}

if (localStorage.getItem(`allBooks`)) {
  books = JSON.parse(localStorage.getItem(`allBooks`))
  books = transformArrayToBooks(books)
} else {
  books = [
    {
      title: `Anna Karenina`,
      author: `Leo Tolstoy`,
      maxPages: `860`,
      onPage: `120`
    },

    {
      title: `Madame Bovary`,
      author: `Gustave Flaubert`,
      maxPages: `380`,
      onPage: `70`
    },

    {
      title: `Harry Potter`,
      author: `J.K. Rowling`,
      maxPages: `630`,
      onPage: `630`
    },

    {
      title: `War and Peace`,
      author: `Leo Tolstoy`,
      maxPages: `1300`,
      onPage: `1210`
    },

    {
      title: `Naked Man`,
      author: `Igor Dzambazov`,
      maxPages: `250`,
      onPage: `250`
    },
  ]

  books = transformArrayToBooks(books)

  let booksString = JSON.stringify(books)
  localStorage.setItem(`allBooks`, booksString)
}

function createList1(book, createList2) {
  let li = document.createElement(`li`)
  li.innerHTML = `${book.title} by ${book.author}`
  list1.appendChild(li)

  createList2(book, table, createTableRow)
}

function createList2(book, table, createTableRow) {
  if (book.maxPages == book.onPage) {
    let li = document.createElement(`li`)
    li.innerText = `You already have read ${book.title} by ${book.author}`
    li.classList.add(`text-success`)
    list2.appendChild(li)
  } else {
    let li = document.createElement(`li`)
    li.innerText = `You still need to read ${book.title} by ${book.author}`
    li.classList.add(`text-danger`)
    list2.appendChild(li)
  }

  createTableRow(book, table)
}

function createTableRow(book, table) {
  let tr = document.createElement(`tr`)
  let percent = progress(book.maxPages, book.onPage)
  tr.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.maxPages}</td>
    <td>${book.onPage}</td>
    <td>
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${percent}%" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">${percent}%</div>
        </div>
    </td>`

  table.lastElementChild.appendChild(tr)
}

books.forEach((book) => {
  createList1(book, createList2)
})

document.getElementById(`form`).addEventListener(`submit`, function (e) {
  e.preventDefault()

  let inputValues = document.querySelectorAll(`.form-control`)

  let book = new Book(
    inputValues[0].value,
    inputValues[1].value,
    inputValues[3].value
  )
  book.setOnPage(inputValues[2].value)

  books.push(book)
  let booksString = JSON.stringify(books)
  localStorage.setItem(`mn-books`, booksString)

  createList1(book, createList2)

  inputValues.forEach((member) => {
    member.value = ``
  })
})


