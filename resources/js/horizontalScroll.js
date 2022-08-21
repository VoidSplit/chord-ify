const scrollContainer = document.querySelectorAll('.horizontal-scroll');

scrollContainer.forEach(el => {
    el.addEventListener('wheel', (evt) => {
        evt.preventDefault();
        el.scrollLeft += evt.deltaY;
    });
})