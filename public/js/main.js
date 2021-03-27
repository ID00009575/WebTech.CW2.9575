document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

const previewBtn = document.querySelector('[data-target="preview"]')
if(previewBtn) {
  previewBtn.addEventListener('click', () => {
    const title = document.querySelector('#title')
    const description = document.querySelector('#description')
    const photo = document.querySelector('#photo')
    const modal = document.querySelector('#preview')
    modal.querySelector('span').innerText = title.value
    modal.querySelector('p').innerText = description.value
    // Preview of image via converting to Url Data
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(modal.querySelector('img'));
    reader.readAsDataURL(photo.files[0]);
  })
}
const deleteBtn = document.querySelector('.delete')
if(deleteBtn) {
  deleteBtn.addEventListener('click', () => {
    fetch(`${deleteBtn.dataset.url}/${deleteBtn.dataset.id}`, {
      method: 'POST'
    }).then(() => {
      location.href = '/'
    })
  })
}
