//Classe para as funcionalidades do player de áudio
var player = {

    //Elemento HTML que representa o player
    element: document.getElementById("playerSound"),

    //Áudio selecionado
    sound: {
        name: "",
        src: "",
        volume: 0.0,
        ready: false,
        state: "",
        duration: "",
    },

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        player.initializeSound();
        // player.playSong();
    },

    //Definindo parâmetros para o áudio a ser tocado
    initializeSound(){
        player.sound.name = "Prism";
        player.sound.src = "https://firebasestorage.googleapis.com/v0/b/testestreaming-9a6ba.appspot.com/o/sounds%2FOur_Champion.mp3?alt=media&token=73c25e33-d875-43ac-b9cb-69f612097a24";
        player.sound.volume = 100.0;

        //Enviando a url do áudio para o player no HTML
        player.element.children[0].src = player.sound.src;
        player.element.load();
        
        //Esperando o áudio estar pronto para ser tocado
        do{
            player.sound.ready = (player.element.readyState === 4);
        }while(player.sound.ready);

        //Definindo 'state' e 'duration' de 'sound'
        player.sound.duration = '';
    },
}

player.onDeviceReady();