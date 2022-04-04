function displayModel(event){
    model.style.display = 'block';
    backdrop.style.display = 'block';
    configedPlayer = +event.target.dataset.playerid;
}

function hideConfig(){
    form.firstElementChild.classList.remove('error');
    form.firstElementChild.children[1].value='';

    model.style.display = 'none';
    backdrop.style.display = 'none';
}


function saveConfig (event){
    event.preventDefault();
    const formData = new FormData(event.target);
    const playerName = formData.get('playername').trim();

    if(!playerName) {
        event.target.firstElementChild.classList.add('error');
        configErrMess.textContent = 'Please enter a valid name';
        return;
    }

    updatedPlayerElement = document.getElementById('player-'+configedPlayer+'-data');
    updatedPlayerElement.children[1].textContent = playerName;

    players[configedPlayer-1].name = playerName;

    hideConfig();
}