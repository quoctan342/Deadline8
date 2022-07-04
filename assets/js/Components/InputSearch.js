Vue.component('input-search', {
    props: ['placeholder'],
    data() {
        return {
            keywordSearch: '',
        }
    },
    watch: {
        keywordSearch() {
            this.$emit('input', this.keywordSearch);
        }
    },
    template: 
    `
    <div class="input__search">
        <img src="./assets/img/icon/mag_glass.svg" alt="search" />
        <input class="input__search-value" type="search" :placeholder="this.placeholder" v-model="keywordSearch"/>
    </div>
    `,  
  })