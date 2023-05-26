const shareBtn = document.getElementById('shareBtn');

shareBtn.addEventListener('click', event => {
    if (navigator.share) {
        navigator.share({
            title: '',
            url: 'https://www.remotosgsm.net/'
        }).then(() => {
            console.log('Thanks for sharing');
        }).catch(console.error);
    } else {
        alert("El navegador no soporta esta función, hacerlo manualmente");
    }
});