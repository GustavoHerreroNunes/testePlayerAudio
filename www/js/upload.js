var app = {

    //Referência para o bucket do Storage
    storage: firebase.storage(),

    //Construtor do app
    initialize: function(){
        console.info("Iniciando...");
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    //Quando todas as estruturas cordova tiverem inicializado
    onDeviceReady: function(){
        console.info("Device Ready");
        document.getElementById("btnUpload").addEventListener('click', app.upload);
    },

    //Cria um objeto file e envia o arquivo para o storage
    upload: function(){
        var filesSended = null;

        //Tentando enviar o arquivo enviado para um objeto file
        try{
            filesSended = document.getElementById('btnCarregar').files;

            console.info("Objeto criado com sucesso: " + filesSended);
            
        }catch(error){
            console.info("Erro ao criar objeto: " + error);
        }

        var refRoot = app.storage.ref().root;
        var refSouds = refRoot.child('sounds');

        var fileNumber = 1;

        //Enviando arquivo para o storage
        for(var i = 0; i > filesSended.lenght; i++){
            var refFiel = refSouds.child(filesSended[i].name);

            var uploadTask = refFiel.put(filesSended[i]);

            uploadTask.on('state_changed',
                function(snapshot){
                    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.info(fileNumber + "º Upload em " + progress + " %");
    
                    switch(snapshot.state){
                        case 'paused':
                            console.info("Upload pausado");
                            break;
                        case 'running':
                            console.info("Upload rodando");
                            break;
                    }
                },
                function(error){
                    switch(error.code){
                        case 'storage/unauthorized':
                            console.info("Usuário não autorizado");
                            break;
                        case 'storage/canceled':
                            console.info("Upload cancelado");
                            break;
                    }
                },
                function(){
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL){
                        console.log("Upload concluído!");
                        console.log("URL para download: " + downloadURL);
                    });
                }
            );

            fileNumber++;
        }

    }
};

app.onDeviceReady();