const burger = document.querySelector('.burger');
const dropdown = document.querySelector('.dropdown');

burger.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
});


const items = document.querySelectorAll('.item');
let currentPage = null;

items.forEach(item => {
    item.addEventListener('click', () => {

        const pageId = item.dataset.page;
        currentPage = document.getElementById(pageId);

        const rect = item.getBoundingClientRect();

        // place hidden page accroding to not hidden one
        currentPage.style.left = rect.left + "px";
        currentPage.style.top = rect.top + "px";
        currentPage.style.width = rect.width + "px";
        currentPage.style.height = rect.height + "px";
        currentPage.style.opacity = 1;
        currentPage.style.display = "block";

        // overlay behind
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add("show");

            currentPage.style.left = "50%";
            currentPage.style.top = "50%";
            currentPage.style.width = "auto";
            currentPage.style.height = "auto";
            currentPage.style.transform = "translate(-50%, -50%)";
        });

        // close btn
        currentPage.querySelector(".close-btn").onclick = () => closePage(currentPage, overlay);
        overlay.onclick = () => closePage(currentPage, overlay);
    });
});

function closePage(page, overlay) {
    page.style.opacity = 0;

    // hid the page
    overlay.classList.remove("show");
    overlay.addEventListener("transitionend", () => overlay.remove(), { once: true });

    page.addEventListener("transitionend", () => {
        page.style.display = "none";
        page.style.transform = "";
    }, { once: true });
}


let slideIndex = [1,1];
let slideId = ["mySlides1", "mySlides2"]
showSlides(1, 0);
showSlides(1, 1);

function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  x[slideIndex[no]-1].style.display = "block";  
}

