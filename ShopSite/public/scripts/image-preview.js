const fileInput = document.getElementById('image');
const imagePreview = document.getElementById('image-preview');

function showPreview(event) {
    const files = fileInput.files;

    if(!files || files.length === 0){
        imagePreview.style.display='none';
        return;
    }

    const file = files[0];

    imagePreview.src = URL.createObjectURL(file);
    imagePreview.style.display='block';
};

fileInput.addEventListener('change', showPreview);