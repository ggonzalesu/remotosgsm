const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', event => {
    if (navigator.share) {
        navigator.share({
            title: 'Please read this great article:',
            url: 'https://www.google.com/'
        }).then(() => {
            console.log('Thanks for sharing');
        }).catch(console.error);
    } else {
        alert("El navegador no soporta esta función, hacerlo manualmente");
    }
});