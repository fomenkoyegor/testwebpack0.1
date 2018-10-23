import './main.scss';
import 'babel-polyfill';
import 'bootstrap';


const btn = $('#btn');
const list = $('#list');

var page = {
    musics: [],
    init: async function () {
        await this.getMusics();
        this.events();
    },
    getMusics: async function () {
        try {
            const res = await $.get('http://larangtest.zzz.com.ua/api/musics');
            this.musics = res.data;
            this.renderList();
            btn.attr('disabled', false);
        } catch (e) {
            console.log(e)
        }
    },
    renderList(){
        list.empty();
        const info = $(`<p class="info">${this.musics.length}</p>`);
        list.append(info);
        $.each(this.musics,(id,el)=>list.append(`
            <li data-id="${el.id}">${el.name}</li>
        `))
    },
    events(){
        list.on('click',e=>{
            if (e.target.matches('li')){
                this.delFromMusics(e.target.dataset.id)
            }
        })
    },
    delFromMusics(id){
        this.musics = this.musics.filter(el=>el.id!==+id);
        console.log(this.musics);
        const el = $(`#list li[data-id="${id}"]`);
        el.animate({
            opacity: 0,
            height: "0",
            padding: "0",
        }, 600, ()=> this.renderList());
    }
};


$(window).on('load', () => {
    // page.init();
    // btn.on('click',async () => await page.getMusics());

});



