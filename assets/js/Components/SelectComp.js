Vue.component('select-comp', {
    data() {
        return {
            selected: 'none',
        }
    },
    watch: {
        selected() {
            this.$emit('receivevaluesort', this.selected);
        }
    },
    template: 
    `
    <label for="select-element" class="custom-select">
        <select class="select__input" v-model="selected">
            <option value="none" selected>None</option>
            <option value="asc">Product title A-Z</option>  
            <option value="dec">Product title Z-A</option>
        </select>
    </label>
    `,  
  })