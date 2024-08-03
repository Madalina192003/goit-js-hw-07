import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

function createGalleryMarkup(items) {
  return items
    .map(({ preview, original, description }) => {
      return `
            <li class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                        class="gallery__image"
                        src="${preview}"
                        data-source="${original}"
                        alt="${description}"
                    />
                </a>
            </li>
        `;
    })
    .join("");
}

galleryContainer.innerHTML = createGalleryMarkup(galleryItems);

// Funcția de deschidere a ferestrei modale
function openModal(imageUrl) {
  const instance = basicLightbox.create(
    `
        <img src="${imageUrl}" style="display: block; width: 100%; height: auto;">
    `,
    {
      onShow: (instance) => {
        document.addEventListener("keydown", EscPress);
      },
      onClose: (instance) => {
        document.removeEventListener("keydown", EscPress);
      },
    }
  );

  instance.show();

  function EscPress(event) {
    if (event.code === "Escape") {
      instance.close();
    }
  }
}

// obținerea unui url a imaginii mari.
galleryContainer.addEventListener("click", (event) => {
  event.preventDefault();

  const clickedImage = event.target;

  if (!clickedImage.classList.contains("gallery__image")) return;

  const imgUrl = clickedImage.dataset.source;
  openModal(imgUrl);
});
