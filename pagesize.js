function updatePageSize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const sizeText = `Current page size: ${width}px x ${height}px`;
    
    let sizeDisplay = document.getElementById('page-size');
    if (!sizeDisplay) {
        sizeDisplay = document.createElement('div');
        sizeDisplay.id = 'page-size';
        sizeDisplay.style.position = 'fixed';
        sizeDisplay.style.bottom = '10px';
        sizeDisplay.style.right = '10px';
        sizeDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        sizeDisplay.style.color = 'white';
        sizeDisplay.style.padding = '10px';
        sizeDisplay.style.borderRadius = '5px';
        sizeDisplay.style.fontSize = '14px';
        document.body.appendChild(sizeDisplay);
    }
    
    sizeDisplay.textContent = sizeText;
}


updatePageSize();

window.addEventListener('resize', updatePageSize);


// useful for understanding scability on Phones

