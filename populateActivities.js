require('dotenv').config()
const db = require('./config/database') //import database connection
const Activities = require('./models/Activity') //import needed models
const items = [
    // cape town
    {// zafari
    name: "Meet the king of savannah",
    photo: "https://cdn.pixabay.com/photo/2018/03/30/22/09/lion-3276692_1280.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e0",
},
{
    name: "Feed a girafe",
    photo: "https://thumbs.dreamstime.com/b/la-jirafa-en-el-parque-zool%C3%B3gico-cay%C3%B3-abajo-para-alimentar-al-ser-humano-103540185.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e0",
},
{
    name: "See a hippo in action",
    photo: "https://okdiario.com/img/2017/08/06/hipopotamos3-e1502011572366.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e0",
},
{// airplane tour
    name: "Fly over Cape Town stadium",
    photo:"https://st.focusedcollection.com/13422768/i/650/focused_160228044-stock-photo-view-cape-town-stadium-cape.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e1",
},
{
    name: "see Table Mountain from the sky",
    photo:"https://www.viajeroscallejeros.com/wp-content/uploads/2018/11/ciudad-del-cabo-1.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e1",
},
{
    name: "Visit Robben Island Prison",
    photo:"https://media.istockphoto.com/photos/aerial-view-of-mandelas-robben-island-prison-picture-id471596567",
    itinerary: "63213f6f0c3bf93e0a76e8e1",
},
{// swim with sharks
    name: "Feed a shark",
    photo:"https://media.gq.com.mx/photos/5be9cd965c1fcb79714c2b4e/master/w_1600%2Cc_limit/alimentar_a_un_tiburon_no_es_buena_idea_7329.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e2",
},
{
    name: "Face to face with a shark",
    photo:"https://topbuceo.net/wp-content/uploads/2019/10/buceo-isla-guadalupe-tiburon-blanco.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e2",
},
{
    name: "See a shark attacking its prey",
    photo:"https://thumbs.dreamstime.com/b/atacando-los-grandes-tiburones-blancos-gran-tibur%C3%B3n-blanco-con-boca-abierta-en-el-agua-del-oc%C3%A9ano-nombre-cient%C3%ADfico-168944053.jpg",
    itinerary: "63213f6f0c3bf93e0a76e8e2",
},
    {// visit the top of burj khalifa
    name:"Dinner at the top of burj khalifa",
    photo:"https://media.tacdn.com/media/attractions-splice-spp-674x446/06/6f/5f/a1.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e3",
},
{
    name:"Tour for the tower",
    photo:"https://www.ngenespanol.com/wp-content/uploads/2018/08/Burj-Khalifa.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e3",
},
{
    name:"Parachute jump",
    photo:"https://i.ytimg.com/vi/eLuCAfOmjAQ/maxresdefault.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e3",
},
{// sheiks party
    name:"Sheiks Party",
    photo:"https://e00-marca.uecdn.es/imagenes/2011/10/31/futbol/futbol_internacional/america/1320085550_extras_noticia_foton_7_0.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e4",
},
{
    name:"Party in the desert",
    photo:"https://cdn.getyourguide.com/img/tour/612364321feeb.jpeg/146.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e4",
},
{
    name:"Pool Party",
    photo:"https://www.tusdj.com/wp-content/uploads/2016/01/Cover-24-de-fiesta-en-Dubai-730x382.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e4",
},
{//know an oil well
    name:"Oil weel tour",
    photo:"https://www.arquimaster.com.ar/web/wp-content/uploads/2014/05/ciudades_petroleras2.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e5",
},
{
    name:"Informative talk",
    photo:"https://www.worldenergytrade.com/images/stories/news/oilgas/yacimientos/5050/Los-mayores-descubrimientos-de-petroleo-y-gas-del-2019.5050.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e5",
},
{
    name:"Oil handling course",
    photo:"http://estaticos.elmundo.es/assets/multimedia/imagenes/2016/11/14/14791304163123.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e5",
},
{// watch a soccer game
    name:"Know the playing field",
    photo:"https://cdn2.teknomers.com/es/wp-content/uploads/2022/03/1647255863_NOTICIAS-GALATASARAY-El-Estadio-Nef-esta-listo-para-el-derbi.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e6",
},
{
    name:"Watch the Istambul derby",
    photo:"https://apuntesderabona.com/wp-content/uploads/2017/10/Cr198uQWEAAwtJl.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e6",
},
{
    name:"Club museum tour",
    photo:"https://i0.wp.com/www.weloveist.com/wp-content/uploads/galatasaray-museum-beyoglu.jpg?fit=1200%2C750&ssl=1",
    itinerary:"63213f6f0c3bf93e0a76e8e6",
},
{// meet a film set
    name:"Visit the best recording set",
    photo:"https://image.jimcdn.com/app/cms/image/transf/dimension=623x10000:format=jpg/path/s1749c66fc591852b/image/i81d2be66a6b20b4b/version/1430799392/image.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e7",
},
{
    name:"Meet your favorite actors",
    photo:"https://www.clarin.com/img/2019/02/19/pareja-real-y-de-ficcion___ENkU1Syln_1256x620__1.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8e7",
},
{
    name:"Acting Workshop",
    photo:"http://www.caynet.com.ar/noticias/editor/UserFiles/Image/Noticias2017/teatro-inicial.JPG",
    itinerary:"63213f6f0c3bf93e0a76e8e7",
},
{//tour of the city
    name:"Visit the largest shopping in Europe.",
    photo:"https://dondeviajar.republica.com/files/2013/03/cevahir-680x453.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8ec",
},
{
    name:"Visit historic sites",
    photo:"https://www.eltiempo.com/files/image_640_428/uploads/2019/08/03/5d46405fb273b.jpeg",
    itinerary:"63213f6f0c3bf93e0a76e8ec",
},
{
    name:"Know the best neighborhoods",
    photo:"https://www.estambul.net/wp-content/uploads/2015/03/barrios-de-estambul.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8ec",
},
//Tour by the piramids
{name:"Full access: Ground Zero, Memorial and museum",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/72/12/16.jpg",
itinerary:"63213f6f0c3bf93e0a76e8e9"
},
{
name:"FDNY Memorial Wall",
photo:"https://media-cdn.tripadvisor.com/media/photo-o/06/5c/48/b0/fdny-memorial.jpg",
itinerary:"63213f6f0c3bf93e0a76e8e9"
},
{
name:"Memorial monument 9/11",
photo:"https://media-cdn.tripadvisor.com/media/photo-m/1280/14/b3/aa/b3/911-memorial-nyc.jpg",
itinerary:"63213f6f0c3bf93e0a76e8e9"
},
{//Visit the tomb of tutanchamon
name:"Statue of Liberty",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/25/18/e9.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ea"
},
{
name:"Circle Line to Ellis Island",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/0a/5d/f1.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ea"
},
{
name:"Helicopter ride",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/09/93/f1/d1.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ea"
},
{//Outdoor museum
name:"SUMMIT One Vanderbilt experience",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0d/a5/3d/62.jpg",
itinerary:"63213f6f0c3bf93e0a76e8eb"
},
{
name:"The Edge",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0a/8a/68/e6.jpg",
itinerary:"63213f6f0c3bf93e0a76e8eb"
},
{
name:"Empire State Building",
photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/39/9b/27/caption.jpg?w=1200&h=-1&s=1",
itinerary:"63213f6f0c3bf93e0a76e8eb"
},
{ //Tour of the city
name:"Top floor Eiffel tower",
photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/15/67/96/caption.jpg?w=1100&h=-1&s=1",
itinerary:"63213f6f0c3bf93e0a76e8e8"
},
{
name:"Seine river cruise ",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/19/b4/f2.jpg",
itinerary:"63213f6f0c3bf93e0a76e8e8"
},
{
name:"Free walking tour to Eiffel tower",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0b/db/8d/37.jpg",
itinerary:"63213f6f0c3bf93e0a76e8e8"
},
//Visit the mountains
{
name:"Skip the Line Ticket with Private Guided Tour: Louvre Museum",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/06/f9/15/d3.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ed"
},
{
name:"D'Orsay museum",
photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/26/b3/6e/20180601-122841-largejpg.jpg?w=1200&h=-1&s=1",
itinerary:"63213f6f0c3bf93e0a76e8ed"
},
{
name:"L'Orangerie museum",
photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/22/9f/26/caption.jpg?w=1200&h=-1&s=1",
itinerary:"63213f6f0c3bf93e0a76e8ed"
},
//Meet the golden pavilion
{
name:"Walk through Versailles garden",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/01/37/a3.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ee"
},
{
name:"Palace of Versailles, Gardens and Fountain Show Tour",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/88/8e/3b.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ee"
},
{
name:"Versailles Bike Tour with Skip-the-Line Palace Ticket",
photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/60/ea/c1/caption.jpg?w=1200&h=-1&s=1",
itinerary:"63213f6f0c3bf93e0a76e8ee"
},
{ // Day of the dead
name:"Priority entrance to the London Eye",
photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/0f/36/c2/60.jpg",
itinerary:"63213f6f0c3bf93e0a76e8ef"
},
{
    name:"London Eye River Cruise",
    photo:"https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/07/82/70/4c.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8ef"
},
{
    name:"London Eye to London Bridge (River Walk)",
    photo:"http://www.thelondres.com/wp-content/uploads/2018/08/tower-bridge.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8ef"
},
{// Porto Seguro Carnival
    name:"Buckingham Palace",
    photo:"https://www.eliberico.com/wp-content/uploads/2021/09/buckingham-palace-640x375.jpg",
    itinerary:"63213f6f0c3bf93e0a76e8f0"
},
{
    name:"Changing of the guard walking tour",
    photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/25/36/7c/94/1.jpg?w=1100&h=-1&s=1",
    itinerary:"63213f6f0c3bf93e0a76e8f0"
},
{
    name:"Horse Guards Parade at Whitehall",
    photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/21/a7/b2/img-20180531-023447-686.jpg?w=1200&h=-1&s=1",
    itinerary:"63213f6f0c3bf93e0a76e8f0"
},
{ // Attend a concert at the Sydney Opera house
    name:"Harry Potter and the Cursed Child",
    photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/4f/b4/1a/palace-theatre.jpg?w=1200&h=-1&s=1&cx=1215&cy=791&chk=v1_94dd28e6828140c4221c",
    itinerary:"63213f6f0c3bf93e0a76e8f1"
},
{
    name:"Warner Bros. Studio: The Making of Harry Potter",
    photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1d/5b/66/7a/caption.jpg?w=1200&h=-1&s=1",
    itinerary:"63213f6f0c3bf93e0a76e8f1"
},
{
    name:"Harry Potter Shop at Platform 9 3/4",
    photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/7b/74/61/photo0jpg.jpg?w=1200&h=-1&s=1",
    itinerary:"63213f6f0c3bf93e0a76e8f1"
},
// { 
//     name:"Mount Fuji tour",
//     photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/a0/d7/2f/awaken-your-inner-explorer.jpg?w=1200&h=-1&s=1",
//     itinerary:""
// },
// {
//     name:"Kawaguchiko Lake",
//     photo:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1c/d8/24/b1/caption.jpg?w=1200&h=-1&s=1",
//     itinerary:""
// }
];
items.forEach(e => {
    Activities.create({
        name:e.name,
        photo:e.photo,
        itinerary:e.itinerary,
    })
})