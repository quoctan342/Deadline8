Vue.component('modal-product', {
    data() {
        return {
            products: [],
            limit: 10,
            currentPage: 1,
            productsHandled: [],
            totalPages: 0,
            postStart: 1,
            postEnd: 0,
            productRender: [],
            productsSelected: [],
            keywordSearch: '',
            productsSelected: [],
            enableSendProductsSelected: false,
            checkAll: false,
            keepSelected: false,
        }
    },
    watch: {
        totalPages() {
            if (this.totalPages > 1) {
                this.disableNextButton = false;
            } else {
                this.disableNextButton = true;
            }
        },
        currentPage() {
            this.postStart = (this.currentPage - 1) * this.limit + 1;
            this.postEnd = ((this.currentPage - 1) * this.limit + 1) + this.limit - 1
            let pStart = this.postStart;
            let pEnd = this.postEnd;
            let data = this.products;

            this.productRender = this.productsHandled.filter(function (product, index) {
                return (index >= pStart - 1) && (index <= pEnd - 1);
            })  
        },
        productsHandled() {
            this.postStart = 1;
            this.postEnd = this.limit;
            this.currentPage = 1;
            this.totalPages = Math.ceil(this.productsHandled.length/ this.limit);
            let pStart = this.postStart;
            let pEnd = this.postEnd;
            let data = this.products;

            this.productRender = this.productsHandled.filter(function (product, index) {
                return (index >= pStart - 1) && (index <= pEnd - 1);
            })  
        },
        keywordSearch() {
            console.log(this.keywordSearch)
            let keyword = this.keywordSearch.toLowerCase();
            let result = this.products.filter(function(product, index) {
                return product.name.toLowerCase().includes(keyword)  || product.id.includes(keyword);
            });

            this.productsHandled = result;
        },
        checkAll() {
            if (this.checkAll) {
                let result = this.products.map(function (product) {
                return product.id
                })
                this.productsSelected = result;
            } else if (this.checkAll== false && this.keepSelected == false) {
                this.productsSelected = [];
            }
        },
        productsSelected() {
            if (this.productsSelected.length == this.products.length) {
                this.checkAll = true;
                this.keepSelected = false;
            } else {
                this.checkAll = false;
                this.keepSelected = true;
            }
        }
    },
    methods: {
        handleSort(data) {
            if (data == 'asc') {
                this.productsHandled.sort(function(start, end) {
                    let startName = start.name.toLowerCase();
                    let endName = end.name.toLowerCase();
                    if (startName < endName) return - 1;
                    else if (startName > endName) return 1;
                    return 0;
                })
            } else if (data == 'dec') {
                this.productsHandled.sort(function(start, end) {
                    let startName = start.name.toLowerCase();
                    let endName = end.name.toLowerCase();
                    if (endName < startName) return - 1;
                    else if (endName > startName) return 1;
                    return 0;                   
                })
            } else {
                this.productsHandled = JSON.parse(JSON.stringify(this.products));
            } 
        },
        handleSave() {
            let productsSelected = this.productsSelected;
            let result = this.productsHandled.filter(function (product) {
                return productsSelected.includes(product.id)
            })

            localStorage.setItem('products', JSON.stringify(result));
        },  
    },
    async created() {
        const response = await fetch('./product.json');
        const data = await response.json();
        this.products = JSON.parse(JSON.stringify(data));
        this.productsHandled = JSON.parse(JSON.stringify(data));

        let value = (JSON.parse(localStorage.getItem('products')) ?? [])
        this.productsSelected = value.map(function (product) {
          return product.id;
        })
    },
    template: 
    `
        <modal>
            <template slot="modal-header">
                <h2 class="modal__title">Add product</h2>
            </template>
            <template slot="modal-body">
                <div class="flex--group-row flex--gap-15">
                    <input-search v-model="keywordSearch" class="flex--fill-row" placeholder="Search product by name, tag, id..."></input-search>
                    <select-comp value_default="none" v-on:send_value_selected="handleSort">
                        <option value="none" selected>None</option>
                        <option value="asc">Product title A-Z</option>  
                        <option value="dec">Product title Z-A</option>
                    </select-comp>
                </div>
                <list>
                    <template slot="list-header">
                        <input v-model="checkAll" class="input__checkboxAll" type="checkbox"/>
                        <p v-show="productsSelected.length == 0" class="list__head-important"> Product</p>
                        <p v-show="productsSelected.length != 0" class="list__head-important">{{ this.productsSelected.length }} Products selected</p>
                        <p>Price</p>
                    </template>
                    <template slot="list-body">
                        <item-list v-for="product in productRender" :key="product.id">
                            <input v-model="productsSelected" :value="product.id" class="list__data input__checkbox" type="checkbox"/>
                            <div class="list__item-important list__data">
                            <img class="list__image" :src="product.image" alt="" />
                            <span>
                            <div class="list__content text--normal">{{product.name}} </div>
                            <div class="list__content text--small text--gray">{{product.id}} </div>
                            </span>
                            </div>
                            <span class="list__data">$\{{product.price}}</span>
                        </item-list>
                    </template>
                </list>
            </template>
            <template slot="modal-footer">
                <pagination v-model="currentPage" :current_page="currentPage" :total_page="totalPages" :render_number_page="false"></pagination>
                <div class="flex--group-row flex--gap-15">
                    <button class="btn text--small text--weight-normal w-104">Cancel</button>
                    <button @click="handleSave" class="btn btn--danger text--small text--weight-normal w-104">Save</button>
                </div>
            </template>
        </modal> 
    `,  
  })