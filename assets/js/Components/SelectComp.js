Vue.component('select-comp', {
    props: ['value_default'],
    data() {
        return {
            selected: this.value_default,
        }
    },
    methods: {
        sendValueSelected() {
            this.$emit('send_value_selected', this.selected);
        }
    },
    template: 
    `
    <label for="select-element" class="custom-select">
        <select class="select__input" v-model="selected" v-on:change="sendValueSelected">
            <slot></slot>
        </select>
    </label>
    `,  
  })