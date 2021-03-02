$(function(){
    //submit search form
    $('#app-body').find('form').submit(function (ev){
        //08.45
        //video c
        ev.preventDefault();
        var busqueda=$(this).find('input[type="text"]').val();
        console.log('se ha buscado: '+busqueda);
    })  

    var template='<article class="tv-show">'+
                        '<div class="left img-container">'+
                            '<img src=":img:" alt=":img alt:">  '+   
                        '</div>'+
                        '<div class="right info">'+
                            '<h1>:name:</h1>'+
                            '<p>:summary:</p>'+
                        '</div>'+
                    '</article>';                
    //request de shows
    $.ajax({
        url:'http://api.tvmaze.com/shows',
        success:function(data,textStatus,xhr){
            //console.log(data);
            var $container=$('#app-body').find('.tv-shows');
            $container.find('.loader').remove()
            data.forEach(function (show){
                var article=template
                .replace(':name:',show.name)
                .replace(':img:',show.image.medium)
                .replace(':summary:',show.summary)
                .replace(':img alt:',show.name+" Logo")

                var $article=$(article);
                $container.append($article);
            })
        }
    });          
})