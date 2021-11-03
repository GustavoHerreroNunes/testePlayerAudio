//Classe para as funcionalidades do player de áudio
var player = {

    //Elemento HTML que representa o player
    element: document.getElementById("playerSound"),

    //Elementos HTML que apresentam informações para análise
    analiseElements: [
        document.getElementById("audioPlayed"),
        document.getElementById("volume"),
        document.getElementById("isReady")
    ],

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
        player.setSound("https://firebasestorage.googleapis.com/v0/b/testestreaming-9a6ba.appspot.com/o/sounds%2FOur_Champion.mp3?alt=media&token=73c25e33-d875-43ac-b9cb-69f612097a24");
        /* 2ª opção: iniciar áudio automaticamente 
        player.setPlayerState();
        */
       player.isEnded();
    },

    //Método para definir os parâmetros para o áudio a ser tocado
    setSound: function(url){
        player.sound.name = "Prism";
        player.sound.src = url;
        player.sound.volume = 0.5;
        
        //Enviando a url do áudio para o player no HTML
        player.element.children[0].src = player.sound.src;
        player.element.load();
        
        //Esperando o áudio estar pronto para ser tocado
        var intervalId = null;
        intervalId = setInterval( function(){

            player.analiseElements[2].innerHTML = player.element.readyState == 4;

            if(player.element.readyState == 4){                
                //Definindo o volume do áudio no player
                player.element.volume = player.sound.volume;

                player.analiseElements[1].innerHTML = player.sound.volume;
        
                //Definindo 'state' e 'duration' de 'sound'
                player.sound.state = "paused";
                player.sound.duration = player.element.duration;
                console.log("[element.duration]", player.element.duration);
                console.log("[sound.duration]", player.sound.duration);
        
                //Habilitando botão para iniciar leitura
                document.getElementById("btnStartReading").disabled = false;
                
                clearInterval(intervalId);
            }
        },
        10);

    },

    //Método para alterar o estado do player (iniciado ou pausado | played or paused)
    setPlayerState: function(){
        //Verificando estado atual do player
        switch(player.sound.state){

            case "played"://Iniciado
                player.element.pause();
                player.sound.state = player.element.paused ? "paused" : (console.log("Erro ao pausar áudio"), "played");
                break;

            case "paused"://Pausado
                player.element.play();
                player.sound.state = !player.element.paused ? "played" : (console.log("Erro ao iniciar áudio"), "paused");
                break;

            default://Estado não conhecido
                console.log("Estado não conhecido: " + player.sound.state);
                break;
        }
    },

    //Método que verifica se o áudio terminou de tocar
    isEnded: function(){
        setInterval( function(){
            if(player.element.ended){
                player.setSound("https://firebasestorage.googleapis.com/v0/b/testestreaming-9a6ba.appspot.com/o/sounds%2FAdventure_is_Calling.mp3?alt=media&token=b63de635-971f-4b36-9146-3ff8a6c33b32");
                player.setPlayerState();
            }else{
                player.setCurrentTime();
                var audioPlayed = parseFloat( ((player.sound.currentTime / player.sound.duration) * 100)).toFixed(2);

                player.analiseElements[0].innerHTML = audioPlayed;

                if(audioPlayed > 90){
                    player.analiseElements[1].innerHTML = player.sound.volume;

                    player.setVolume( (player.sound.volume >= 0) ? player.sound.volume -= 0.001 : 0 );
                }
            }
        },
        10);
    },

    //Método para definir o 'player.sound.currentTime' de acordo com o minuto atual do áudio
    setCurrentTime: function(){
        player.sound.currentTime = player.element.currentTime;
    },

    //Método para definir o 'player.sound.volume'
    setVolume: function(volume){
        if(volume >= 0){
            player.sound.volume = volume;
            player.element.volume = player.sound.volume;
        }
    },

}

player.initialize();