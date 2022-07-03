Vue.component('list-product', {
  props: ['product_render', 'products'],
  data() {
    return {
      productsSelected: [],
      enableSendProductsSelected: false,
      checkAll: false,
    }
  },
  watch: {
    productsSelected() {
      this.$emit('sendproductsselected', this.productsSelected)
    },
    checkAll() {
      if (this.checkAll) {
        let result = this.products.map(function (product) {
          return product.id
        })
        this.productsSelected = result;
      } else {
        this.productsSelected = [];
      }
    }
  },
  template: 
  `
    <div class="list">
      <div class="list__header">
        <input v-model="checkAll" class="input__checkbox" type="checkbox"/>
        <p v-show="productsSelected.length == 0" class="list__head-important"> Product</p>
        <p v-show="productsSelected.length != 0" class="list__head-important">{{ this.productsSelected.length }} Products selected</p>
        <p>Price</p>
      </div>
      <div class="list__body">
        <div class="list__item" v-for="product in product_render" :key="product.id">
          <input v-model="productsSelected" :value="product.id" class="list__data input__checkbox" type="checkbox" name="checkAll"/>
          <div class="list__item-important list__data">
            <img class="list__image" :src="product.image" alt="" />
            <span>
              <div class="list__content text--normal">{{product.name}} </div>
              <div class="list__content text--small text--gray">{{product.id}} </div>
            </span>
          </div>
          <span class="list__data">$\{{product.price}}</span>
        </div>
      </div>
    </div>
  `,
  created() {
    let value = (JSON.parse(localStorage.getItem('products')) ?? [])
    this.productsSelected = value.map(function (product) {
      return product.id;
    })
  }
  })