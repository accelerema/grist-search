grist.ready({
  allowSelectBy: true,
  requiredAccess: 'read table',
});


grist.onRecords(records => {
  if (!records) {
    return
  }
  window.fuseSearch = new window.Fuse(records, {
    keys: Object.keys(records[0]),
    includeScore: true
  })
})

function change() {
  const pattern = document.getElementById("search").value
  const results = window.fuseSearch.search(pattern)
  const listNode = document.getElementById("list")

  for (var i = listNode.children.length - 1; i >= 0; i--) {
    listNode.children.item(i).remove()
  }
  results.forEach(result => {
    const row = document.createElement("tr")
    row.dataset.itemId = result.item.id

    /*const idx = document.createElement("td")
    idx.innerText = result.score
    row.appendChild(idx)*/

    const title = document.createElement("td")
    title.innerText = result.item.titre
    row.appendChild(title)

    listNode.appendChild(row)
    row.addEventListener('click', select)
  })
}


function select(e) {
  if (window.previous) {
    window.previous.className = ""
  }
  window.previous = this
  this.className = "selected"

  window.grist.setCursorPos({rowId: parseInt(this.dataset.itemId)});
}
