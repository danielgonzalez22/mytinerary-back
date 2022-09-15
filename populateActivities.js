require('dotenv').config()
const db = require('./config/database') //import database connection
const Activity = require('./models/Activity') //import needed models
const items = [

    {
<<<<<<< HEAD
    name: "Meet the king of savannah",
    photo: "https://cdn.pixabay.com/photo/2018/03/30/22/09/lion-3276692_1280.jpg",
    itinerary: "Zafari for the jungle",
},
{
    name: "Feed a girafe",
    photo: "https://thumbs.dreamstime.com/b/la-jirafa-en-el-parque-zool%C3%B3gico-cay%C3%B3-abajo-para-alimentar-al-ser-humano-103540185.jpg",
    itinerary: "Zafari for the jungle",
},
{
    name: "See a hippo in action",
    photo: "https://okdiario.com/img/2017/08/06/hipopotamos3-e1502011572366.jpg",
    itinerary: "Zafari for the jungle",
},
{
    name: "Fly over Cape Town stadium",
    photo:"https://st.focusedcollection.com/13422768/i/650/focused_160228044-stock-photo-view-cape-town-stadium-cape.jpg",
    itinerary: "Airplane",
},
{
    name: "see Table Mountain from the sky",
    photo:"https://www.viajeroscallejeros.com/wp-content/uploads/2018/11/ciudad-del-cabo-1.jpg",
    itinerary: "Airplane",
},
{
    name: "Visit Robben Island Prison",
    photo:"https://media.istockphoto.com/photos/aerial-view-of-mandelas-robben-island-prison-picture-id471596567",
    itinerary: "Airplane",
},
{
    name: "Feed a shark",
    photo:"https://media.gq.com.mx/photos/5be9cd965c1fcb79714c2b4e/master/w_1600%2Cc_limit/alimentar_a_un_tiburon_no_es_buena_idea_7329.jpg",
    itinerary: "Swim with sharks",
},
{
    name: "Face to face with a shark",
    photo:"https://topbuceo.net/wp-content/uploads/2019/10/buceo-isla-guadalupe-tiburon-blanco.jpg",
    itinerary: "Swim with sharks",
},
{
    name: "See a shark attacking its prey",
    photo:"https://thumbs.dreamstime.com/b/atacando-los-grandes-tiburones-blancos-gran-tibur%C3%B3n-blanco-con-boca-abierta-en-el-agua-del-oc%C3%A9ano-nombre-cient%C3%ADfico-168944053.jpg",
    itinerary: "Swim with sharks",
},
    {
    name:"Dinner at the top of burj khalifa",
    photo:"https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/5f/a1.jpg",
    itinerary:"Visit the top of Burj Khalifa",
},
{
    name:"Tour for the tower",
    photo:"https://www.ngenespanol.com/wp-content/uploads/2018/08/Burj-Khalifa.jpg",
    itinerary:"Visit the top of Burj Khalifa",
},
{
    name:"Parachute jump",
    photo:"https://i.ytimg.com/vi/eLuCAfOmjAQ/maxresdefault.jpg",
    itinerary:"Visit the top of Burj Khalifa",
},
{
    name:"Sheiks Party",
    photo:"https://e00-marca.uecdn.es/imagenes/2011/10/31/futbol/futbol_internacional/america/1320085550_extras_noticia_foton_7_0.jpg",
    itinerary:"Party",
},
{
    name:"Party in the desert",
    photo:"https://cdn.getyourguide.com/img/tour/612364321feeb.jpeg/146.jpg",
    itinerary:"Party",
},
{
    name:"Pool Party",
    photo:"https://www.tusdj.com/wp-content/uploads/2016/01/Cover-24-de-fiesta-en-Dubai-730x382.jpg",
    itinerary:"Party",
},
{
    name:"Oil weel tour",
    photo:"https://www.arquimaster.com.ar/web/wp-content/uploads/2014/05/ciudades_petroleras2.jpg",
    itinerary:"Know an oil weel",
},
{
    name:"Informative talk",
    photo:"https://www.worldenergytrade.com/images/stories/news/oilgas/yacimientos/5050/Los-mayores-descubrimientos-de-petroleo-y-gas-del-2019.5050.jpg",
    itinerary:"Know an oil weel",
},
{
    name:"Oil handling course",
    photo:"http://estaticos.elmundo.es/assets/multimedia/imagenes/2016/11/14/14791304163123.jpg",
    itinerary:"Know an oil weel",
},
{
    name:"Know the playing field",
    photo:"https://cdn2.teknomers.com/es/wp-content/uploads/2022/03/1647255863_NOTICIAS-GALATASARAY-El-Estadio-Nef-esta-listo-para-el-derbi.jpg",
    itinerary:"Watch a soccer game",
},
{
    name:"Watch the Istambul derby",
    photo:"https://apuntesderabona.com/wp-content/uploads/2017/10/Cr198uQWEAAwtJl.jpg",
    itinerary:"Watch a soccer game",
},
{
    name:"Club museum tour",
    photo:"https://i0.wp.com/www.weloveist.com/wp-content/uploads/galatasaray-museum-beyoglu.jpg?fit=1200%2C750&ssl=1",
    itinerary:"Watch a soccer game",
},
{
    name:"Visit the best recording set",
    photo:"https://image.jimcdn.com/app/cms/image/transf/dimension=623x10000:format=jpg/path/s1749c66fc591852b/image/i81d2be66a6b20b4b/version/1430799392/image.jpg",
    itinerary:"Meet a film set",
},
{
    name:"Meet your favorite actors",
    photo:"https://www.clarin.com/img/2019/02/19/pareja-real-y-de-ficcion___ENkU1Syln_1256x620__1.jpg",
    itinerary:"Meet a film set",
},
{
    name:"Acting Workshop",
    photo:"http://www.caynet.com.ar/noticias/editor/UserFiles/Image/Noticias2017/teatro-inicial.JPG",
    itinerary:"Meet a film set",
},
{
    name:"",
    photo:"",
    itinerary:"Tour of the city",
},
{
    name:"",
    photo:"",
    itinerary:"Tour of the city",
},
{
    name:"",
    photo:"",
    itinerary:"Tour of the city",
},
{
    name:"",
    photo:"",
    itinerary:"",
},
]
=======
    name: "do something in sheiks party",
    photo: "https://pbs.twimg.com/media/DWQ5-OjWkAAtzYI.jpg:large",
    itinerary: "631f8ed7ce170ef8e60bda46",
}
]
items.forEach(e => {
    Activity.create({
        name:e.name,
        photo:e.photo,
        itinerary:e.itinerary,
    })
})
>>>>>>> b0b2ffbaad99040841e38bb50511baf9b9d7920a
