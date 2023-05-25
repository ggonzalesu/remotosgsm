var copy = document.querySelector(".logos__slide").cloneNode(true);
document.querySelector('.logos').appendChild(copy);


const shareBtn = document.getElementById('shareBtn')

shareBtn.addEventListener('click', event => {
    if (navigator.share) {
        navigator.share({
            text: 'please read this great article: ',
            url: 'https://www.google.com/'
        }).then(() => {
            console.log('thanks for sharing');
        })

            .catch(err) => console.error(err);
    } else {
        alert("El navegador no soporta function, hacerlo manual")
    }
});
