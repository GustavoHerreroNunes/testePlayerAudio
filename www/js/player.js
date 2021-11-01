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
        duration: 0.0,
        currentTime: 0.0
    },

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnPlay").addEventListener("click", player.setPlayerState);
        
        //Botão para iniciar a tocar o áudio pela primeira vez
        document.getElementById("btnStartReading").addEventListener("click", () => {
            player.setPlayerState();
            document.getElementById("btnStartReading").style.display = "none";
        });
        player.setSound();
        /* 2ª opção: iniciar áudio automaticamente 
        player.setPlayerState();
        */
    },

    //Método para definir os parâmetros para o áudio a ser tocado
    setSound: function(){
        player.sound.name = "Prism";
        player.sound.src = "https://firebasestorage.googleapis.com/v0/b/testestreaming-9a6ba.appspot.com/o/sounds%2FOur_Champion.mp3?alt=media&token=73c25e33-d875-43ac-b9cb-69f612097a24";
        player.sound.volume = 0.5;
        
        //Enviando a url do áudio para o player no HTML
        player.element.children[0].src = player.sound.src;
        player.element.load();
        
        //Esperando o áudio estar pronto para ser tocado
        do{
            player.sound.ready = (player.element.readyState === 4);
        }while(player.sound.ready);
        
        //Definindo o volume do áudio no player
        player.element.volume = player.sound.volume;

        //Definindo 'state' e 'duration' de 'sound'
        player.sound.state = "paused";
        player.sound.duration = player.element.duration;

        //Habilitando botão para iniciar leitura
        document.getElementById("btnStartReading").disabled = false;
    },

    //Método para alterar o estado do player (iniciado ou pausado | played or paused)
    setPlayerState: function(){
        //Verificando estado atual do player
        switch(player.sound.state){

            case "played"://Iniciado
                player.element.pause();
                player.sound.state = "paused";
                break;

            case "paused"://Pausado
                player.element.play();
                player.sound.state = "played";
                break;

            default://Estado não conhecido
                console.log("Estado não conhecido: " + player.sound.state);
                break;
        }
    },

}

player.initialize();