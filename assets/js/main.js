new Vue({
    el: "#app",
    data: {
        products: [],
        limit: 10,
        currentPage: 1,
        disablePrevButton: true,
        disableNextButton: false,
        productsHandled: [],
        totalPages: 0,
        postStart: 1,
        postEnd: 0,
        productRender: [],
        productsSelected: [],
    },
    watch: {
        currentPage() {
            if (this.currentPage == 1) {
                this.disablePrevButton = true;
            } else {
                this.disablePrevButton = false;
            }
            
            if (this.currentPage == this.totalPages) {
                this.disableNextButton = true;
            } else {
                this.disableNextButton = false;
            }

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
        }
    },
    methods: {
        prevPage() {
            if(this.currentPage > 1) {
                this.currentPage = this.currentPage - 1;
            } 
        },
        nextPage() {
            if(this.currentPage < this.totalPages) {
                this.currentPage = this.currentPage + 1;
            } 
        },
        handleSearch(data) {
            data = data.toLowerCase();
            let result = this.products.filter(function(product, index) {
                return product.name.toLowerCase().includes(data)  || product.id.includes(data);
            });

            this.productsHandled = result;
        }, 
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
                this.productsHandled = this.products;
            } 
        },
        handleSave() {
            let productsSelected = this.productsSelected;
            let result = this.productsHandled.filter(function (product, index) {
                return productsSelected.includes(product.id)
            })

            localStorage.setItem('products', JSON.stringify(result));
        },
        receiveProductsSelected(data) {
            this.productsSelected = data;
        }       
    },
    async created() {
        const response = await fetch('./product.json');
        const data = await response.json();
        this.products = JSON.parse(JSON.stringify(data));
        this.productsHandled = JSON.parse(JSON.stringify(data));
    }
})
