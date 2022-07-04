Vue.component('pagination', {
    props: ['current_page', 'total_page', 'render_number_page'],
    data() {
        return {
            disablePrevButton: true,
            disableNextButton: false,
        }
    },
    watch: {
        current_page() {
            if (this.current_page == 1) {
                this.disablePrevButton = true;
            } else {
                this.disablePrevButton = false;
            }
            
            if (this.current_page == this.total_page) {
                this.disableNextButton = true;
            } else {
                this.disableNextButton = false;
            }
        }
    },
    methods: {
        prevPage() {
            if(this.current_page > 1) {
                let current = this.current_page - 1;
                this.$emit('input', current)
            } 
        },
        nextPage() {
            if(this.current_page < this.total_page) {
                let current = this.current_page + 1;
                this.$emit('input', current)
            }
        }   
    },
    template: 
    `
        <div class="flex--group-row flex--gap-26">
            <button @click="prevPage" class="btn text--small text--weight-normal flex--gap-20" :disabled="disablePrevButton">
                <img src="./assets/img/icon/prev.svg" alt="Prev">
                Prev
            </button>
            <button v-show="render_number_page" class="btn text--small text--weight-normal flex--gap-20">
                {{ this.current_page }}/{{ this.total_page }}
            </button>
            <button @click="nextPage" class="btn text--small text--weight-normal flex--gap-20" :disabled="disableNextButton">
                Next
                <img src="./assets/img/icon/next.svg" alt="Next">
            </button>
        </div>
    `,
    })